import api from '../../api/api';

// Fetch Employees
export const fetchEmployees = (cafe) => async (dispatch) => {
  dispatch({ type: 'FETCH_EMPLOYEES_REQUEST' });
  try {
    const response = await api.get(`/employees?cafe=${cafe}`);
    dispatch({ type: 'FETCH_EMPLOYEES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_EMPLOYEES_FAILURE', payload: error.message });
  }
};

// Fetch Employee by ID
export const fetchEmployeeById = (id) => async (dispatch) => {
  dispatch({ type: 'FETCH_EMPLOYEE_REQUEST' });
  try {
    const response = await api.get(`/employees/${id}`);
    dispatch({ type: 'FETCH_EMPLOYEE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_EMPLOYEE_FAILURE', payload: error.message });
  }
};

// Add Employee
export const addEmployee = (employeeData) => async (dispatch) => {
  dispatch({ type: 'ADD_EMPLOYEE_REQUEST' });
  try {
    const response = await api.post('/employees', employeeData);
    dispatch({ type: 'ADD_EMPLOYEE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADD_EMPLOYEE_FAILURE', payload: error.message });
    throw error;
  }
};

// Edit Employee
export const editEmployee = (id, employeeData) => async (dispatch) => {
  dispatch({ type: 'EDIT_EMPLOYEE_REQUEST' });
  try {
    const response = await api.put(`/employees/${id}`, employeeData);
    dispatch({ type: 'EDIT_EMPLOYEE_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'EDIT_EMPLOYEE_FAILURE', payload: error.message });
    throw error;
  }
};

// Delete Employee
export const deleteEmployee = (id) => async (dispatch) => {
  dispatch({ type: 'DELETE_EMPLOYEE_REQUEST' });
  try {
    await api.delete(`/employees/${id}`);
    dispatch({ type: 'DELETE_EMPLOYEE_SUCCESS', payload: id });
  } catch (error) {
    dispatch({ type: 'DELETE_EMPLOYEE_FAILURE', payload: error.message });
    throw error;
  }
};
