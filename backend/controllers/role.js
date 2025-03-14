const { retriveRole } = require('../services/role');

exports.fetchRoles = async (req, res) => {
    const result = await retriveRole();
    res.status(200).send(result);
}