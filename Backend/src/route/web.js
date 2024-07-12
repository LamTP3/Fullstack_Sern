import express from "express";
import homeController from "../controllers/HomeController.js";
import userController from "../controllers/userController.js";
import doctorController from "../controllers/doctorController.js";
import patientController from "../controllers/patientController.js";
import specialtyController from "../controllers/specialtyController.js";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  //use in react
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handlleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/get-allcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-info-doctors", doctorController.postInforDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );

  router.post(`/api/bulk-create-schedule`, doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleDoctorByDate
  );
  router.get(
    `/api/get-extra-infor-doctort-by-id`,
    doctorController.getExtraInforDoctortById
  );

  router.get(
    `/api/get-profile-doctort-by-id`,
    doctorController.getProfileDoctortById
  );

  // Patient Controller
  router.post(
    `/api/patient-book-appointment`,
    patientController.postBookAppointment
  );
  router.post(
    `/api/verify-book-appointment`,
    patientController.VerifyBookAppointment
  );
  router.post(
    `/api/verify-book-appointment`,
    patientController.VerifyBookAppointment
  );
  router.post(`/api/create-new-specialty`, specialtyController.createSpecialty);
  return app.use("/", router);
};

module.exports = initWebRoutes;
