const Appointment = require("../models/Appointment");

//  Створення бронювання (client)
const createAppointment = async (req, res) => {
  const { businessId, date, time } = req.body;

  try {
    const appointment = await Appointment.create({
      client: req.user._id,
      business: businessId,
      date,
      time,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: "Time slot already booked" });
  }
};

//  Мої записи
const getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    $or: [{ client: req.user._id }, { business: req.user._id }],
  })
    .populate("client", "name email")
    .populate("business", "name email");

  res.json(appointments);
};

//  Скасування
const cancelAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  if (
    appointment.client.toString() !== req.user._id.toString() &&
    appointment.business.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Not authorized" });
  }

  appointment.status = "cancelled";
  await appointment.save();

  res.json({ message: "Appointment cancelled" });
};

//  Підтвердження (business)
const confirmAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  if (appointment.business.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Only business can confirm" });
  }

  appointment.status = "confirmed";
  await appointment.save();

  res.json({ message: "Appointment confirmed" });
};

module.exports = {
  createAppointment,
  getMyAppointments,
  cancelAppointment,
  confirmAppointment,
};
