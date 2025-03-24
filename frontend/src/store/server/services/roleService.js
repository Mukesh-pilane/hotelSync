import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { ROLE } from "../../../utility/apiEndPoints";

export const getRole = (params) => {
    return privateRequest.get(ROLE, {
        params
    });
};
