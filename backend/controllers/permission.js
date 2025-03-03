const { addPermission, retrivePermission, updatePermission, removePermission } = require('../services/permission');

exports.insertPermission = async (req, res) => {
    const body = req.body;
    const result = await addPermission(body);
    res.status(200).send(result);
}

exports.fetchPermission = async (req, res) => {
    const { page, limit } = req.query;
    const result = await retrivePermission({ page, limit });
    res.status(200).send(result);
}

exports.modifyPermission = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await updatePermission(id, body);
    res.status(200).send(result);
}

exports.removePermission = async (req, res) => {
    const id = req.params.id
    const result = await removePermission(id);
    res.status(200).send(result);
}