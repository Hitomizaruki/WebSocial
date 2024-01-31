export const Noti_TYPE={
    CONFIRM:"confirm",
    COMMENT:"comment",
    LIKE:"like"
}

export const ACTION_TYPE={
    FETCH_START:"FETCH_START",
    FETCH_SUCCESS:"FETCH_SUCCESS",
    FETCH_ERROR:"FETCH_ERROR"
}

export const INITIAL_STATE={
    loading:false,
    post:null,
    error:false
}

export const postReducer=(state,action)=>{
    switch (action.type) {
        case "FETCH_START":
        return{
            loading:true,
            post:null,
            error:false
        };
        case "FETCH_SUCCESS":
        return{
            ...state,
            loading:false,
            post:action.payload,
        };
        case "FETCH_ERROR":
        return{
            loading:false,
            post:null,
            error:true
        };
        default:
            return state;
    }
}


 