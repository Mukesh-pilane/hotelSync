const { retriveCustomers, createCustomer, addTransaction, retriveTransactions, modifyCustomer, removeCustomer } = require('../services/customer');

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

exports.updateCustomer = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const result = await modifyCustomer(id, body);
    res.status(200).send(result);
}

exports.deleteCustomer = async (req, res) => {
    const id = req.params.id;
    const result = await removeCustomer(id);
    res.status(200).send(result);
}

exports.addTransaction = async (req, res) => {
    const body = req.body;
    body.hotelId = req.userData.hotel;
    const result = await addTransaction(body);
    res.status(200).send(result);
}

exports.fetchTransaction = async (req, res) => {
    const hotelId = req.userData.hotel;
    const result = await retriveTransactions(hotelId);
    res.status(200).send(result);
}


