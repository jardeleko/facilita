
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import publicRequest from "../requestMethods"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    console.log('login iniciado')
    await publicRequest.post("/login", user).then((res) => {        
        dispatch(loginSuccess(res.data));
        console.log('login success')
    }).catch(() => {
        dispatch(loginFailure());
        console.log('failure login')
    })
}