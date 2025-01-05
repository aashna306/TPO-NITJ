import express from "express";
const router=express.Router();

import { checkEligibility, getJobProfiletostudent,getJobProfiledetails, getJobsByRecruiter,createJobProfile,updateJob,deleteJob,getJobProfilesForProfessors,approveJobProfile,rejectJobProfile } from "../controller/jobprofile.js";

router.get("/eligibility/:_id/", checkEligibility);
router.get("/getjobs", getJobProfiletostudent);
router.get("/:_id", getJobProfiledetails);


router.post("/createjob", createJobProfile);
router.put("/updatejob/:_id", updateJob);
router.delete("/deletejob/:_id", deleteJob);
router.get("/recruiter/getjobs", getJobsByRecruiter);


router.get("/professor/getjobs", getJobProfilesForProfessors);
router.put("/approvejob/:_id", approveJobProfile);
router.put("/rejectjob/:_id", rejectJobProfile);

export default router;