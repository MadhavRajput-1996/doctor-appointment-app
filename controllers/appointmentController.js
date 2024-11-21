const appointments = [];
const doctors = ["Dr. Madhav", "Dr. Johnson", "Dr. Piyush"];

const bookAppointment = (req, res) => {
  try {
    const { firstName, lastName, email, timeSlot, doctorName } = req.body;

    if (!doctors.includes(doctorName)) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const existingAppointment = appointments.find(
      (appt) => appt.timeSlot === timeSlot && appt.doctorName === doctorName
    );
    if (existingAppointment) {
      return res.status(400).json({ message: "Time slot already booked" });
    }

    const newAppointment = { firstName, lastName, email, timeSlot, doctorName };
    appointments.push(newAppointment);

    return res
      .status(201)
      .json({
        message: "Appointment booked successfully",
        appointment: newAppointment,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const getAppointmentByEmail = (req, res) => {
  try {
    const { email } = req.params;

    const appointment = appointments.find((appt) => appt.email === email);
    if (!appointment) {
      return res
        .status(404)
        .json({ message: "No appointment found for this email" });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const getAppointmentsByDoctor = (req, res) => {
  try {
    const { doctorName } = req.params;

    if (!doctors.includes(doctorName)) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const doctorAppointments = appointments.filter(
      (appt) => appt.doctorName === doctorName
    );

    return res.status(200).json(doctorAppointments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const cancelAppointment = (req, res) => {
  try {
    const { email, timeSlot } = req.body;

    const index = appointments.findIndex(
      (appt) => appt.email === email && appt.timeSlot === timeSlot
    );
    if (index === -1) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointments.splice(index, 1);

    return res
      .status(200)
      .json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const modifyAppointment = (req, res) => {
  try {
    const { email, originalTimeSlot, newTimeSlot } = req.body;

    const appointment = appointments.find(
      (appt) => appt.email === email && appt.timeSlot === originalTimeSlot
    );
    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Original appointment not found" });
    }

    const isNewSlotTaken = appointments.some(
      (appt) =>
        appt.timeSlot === newTimeSlot &&
        appt.doctorName === appointment.doctorName
    );
    if (isNewSlotTaken) {
      return res.status(400).json({ message: "New time slot already booked" });
    }

    appointment.timeSlot = newTimeSlot;

    return res
      .status(200)
      .json({ message: "Appointment modified successfully", appointment });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  bookAppointment,
  getAppointmentByEmail,
  getAppointmentsByDoctor,
  cancelAppointment,
  modifyAppointment,
};
