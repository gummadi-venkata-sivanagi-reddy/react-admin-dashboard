import axios from "axios";

const API_BASE_URL = "http://localhost:8087/api/employees";

class EmployeeService {
  getEmployees() {
    return axios.get(API_BASE_URL);
  }
}

// Fixed: Assign to a variable first, then export
const employeeServiceInstance = new EmployeeService();
export default employeeServiceInstance;
