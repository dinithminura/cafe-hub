import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api/api';
import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  FETCH_EMPLOYEE_REQUEST,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  EDIT_EMPLOYEE_REQUEST,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE
} from '../actions/actionTypes';

function* fetchEmployees(action) {
  try {
    const response = yield call(api.get, `/employees?cafe=${action.payload}`);
    yield put({ type: FETCH_EMPLOYEES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_EMPLOYEES_FAILURE, payload: error.message });
  }
}

function* fetchEmployeeById(action) {
  try {
    const response = yield call(api.get, `/employees/${action.payload}`);
    yield put({ type: FETCH_EMPLOYEE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_EMPLOYEE_FAILURE, payload: error.message });
  }
}

function* addEmployee(action) {
  try {
    const response = yield call(api.post, '/employee', action.payload);
    yield put({ type: ADD_EMPLOYEE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_EMPLOYEE_FAILURE, payload: error.message });
  }
}

function* editEmployee(action) {
  try {
    const response = yield call(api.put, `/employees/${action.payload.id}`, action.payload.data);
    yield put({ type: EDIT_EMPLOYEE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: EDIT_EMPLOYEE_FAILURE, payload: error.message });
  }
}

function* deleteEmployee(action) {
  try {
    yield call(api.delete, `/employees/${action.payload}`);
    yield put({ type: DELETE_EMPLOYEE_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_EMPLOYEE_FAILURE, payload: error.message });
  }
}

export default function* employeeSagas() {
  yield takeLatest(FETCH_EMPLOYEES_REQUEST, fetchEmployees);
  yield takeLatest(FETCH_EMPLOYEE_REQUEST, fetchEmployeeById);
  yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployee);
  yield takeLatest(EDIT_EMPLOYEE_REQUEST, editEmployee);
  yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployee);
}
