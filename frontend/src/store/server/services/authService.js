import { publicRequest } from "../../../lib/axiosConfig/publicRequest";
import { LOGIN } from "../../../utility/apiEndPoints"
export const loginUser =  (user) => {
    return  publicRequest.post(LOGIN, user);
};