const router = require("express").Router();

const {errorWrapper} = require('../utils/errorWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkPermission = require('../middlewares/checkPermission');
const { fetchRoles } = require('../controllers/role');

router.get('/', checkAuth, checkPermission, errorWrapper(fetchRoles));

module.exports = router;