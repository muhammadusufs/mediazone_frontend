// library imports
import axios from "./api";

const TeacherService = {
  async get_teachers() {
    const response = await axios.get(`client/teachers/`);
    return response;
  },
};

export default TeacherService;
