const { addHotel, retriveHotels, updateHotel, removeHotel } = require('../services/hotel');

exports.insertHotel = async (req, res) => {
    const body = req.body;
    const result = await addHotel(body);
    res.status(200).send(result);
}

exports.fetchHotels = async (req, res) => {
    const query = {};
    query.page = req.query.page;
    query.limit = req.query.limit;
    query.search = req.query.search;
    const result = await retriveHotels(query);
    res.status(200).send(result);
}

exports.modifyHotel = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await updateHotel(id, body);
    res.status(200).send(result);
}

exports.deleteHotel = async (req, res) => {
    const id = req.params.id
    const result = await removeHotel(id);
    res.status(200).send(result);
}
