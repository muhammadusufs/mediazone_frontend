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
};

export default GroupService;
