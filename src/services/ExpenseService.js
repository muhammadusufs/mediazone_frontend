// library imports
import axios from "./api";

const ExpenseService = {
  async get_expenses(month = null) {
    let response;
    if (month !== null) {
      response = await axios.get(`client/expenses/?month=${month}`);
    } else {
      response = await axios.get(`client/expenses/`);
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

export default ExpenseService;
