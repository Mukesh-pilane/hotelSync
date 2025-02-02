const { fetchAllUsers, createUser } = require('../services/user');

exports.fetchUsers = async (req, res) => {;
    const result = await fetchAllUsers();
    res.status(200).send(result);
}

exports.insertUser = async (req, res) => {
    const body = req.body;
    const result = await createUser(body);
    res.status(200).send(result);
}
