require(`dotenv`).config();
import nodemailer from "nodemailer";
let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"Phuc Lam Tran 👻" <lamtp2810@gmail.com>',
    to: dataSend.reciverEmail,
    subject: "Thôn tin đặt lịch khám bệnh",
    html: `
    <h3> Xin chào ${dataSend.patientName} </h3>
    <p> Bạn nhận được email này vì đã đặt lịch khám 
    bệnh online trên Booking Care </p>
    <p> Thông tin đặt lịch khám bệnh: </p>
    <div>
        <b>
            Thời gian: ${dataSend.time}
        </b>
    </div>
    <div>
        <b>
        Bác sĩ: ${dataSend.doctorName}
        </b>
    </div>
    <p> Nếu các thông tin trên là đúng sự thật, vui lòng click 
    vào đường link dưới để xác nhận và hoàn tất thủ tục khám bệnh </p>
    <div>
        <a href= ${dataSend.redirectLink} target="_blank"> Click Here </a>
    <div>
    <div>
        Xin chân thành cảm ơn
    </div>



    `,
  });
};

module.exports = {
  sendSimpleEmail,
};
