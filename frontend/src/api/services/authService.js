import { publicRequest } from "../axiosConfig/publicRequest";
import { LOGIN } from "../apiEndPoints"
export const loginUser = (user) => {
    return publicRequest.post(LOGIN, user).then((res) => res.data.data);
};