const initialState = {
    cafes: [],
    cafe: null, 
    loading: false,
    error: null,
};

const cafeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CAFES_REQUEST':
        case 'FETCH_CAFE_REQUEST':
        case 'ADD_CAFE_REQUEST':
        case 'EDIT_CAFE_REQUEST':
        case 'DELETE_CAFE_REQUEST':
            return { ...state, loading: true };

        case 'FETCH_CAFES_SUCCESS':
            return { ...state, loading: false, cafes: action.payload, error: null };

        case 'FETCH_CAFE_SUCCESS':
            return { ...state, loading: false, cafe: action.payload, error:null };

        case 'ADD_CAFE_SUCCESS':
            return { ...state, loading: false, cafes: [...state.cafes, action.payload] };

        case 'EDIT_CAFE_SUCCESS':
            return {
                ...state,
                loading: false,
                cafes: state.cafes.map(cafe => cafe.id === action.payload.id ? action.payload : cafe),
            };

        case 'DELETE_CAFE_SUCCESS':
            return {
                ...state,
                loading: false,
                cafes: state.cafes.filter(cafe => cafe.id !== action.payload,),
                error:null
            };

        case 'FETCH_CAFES_FAILURE':
        case 'FETCH_CAFE_FAILURE':
        case 'ADD_CAFE_FAILURE':
        case 'EDIT_CAFE_FAILURE':
        case 'DELETE_CAFE_FAILURE':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default cafeReducer;
