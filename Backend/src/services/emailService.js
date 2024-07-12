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
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
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

    `;
  }
  if (dataSend.language === "en") {
    result = `
<h3> Hello ${dataSend.patientName} </h3>
<p> You are receiving this email because you have scheduled an appointment
online medical on Booking Care </p>
<p> Information for scheduling medical examination: </p>
<div>
    <b>
        Time: ${dataSend.time}
    </b>
</div>
<div>
    <b>
    Doctor: ${dataSend.doctorName}
    </b>
</div>
<p> If the above information is true, please click
Click on the link below to confirm and complete medical examination procedures </p>
<div>
    <a href= ${dataSend.redirectLink} target="_blank"> Click Here </a>
<div>
<div>
Sincerely thank
</div>

`;
  }

  return result;
};

module.exports = {
  sendSimpleEmail,
};
