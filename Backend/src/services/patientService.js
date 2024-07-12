import db from "../models/index";
import emailService from "./emailService";
let postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.timeType ||
        !data.date ||
        !data.doctorId ||
        !data.fullName
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: "https://www.google.com.vn/?hl=vi",
        });
        // Upsert patient
        let [user, created] = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });

        if (user) {
          // Create a booking record
          let [booking, success] = await db.Booking.findOrCreate({
            where: {
              statusId: "S1",
              patientId: user.id,
              date: data.date,
              timeType: data.timeType,
            },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user.id,
              date: data.date,
              timeType: data.timeType,
            },
          });
          if (success === true) {
            resolve({
              errCode: 0,
              errMessage: "Success booking",
            });
          } else {
            resolve({
              errCode: 1,
              errMessage:
                "You have an appointment for this time, please check email to clear",
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postBookAppointmentService,
};
