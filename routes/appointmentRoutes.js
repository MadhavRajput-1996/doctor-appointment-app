const express = require("express");
const {
  bookAppointment,
  getAppointmentByEmail,
  getAppointmentsByDoctor,
  cancelAppointment,
  modifyAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post("/book", bookAppointment);
router.get("/view/:email", getAppointmentByEmail);
router.get("/doctor/:doctorName", getAppointmentsByDoctor);
router.delete("/cancel", cancelAppointment);
router.put("/modify", modifyAppointment);

module.exports = router;
