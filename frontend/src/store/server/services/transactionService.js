import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { TRANSACTION } from "../../../utility/apiEndPoints";

export const addTransactionLog = (data) => {
    return privateRequest.post(TRANSACTION, data);
};

export const getTransaction = (params) => {
    return privateRequest.get(TRANSACTION, {
        params
    });
};

export const deleteTransactionById = (id) => {
    return privateRequest.delete(`${TRANSACTION}/${id}`);
};

export const updateTransactionById = (id, data) => {
    return privateRequest.put(`${TRANSACTION}/${id}`, data);
};