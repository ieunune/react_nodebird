import { HYDRATE } from "next-redux-wrapper";


const initialState = {
    user : {
        isLoggedIn : false,
        user : null,
        signUpData : {},
        loginData : {},
    },
    post : {
        mainPosts: [],
    }
    // name : 'noah',
    // age : 25,
    // password : '1234',
};

export const loginAction = (data) => {
    return {
        type : "LOGIN",
        data
    }
}


export const logoutAction = () => {
    return {
        type : "LOGOUT",
    }
}

// 변하는 값을 입력하는 경우에는 N개 만큼 생성되어 액션 생성이 힘듦.
const changePassword = {
    type : 'CHANGE_PASSWORD',
    data : '4321'
}

// 동적으로 처리할 수 있는 action creator 함수 생성하자
const changeNickname = (data) => {
    return {
        type : 'CHANGE_NICKNAME',
        data,
    }
}
changeNickname('haon')


// (이전상태, 액션) => 다음상태
const rootReducer = (state = initialState , action) => {
    switch (action.type) {
        case HYDRATE : 
            return { ...state, ...action.payload}
        case 'CHANGE_PASSWORD' :
            return {
                ...state,
                password : action.data,
            };
        case 'CHANGE_NICKNAME' :
            return {
                ...state,
                name : action.data,
            };
        case 'LOGIN' :
            return {
                ...state,
                user : {
                    ...state.user,
                    isLoggedIn : true
                }
            };
        case 'LOGOUT' :
            return {
                ...state,
                user : {
                    ...state.user,
                    isLoggedIn : false,
                    user : null
                }
            };
    }
}

export default rootReducer;