import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { CUSTOMER } from "../../../utility/apiEndPoints"

export const getCustomers =  (params) => {
    return  privateRequest.get(CUSTOMER, {
        params
    });
};

export const addCustomer =  (data) => {
    return  privateRequest.post(CUSTOMER, data);
};