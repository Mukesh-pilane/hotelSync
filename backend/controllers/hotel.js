const { addHotel, retriveHotels } = require('../services/hotel');

exports.insertHotel = async (req, res) => {
    const body = req.body;
    const result = await addHotel(body);
    res.status(200).send(result);
}

exports.fetchHotels = async (req, res) => {
    const { email } = req.body;
    const accesstoken = req.header("Authorization");
    const result = await retriveHotels(email, accesstoken);
    res.status(200).send(result);
}