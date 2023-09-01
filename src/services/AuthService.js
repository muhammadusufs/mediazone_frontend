// library imports
import axios from "./api";

// local imports
import { removeItem } from "../utils/storage";

const AuthService = {
  // login +
  async login(username, password) {
    const response = await axios.post("token/", { username, password });
    return response;
  },

  // get user profile +
  async getUser(user_id) {
    const response = await axios.get(`client/profiles/${user_id}`);
    return response;
  },

  async getCompany() {
    const response = await axios.post(`client/actions/get-company/`);
    return response;
  },

  // change password +
  async changePassword(id, password, oldPassword) {
    const response = await axios.post(`user/change-password/`, {
      new_password: password,
      current_password: oldPassword,
    });
    return response;
  },

  // log out user +
  logOut() {
    removeItem("token");
  },
  async updateUser(name, number) {
    const response = await axios.patch(`client/actions/edit-user/`, {
      name,
      phone: number,
    });
    return response;
  },
};

export default AuthService;
