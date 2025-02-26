import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { TRANSACTION } from "../../../utility/apiEndPoints"

export const addTransactionLog =  (data) => {
    return  privateRequest.post(TRANSACTION, data);
};

export const getTransaction =  (params) => {
    return  privateRequest.get(TRANSACTION, {
        params
    });
};