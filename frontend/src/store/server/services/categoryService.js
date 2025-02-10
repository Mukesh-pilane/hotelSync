import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { CATEGORY } from "../../../utility/apiEndPoints"

export const getCategory =  (params) => {
    return  privateRequest.get(`${CATEGORY}`, {
        params
    });
};

export const addCategory =  (data) => {
    return  privateRequest.post(CATEGORY, data);
};