import db from "../models/index";

let createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.descriptionMarkdown ||
        !data.imageBase64 ||
        !data.descriptionHTML
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "Create Specialty Success",
        });
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let getSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll();
      // if (data && data.length > 0) {
      //   data.map((item) => {
      //     // dưới data base image đang lưu dưới dạng BLOB
      //     // có type nếu console ra kiểu Buffer
      //     // giờ khi lấy từ database lên ta convert từ kiểu BLOB
      //     // sang dạng binary(nghĩa là sang kiểu string ở đây)
      //     item.image = Buffer.from(item.image, "base64").toString("binary");
      //   });
      // }

      resolve({
        errMessage: "Get Specialty Success",
        errCode: 0,
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createSpecialtyService,
  getSpecialtyService,
};
