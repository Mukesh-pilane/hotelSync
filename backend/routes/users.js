const router = require("express").Router();

const {errorWrapper} = require('../utils/errorWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkPermission = require('../middlewares/checkPermission');
const { validateAddUser } = require('../validators/userValidation');
const { validationError } = require('../utils/validationError');
const { insertUser, fetchUsers } = require('../controllers/user');

router.post('/', checkAuth, checkPermission, validateAddUser, validationError, errorWrapper(insertUser));
router.get('/', checkAuth, checkPermission, errorWrapper(fetchUsers));

module.exports = router;
