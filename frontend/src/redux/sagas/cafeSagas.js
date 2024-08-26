import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import api from '../../api/api';

function* fetchCafes(action) {
    try {
        const response = yield call(api.get, `/cafes?location=${action.payload}`);
        yield put({ type: 'FETCH_CAFES_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'FETCH_CAFES_FAILURE', payload: error.message });
    }
}

function* fetchCafeById(action) {
    console.log(action)
    try {
        const response = yield call(api.get, `/cafes/${action.payload}`);
        yield put({ type: 'FETCH_CAFE_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'FETCH_CAFE_FAILURE', payload: error.message });
    }
}

function* addCafe(action) {
    try {
        const response = yield call(api.post, '/cafes', action.payload);
        yield put({ type: 'ADD_CAFE_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'ADD_CAFE_FAILURE', payload: error.message });
    }
}

function* editCafe(action) {
    try {
        const response = yield call(api.put, `/cafes/${action.payload.id}`, action.payload.data);
        yield put({ type: 'EDIT_CAFE_SUCCESS', payload: response.data });
    } catch (error) {
        yield put({ type: 'EDIT_CAFE_FAILURE', payload: error.message });
    }
}

function* deleteCafe(action) {
    try {
        yield call(api.delete, '/cafes/', action.payload);
        yield put({ type: 'DELETE_CAFE_SUCCESS', payload: action.payload });
    } catch (error) {
        yield put({ type: 'DELETE_CAFE_FAILURE', payload: error.message });
    }
}

export default function* cafeSagas() {
    yield takeLatest('FETCH_CAFES_REQUEST', fetchCafes);
    yield takeLatest('FETCH_CAFE_REQUEST', fetchCafeById);
    yield takeLatest('ADD_CAFE_REQUEST', addCafe);
    yield takeLatest('EDIT_CAFE_REQUEST', editCafe);
    yield takeLatest('DELETE_CAFE_REQUEST', deleteCafe);
}
