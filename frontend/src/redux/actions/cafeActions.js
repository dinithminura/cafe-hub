import api from '../../api/api';

export const fetchCafes = (location) => async (dispatch) => {
    dispatch({ type: 'FETCH_CAFES_REQUEST' });
    try {
        const response = await api.get(`/cafes?location=${location}`);
        dispatch({ type: 'FETCH_CAFES_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_CAFES_FAILURE', payload: error.message });
    }
};

export const fetchCafeById = (id) => async (dispatch) => {
    dispatch({ type: 'FETCH_CAFE_REQUEST' });
    
    try {
        const response = await api.get(`/cafes/${id}`);        
        dispatch({ type: 'FETCH_CAFE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_CAFE_FAILURE', payload: error.message });
    }
};

export const addCafe = (cafe) => async (dispatch) => {
    dispatch({ type: 'ADD_CAFE_REQUEST' });
    try {
        const response = await api.post('/cafes', cafe);
        dispatch({ type: 'ADD_CAFE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'ADD_CAFE_FAILURE', payload: error.message });
    }
};

export const editCafe = (id, cafe) => async (dispatch) => {
    dispatch({ type: 'EDIT_CAFE_REQUEST' });
    try {
        const response = await api.put(`/cafes/${id}`, cafe);
        dispatch({ type: 'EDIT_CAFE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'EDIT_CAFE_FAILURE', payload: error.message });
    }
};

export const deleteCafe = (id) => async (dispatch) => {
    dispatch({ type: 'DELETE_CAFE_REQUEST' });
    try {
        await api.delete(`/cafes/${id}`);
        dispatch({ type: 'DELETE_CAFE_SUCCESS', payload: id });
    } catch (error) {
        dispatch({ type: 'DELETE_CAFE_FAILURE', payload: error.message });
    }
};
