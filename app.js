const express = require("express");
const appointmentRoutes = require("./routes/appointmentRoutes");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/appointments", appointmentRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "An unexpected error occurred",
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
