// library imports
import axios from "./api";

const StudentService = {
  async check_student(student_id) {
    const response = await axios.post("client/check-student/", {
      barcode: student_id,
    });
    return response;
  },

  async add_subscription(group_id, student_id, amount, month = 0) {
    let response;
    if (month === 0) {
      response = await axios.post("client/add_subscription/", {
        amount,
        group_id,
        student_id,
      });
    } else {
      response = await axios.post("client/add_subscription/", {
        amount,
        group_id,
        student_id,
        month: month,
      });
    }
    return response;
  },

  async update_student(student_id, name, phone, msg) {
    const response = await axios.patch(`client/students/${student_id}/`, {
      name,
      phone,
      sms_service: msg,
    });
    return response.status;
  },

  async delete_student(student_id) {
    const response = await axios.delete(
      `client/actions/students/${student_id}`
    );
    return response.status;
  },

  async student_history(student_id) {
    const response = await axios.get(
      `client/actions/students/${student_id}/subscription_history/`
    );
    return response;
  },
};

export default StudentService;
