const { 
    retriveCustomers, 
    createCustomer, 
    addTransaction, 
    retriveTransactions, 
    modifyCustomer, 
    removeCustomer,
    modifyTransactions,
    removeTransaction } = require('../services/customer');

exports.fetchCustomer = async (req, res) => {
    const query = {};
    query.hotelId = req.userData.hotel;
    query.page = req.query.page;
    query.limit = req.query.limit;
    query.search = req.query.search;
    const result = await retriveCustomers(query);
    res.status(200).send(result);
}

exports.insertCustomer = async (req, res) => {
    const body = req.body;
    body.createdBy = req.userData.id;
    body.belongsToHotel = req.userData.hotel;
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
    const query = {};
    query.hotelId = req.userData.hotel;
    query.page = req.query.page;
    query.limit = req.query.limit;
    query.search = req.query.search;
    const result = await retriveTransactions(query);
    res.status(200).send(result);
}

exports.updateTransaction = async (req, res) => {
    const transactionId = req.params.id;
    const body = req.body;
    const result = await modifyTransactions(transactionId, body);
    res.status(200).send(result);
}

exports.deleteTransaction = async (req, res) => {
    const transactionId = req.params.id;
    const result = await removeTransaction(transactionId);
    res.status(200).send(result);
}


