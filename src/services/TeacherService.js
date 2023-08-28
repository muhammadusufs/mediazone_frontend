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
  async add_bonus(teacher_id, amount, comment) {
    const response = await axios.post(`client/teacher/bonus/`, {
      teacher: teacher_id,
      comment,
      amount,
    });
    return response.status;
  },

  async add_debt(teacher_id, amount, comment) {
    const response = await axios.post(`client/teacher/debt/`, {
      teacher: teacher_id,
      comment,
      amount,
    });
    return response.status;
  },

  async add_fine(teacher_id, amount, comment) {
    const response = await axios.post(`client/teacher/fine/`, {
      teacher: teacher_id,
      comment,
      amount,
    });
    return response.status;
  },

  async update_teacher(teacher_id, name, phone) {
    const response = await axios.patch(
      `client/actions/teachers/${teacher_id}/edit/`,
      {
        name,
        phone,
      }
    );
    return response.status;
  },

  async delete_teacher(teacher_id) {
    const response = await axios.delete(
      `client/actions/teachers/${teacher_id}/delete/`
    );
    return response.status;
  },

  async create_teacher(name, phone, password) {
    const response = await axios.post(`client/actions/teachers/insert/`, {
      name,
      username: phone,
      phone,
    });
    return response.status;
  },
};

export default TeacherService;
