const {
  bookAppointment,
  getAppointmentByEmail,
  getAppointmentsByDoctor,
  cancelAppointment,
  modifyAppointment,
} = require("../controllers/appointmentController");

const mockReq = (body, params = {}) => ({ body, params });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Appointment Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should book an appointment successfully", () => {
    const req = mockReq({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      timeSlot: "10:00 AM - 11:00 AM",
      doctorName: "Dr. Madhav",
    });
    const res = mockRes();

    bookAppointment(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Appointment booked successfully",
        appointment: expect.any(Object),
      })
    );
  });

  it("should return an error if the doctor is not found", () => {
    const req = mockReq({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      timeSlot: "11:00 AM - 12:00 PM",
      doctorName: "Dr. Unknown",
    });
    const res = mockRes();

    bookAppointment(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Doctor not found" });
  });

  it("should get an appointment by email", () => {
    const req = mockReq({}, { email: "john.doe@example.com" });
    const res = mockRes();

    getAppointmentByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should return an error if no appointment is found for the email", () => {
    const req = mockReq({}, { email: "unknown@example.com" });
    const res = mockRes();

    getAppointmentByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "No appointment found for this email",
    });
  });
});
