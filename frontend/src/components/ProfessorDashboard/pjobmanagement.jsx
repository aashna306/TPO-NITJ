import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ViewJobDetails from "./ViewJob";
import CreateJob from "./createjobprofile";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Building2, MapPin, DollarSign, Calendar, Briefcase, Plus, Search, Check, X } from "lucide-react";

const JobProfilesonp = () => {
  const [jobProfiles, setJobProfiles] = useState({ approved: [], notApproved: [], completed: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobProfiles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/professor/getjobs`,
          { withCredentials: true }
        );
        setJobProfiles(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch job profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobProfiles();
  }, []);

  const handleApprove = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/approvejob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Approved!", "The job has been approved.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          notApproved: prev.notApproved.filter((job) => job._id !== jobId),
          approved: [...prev.approved, prev.notApproved.find((job) => job._id === jobId)],
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to approve the job.", "error");
      }
    }
  };

  const handleComplete = async (jobId,jobdescription) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark it as complete ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/completejob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Completed!", "The job has been completed.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          approved: prev.approved.filter((job) => job._id !== jobId),
          completed: [...prev.completed, prev.approved.find((job) => job._id === jobId)],
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to approve the job.", "error");
      }
    }
  };
  const handleInComplete = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark it as incomplete ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/incompletejob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("InCompleted!", "The job has not completed yet.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          completed: prev.completed.filter((job) => job._id !== jobId),
          approved: [...prev.approved, prev.completed.find((job) => job._id === jobId)],
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to approve the job.", "error");
      }
    }
  };

  const handleReject = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/rejectjob/${jobId}`,
          {},
          { withCredentials: true }
        );
        Swal.fire("Rejected!", "The job has been rejected.", "success");
        setJobProfiles((prev) => ({
          ...prev,
          notApproved: prev.notApproved.filter((job) => job._id !== jobId),
        }));
      } catch (err) {
        Swal.fire("Error", "Failed to reject the job.", "error");
      }
    }
  };

  const JobCard = ({ job, showActions }) => (
    <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
       {job.Approved_Status&& !job.completed && (
        <div className="absolute top-2 right-2 text-green-600">
          <Check className="w-7 h-7 bg-green-100 rounded rounded-3xl p-1" onClick={() => handleComplete(job._id,job)}/>
        </div>
      )}
      {job.completed && (
        <div className="absolute top-2 right-2 text-red-600">
          <X className="w-7 h-7 bg-red-100 rounded rounded-3xl p-1" onClick={() => handleInComplete(job._id)} />
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
            {job.company_logo ? (
              <img
                src={job.company_logo}
                className="w-14 h-14 object-contain"
              />
            ) : (
              <span className="text-lg font-bold text-custom-blue">
                {job.company_name?.[0]?.toUpperCase() || "N"}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{job.company_name}</h3>
            <p className="text-sm text-gray-500">Job ID: {job.job_id}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">{job.job_role}</p>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">{job.job_salary?.ctc}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">{job.joblocation}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-custom-blue" />
            <p className="text-sm text-gray-700">
              Posted: {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        {showActions && (
          <div className="flex space-x-2 w-full">
            <button
              className="flex-1 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              onClick={() => handleApprove(job._id)}
            >
              Approve
            </button>
            <button
              className="flex-1 bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={() => handleReject(job._id)}
            >
              Reject
            </button>
          </div>
        )}
        <button
          className="w-full bg-custom-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={() => setSelectedJob(job)}
        >
          View Details
        </button>
      </CardFooter>
    </Card>
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 text-center">
        <h3 className="text-xl font-semibold mb-2">Error</h3>
        <p>{error}</p>
      </div>
    </div>
  );

  // Filter job profiles based on the search term
  const filteredApprovedJobs = jobProfiles.approved.filter(job =>
    job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNotApprovedJobs = jobProfiles.notApproved.filter(job =>
    job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompletedJobs = jobProfiles.completed.filter(job =>
    job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl relative">
      {selectedJob ? (
        <ViewJobDetails onClose={() => setSelectedJob(null)} job={selectedJob} />
      ) : showCreateJob ? (
        <CreateJob onJobCreated={() => setShowCreateJob(false)} onCancel={() => setShowCreateJob(false)} />
      ) : (
        <>
          <button
            className="absolute top-8 right-4 bg-custom-blue text-white p-3 rounded-full hover:bg-blue-600 transition-colors"
            onClick={() => setShowCreateJob(true)}
          >
            <span>Create Job Profile</span>
          </button>
          <h1 className="text-4xl font-bold text-center mb-8 text-custom-blue">
            Job Profiles Dashboard
          </h1>

          <Tabs defaultValue="approved" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 space-x-4">
              <TabsTrigger value="approved" className="data-[state=active]:bg-custom-blue data-[state=active]:text-white bg-gray-300 rounded-3xl py-2">
                Approved Jobs ({filteredApprovedJobs.length})
              </TabsTrigger>
              <TabsTrigger value="not-approved" className="border data-[state=active]:bg-custom-blue data-[state=active]:text-white bg-gray-300 rounded-3xl py-2">
                Pending Approval ({filteredNotApprovedJobs.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="border data-[state=active]:bg-custom-blue data-[state=active]:text-white bg-gray-300 rounded-3xl py-2">
                Completed Jobs ({filteredCompletedJobs.length})
              </TabsTrigger>
            </TabsList>

            {/* Search Input */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by company name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-blue"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <TabsContent value="approved">
              {filteredApprovedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredApprovedJobs.map((job) => (
                    <JobCard key={job._id} job={job} showActions={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No approved job profiles found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="not-approved">
              {filteredNotApprovedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotApprovedJobs.map((job) => (
                    <JobCard key={job._id} job={job} showActions={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No jobs pending approval found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed">
              {filteredCompletedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCompletedJobs.map((job) => (
                    <JobCard key={job._id} job={job} showActions={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No completed job profiles found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default JobProfilesonp;