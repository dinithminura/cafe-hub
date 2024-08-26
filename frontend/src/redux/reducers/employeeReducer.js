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
    DELETE_EMPLOYEE_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    employees: [],
    employee: null,
    loading: false,
    error: null,
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EMPLOYEES_REQUEST:
        case FETCH_EMPLOYEE_REQUEST:
        case ADD_EMPLOYEE_REQUEST:
        case EDIT_EMPLOYEE_REQUEST:
        case DELETE_EMPLOYEE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_EMPLOYEES_SUCCESS:
            return {
                ...state,
                loading: false,
                employees: action.payload,
            };
        case FETCH_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                employee: action.payload,
            };
        case ADD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                employees: [...state.employees, action.payload],
            };
        case EDIT_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                employees: state.employees.map((employee) =>
                    employee.id === action.payload.id ? action.payload : employee
                ),
            };
        case DELETE_EMPLOYEE_SUCCESS:
            return {
                ...state,
                loading: false,
                employees: state.employees.filter((employee) => employee.id !== action.payload),
            };
        case FETCH_EMPLOYEES_FAILURE:
        case FETCH_EMPLOYEE_FAILURE:
        case ADD_EMPLOYEE_FAILURE:
        case EDIT_EMPLOYEE_FAILURE:
        case DELETE_EMPLOYEE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default employeeReducer;
