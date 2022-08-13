
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import publicRequest from "../requestMethods"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    await publicRequest.post("/login", user).then((res) => {        
        console.log(res.data)
        dispatch(loginSuccess(res.data))
    }).catch((err) => {
        console.log(err)
        dispatch(loginFailure('null'))
    })
}