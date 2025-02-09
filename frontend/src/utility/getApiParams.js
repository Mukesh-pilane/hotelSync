export const getApiParams = (payload) => {
    if (!payload) {
        return ""
    }
    const params = {};
    for (let key in payload) {
        if (payload[key] !== null && payload[key] !== undefined && payload[key] !== '') {
            params[key] = payload[key];
        }
    }
    return params;
}