import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { TOKENRANGE } from "../../../utility/apiEndPoints";

export const addTokenRange = (data) => {
    return privateRequest.post(TOKENRANGE, data);
};

export const getTokenRange = (params) => {
    return privateRequest.get(TOKENRANGE, {
        params
    });
};

export const deleteTokenRangeById = (id) => {
    return privateRequest.delete(`${TOKENRANGE}/${id}`);
};

export const updateTokenRangeById = (id, data) => {
    return privateRequest.put(`${TOKENRANGE}/${id}`, data);
};


