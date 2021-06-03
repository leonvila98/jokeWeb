const initialState = {
    normalJoke : {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_NORMAL_JOKE":
            return {
                ...state,
                normalJoke: action.payload
            }
        case "GET_NSFW_JOKE":
            return {
                ...state,
                normalJoke: action.payload
            }
        default:
            return state; 
    }
} 