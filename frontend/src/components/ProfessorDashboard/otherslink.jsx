import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const OthersLinkManager = ({ jobId, stepIndex, onClose, othersLinks, onUpdateLinks }) => {
  const [students, setStudents] = useState([]);
  const [commonLink, setCommonLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEligibleStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/eligible_students`,
          { jobId, stepIndex },
          { withCredentials: true }
        );
        const updatedStudents = response.data.eligibleStudents.map((student) => {
          const studentLink = othersLinks.find(link => link.studentId === student.studentId);
          return {
            ...student,
            othersLink: studentLink ? studentLink.othersLink : '',
          };
        });

        setStudents(updatedStudents);
        console.log(students);
      } catch (err) {
        console.error('Error fetching eligible students:', err);
        toast.error('Failed to fetch eligible students');
      } finally {
        setLoading(false);
      }
    };

    fetchEligibleStudents();
  }, [jobId, stepIndex, othersLinks]);

  const handleCommonLinkChange = (e) => {
    setCommonLink(e.target.value);
  };

  const handleUniqueLinkChange = (index, value) => {
    const updatedStudents = [...students];
    updatedStudents[index].othersLink = value;
    setStudents(updatedStudents);
  };

  const applyCommonLinkToAll = () => {
    const updatedStudents = students.map(student => ({
      ...student,
      othersLink: commonLink,
    }));
    setStudents(updatedStudents);
  };

  const handleSubmit = async () => {
    const studentsWithLinks = students.filter(student => student.othersLink.trim() !== '');
    if (studentsWithLinks.length === 0) {
      toast.error('No Others links have been provided');
      return;
    }
  
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.REACT_APP_BASE_URL}/jobprofile/set-others-links`,
        { jobId, stepIndex, students: studentsWithLinks },
        { withCredentials: true }
      );
      toast.success('Others links set successfully!');
      onUpdateLinks(studentsWithLinks);
  
      onClose();
    } catch (error) {
      console.error('Error setting Others links:', error);
      toast.error('Failed to set Others links.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Common Others Link</label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={commonLink}
            onChange={handleCommonLinkChange}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Enter common Others link"
          />
          <button
            className="bg-custom-blue text-white px-4 py-2 rounded-lg"
            onClick={applyCommonLinkToAll}
          >
            Apply to All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Unique Others Link</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.email}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="text"
                    value={student.othersLink}
                    onChange={(e) => handleUniqueLinkChange(index, e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter unique Others link"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex space-x-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={onClose} disabled={loading}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OthersLinkManager;