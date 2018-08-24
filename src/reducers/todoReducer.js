const initialState = {
    todo: []
}

export default (state = initialState, action) => {
    if(action.type === "FETCH") {
        return {
            ...state,
            todo: action.payload
        }
    } else if(action.type === "PAGINATION") {
        return {
            ...state,
            pagination: action.payload
        }
    }
    return state;
}