// library imports
import axios from "./api";

const GroupService = {
  async check_group(group_id) {
    const response = await axios.get(`client/groups/${group_id}`);
    return response;
  },

  async is_subscribed(group_id, month, student_id) {
    const response = await axios.post("client/is_subscribed/", {
      month,
      group_id,
      student_id,
    });
    return response;
  },

  async get_groups_data() {
    const response = await axios.get("client/data_stats");
    return response;
  },

  async insert_group(name, cost, teacher, subject, company) {
    const response = await axios.post("client/groups/", {
      name,
      cost,
      teacher,
      subject,
      status: "1",
      company,
    });
    return response.status;
  },
};

export default GroupService;
