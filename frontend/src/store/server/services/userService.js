import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { USER } from "../../../utility/apiEndPoints";

export const addUser = (data) => {
    return privateRequest.post(USER, data);
};

export const getUser = (params) => {
    return privateRequest.get(USER, {
        params
    });
};

export const deleteUserById = (id) => {
    return privateRequest.delete(`${USER}/${id}`);
};

export const updateUserById = (id, data) => {
    return privateRequest.put(`${USER}/${id}`, data);
};
