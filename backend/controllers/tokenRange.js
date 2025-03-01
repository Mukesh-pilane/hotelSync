const { addTokenRange, retriveTokenRange, updateTokenRange, removeTokenRange } = require('../services/tokenRange');

exports.insertTokenRange = async (req, res) => {
    const body = req.body;
    body.hotelId = req.userData.hotel;
    const result = await addTokenRange(body);
    res.status(200).send(result);
}

exports.fetchTokenRange = async (req, res) => {
    const hotelId = req.userData.hotel;
    const { page, limit } = req.body;
    const result = await retriveTokenRange({hotelId, page, limit});
    res.status(200).send(result);
}

exports.modifyRange = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await updateTokenRange(id, body);
    res.status(200).send(result);
}

exports.removeRange = async (req, res) => {
    const id = req.params.id
    const result = await removeTokenRange(id);
    res.status(200).send(result);
}