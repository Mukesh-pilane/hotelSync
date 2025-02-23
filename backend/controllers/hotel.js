const { addHotel, retriveHotels, addRange } = require('../services/hotel');

exports.insertHotel = async (req, res) => {
    const body = req.body;
    const result = await addHotel(body);
    res.status(200).send(result);
}

exports.fetchHotels = async (req, res) => {
    const result = await retriveHotels();
    res.status(200).send(result);
}

exports.insertRange = async (req, res) => {
    const body = req.body;
    const result = await addRange(body);
    res.status(200).send(result);
}
