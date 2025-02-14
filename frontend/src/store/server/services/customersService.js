import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { CUSTOMER, TRANSACTION } from "../../../utility/apiEndPoints"

export const getCustomers =  (params) => {
    return  privateRequest.get(CUSTOMER, {
        params
    });
};

export const addCustomer =  (data) => {
    return  privateRequest.post(CUSTOMER, data);
};

export const addTransactionLog =  (data) => {
    return  privateRequest.post(TRANSACTION, data);
};