import { configureStore } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import cafeSagas from './sagas/cafeSagas';
import employeeSagas from './sagas/employeeSagas';

// Create a Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run all Sagas
function* rootSaga() {
    yield all([
        cafeSagas(),
        employeeSagas(),
    ]);
}

sagaMiddleware.run(rootSaga);

export default store;
