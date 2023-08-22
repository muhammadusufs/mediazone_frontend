// library imports
import axios from "./api";

const TeacherService = {
  async get_teachers() {
    const response = await axios.get(`client/teachers/`);
    return response;
  },
  async get_teacher(teacher_id) {
    const response = await axios.get(`client/teachers/${teacher_id}`);
    return response;
  },
  async get_teacher_stats(teacher_id) {
    const response = await axios.get(`client/teachers/${teacher_id}/stats/`);
    return response;
  },
};

export default TeacherService;
