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
};

export default StudentService;
