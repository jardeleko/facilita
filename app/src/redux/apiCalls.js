
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import publicRequest from "../requestMethods"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    await publicRequest.post("/login", user).then((res) => {        
        dispatch(loginSuccess(res.data))
    }).catch((err) => {
        dispatch(loginFailure('null'))
    })
}