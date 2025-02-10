import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { BOOK } from "../../../utility/apiEndPoints"

export const getBooks =  (params) => {
    return  privateRequest.get(BOOK, {
        params
    });
};

export const addBook =  (data) => {
    return  privateRequest.post(BOOK, data);
};