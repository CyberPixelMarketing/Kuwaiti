const { createSlice } = require("@reduxjs/toolkit");

export const authUser = createSlice({
    name: "auth",
    initialState: {
        userName: '',
        mobile: '',
        token: '',
        userId: '',
        autoLogin: false,
        tryAutoLogin:false
    },
    reducers: {
        loginData: (state, action) => {
            const { userName, mobile, token, userId } = action.payload
            state.token = token;
            state.userName = userName;
            state.mobile = mobile;
            state.userId = userId,
                console.log('vvv', state.autoLogin)
        },
        logout: (state) => {

            state.userName = '',
                state.mobile = '',
                state.token = '',
                state.userId = '';
            state.autoLogin = true
            console.log('sstate', state)

        },
        isLogin: (state) => {
            state.autoLogin= true
        },
        didTryAutoLogin: (state)=>{
                state.tryAutoLogin= true
        }

    }
})

export const { loginData, logout } = authUser.actions;

export default authUser.reducer