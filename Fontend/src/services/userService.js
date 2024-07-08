import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (id) => {
  // return axios.get("/api/get-all-users", { id: id });
  return axios.get(`/api/get-all-users?id=${id}`);
};

const createUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (id) => {
  return axios.delete(`/api/delete-user`, { data: { id: id } });
};
const editUserService = (data) => {
  return axios.put("/api/edit-user", data);
};
const getAllCodeService = (type) => {
  return axios.get(`/api/get-allcode?type=${type}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get("/api/get-all-doctors");
};

const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-info-doctors`, data);
};

const getDetailInforDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
export {
  handleLogin,
  getAllUsers,
  createUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
};
