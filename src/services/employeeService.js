import axios from "axios";

const API_BASE_URL = "http://localhost:8087/api/employees";

class EmployeeService {
  getEmployees() {
    return axios.get(API_BASE_URL);
  }

  getEmployeeById(id) {
    return axios.get(`${API_BASE_URL}/${id}`);
  }

  createEmployee(employee) {
    return axios.post(API_BASE_URL, employee);
  }

  updateEmployee(id, employee) {
    return axios.put(`${API_BASE_URL}/${id}`, employee);
  }

  deleteEmployee(id) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  }
}

const employeeServiceInstance = new EmployeeService();

export default employeeServiceInstance;
