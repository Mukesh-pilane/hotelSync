import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { HOTEL } from "../../../utility/apiEndPoints"

export const getHotels =  (params) => {
    return  privateRequest.get(HOTEL, {
        params
    });
};

export const addHotel =  (data) => {
    return  privateRequest.post(HOTEL, data);
};