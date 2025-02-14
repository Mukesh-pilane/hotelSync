const { retriveCustomers, createCustomer, addTransaction } = require('../services/customer');

exports.fetchCustomer = async (req, res) => {
    const query = req.query
    const hotelId = req.userData.hotel;
    const result = await retriveCustomers(query, hotelId);
    res.status(200).send(result);
}

exports.insertCustomer = async (req, res) => {
    const body = req.body;
    body.createdBy = req.userData.id;
    const result = await createCustomer(body);
    res.status(200).send(result);
}

exports.addTransaction = async (req, res) => {
    const body = req.body;
    body.hotelId = req.userData.hotel;
    const result = await addTransaction(body);
    res.status(200).send(result);
}


