
import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import publicRequest from "../requestMethods"
// import { useNavigation } from '@react-navigation/native'

export const login = async (dispatch, user) => {
    // const history = useNavigation()
    dispatch(loginStart())
    await publicRequest.post("/login", user).then((res) => {        
        console.log(res.data)
        dispatch(loginSuccess(res.data))
    }).catch((err) => {
        console.log(err)
        dispatch(loginFailure('null'))
    })
}