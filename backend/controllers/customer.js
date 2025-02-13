const { retriveCustomers, createCustomer } = require('../services/customer');

exports.fetchCustomer = async (req, res) => {
    const hotelId = req.userData.hotelId;
    const result = await retriveCustomers(hotelId);
    res.status(200).send(result);
}

exports.insertCustomer = async (req, res) => {
    const body = req.body;
    const result = await createCustomer(body);
    res.status(200).send(result);
}


