// library imports
import axios from "./api";

const HistoryService = {
  async get_histories(date = null) {
    let response;
    if (date !== null) {
      response = await axios.get(`client/payment/?date=${date}`);
    } else {
      response = await axios.get(`client/payment/`);
    }
    return response;
  },
  async add_expense(comment, amount, company) {
    const response = await axios.post(`client/expenses/`, {
      comment,
      amount,
      company,
    });
    return response.status;
  },
};

export default HistoryService;
