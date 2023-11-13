import axios from "axios";
import authHeader from "./auth.header";

const AXIOS_URL_COURSE = process.env.URL_HEADER_COURSE;
const AXIOS_URL_ORDER = process.env.URL_HEADER_USER;
const AXIOS_URL_AUTH = process.env.URL_API_AUTH;

class UserService {

  // Authentication System
  
  getUserBoard() {
    return axios.get(AXIOS_URL_AUTH + "/home", { headers: authHeader() });
  }
  getMentorBoard() {
    return axios.get(AXIOS_URL_AUTH + "/mentor/home", {
      headers: authHeader(),
    });
  }
  getAdminBoard() {
    return axios.get(AXIOS_URL_AUTH + "/admin/home", { headers: authHeader() });
  }
  

  // Ecommerce

  getAllCategory() {
    return axios.get(AXIOS_URL_COURSE + "/cat/all");
  }
  getAllCourse() {
    return axios.get(AXIOS_URL_COURSE + "/cro/all");
  }
  getDetailsCourse() {
    return axios.get(AXIOS_URL_COURSE + `/cro/${courseId}`);
  }
  getAllCourseByCategory(catId) {
    return axios.get(AXIOS_URL_COURSE + `/cro/all/${catId}`);
  }
  getAllMateriOfCourse(courseId) {
    return axios.get(AXIOS_URL_COURSE + `/cro/materi/${courseId}`);
  }
  getAllToolsOfCourse(courseId) {
    return axios.get(AXIOS_URL_COURSE + `/cro/tools/${courseId}`);
  }
  getAllVariationsCourse(courseId) {
    return axios.get(AXIOS_URL_COURSE + `/cro/opt/${courseId}`);
  }

  //ORDER
  createOrderCourseUser(qty, unit, user, course, option) {
    return axios.post(AXIOS_URL_ORDER + "/order", {
      OrdersItems_quantity: qty,
      OrdersItems_unitPrice: unit,
      Orders_user: user,
      OrdersItems_course: course,
      OrdersItems_option_course: option,
    });
  }
  getMostOptionOrderCourse(courseId) {
    return axios.get(AXIOS_URL_ORDER + `/order/most-opt/${courseId}`);
  }
}

const UserServices = new UserService();
export default UserServices;
