const { fetchAllUsers, createUser, modifyUser, deleteUser } = require('../services/user');

exports.fetchUsers = async (req, res) => {
    const query = {};
    query.page = req.query.page;
    query.limit = req.query.limit;
    query.search = req.query.search;
    const result = await fetchAllUsers(query);
    res.status(200).send(result);
}

exports.insertUser = async (req, res) => {
    const body = req.body;
    const result = await createUser(body);
    res.status(200).send(result);
}

exports.updateUser = async (req, res) => {
    const body = req.body;
    const id = req.param.id;
    const result = await modifyUser(id, body);
    res.status(200).send(result);
}

exports.removeUser = async (req, res) => {
    const id = req.param.id;
    const result = await deleteUser(id);
    res.status(200).send(result);
}
