const router = require("express").Router();

const {errorWrapper} = require('../utils/errorWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkPermission = require('../middlewares/checkPermission');
const { validateAddUser, validateUpdateUser } = require('../validators/userValidation');
const { validationError } = require('../utils/validationError');
const { insertUser, fetchUsers, updateUser, removeUser } = require('../controllers/user');

router.post('/', checkAuth, checkPermission, validateAddUser, validationError, errorWrapper(insertUser));
router.get('/', checkAuth, checkPermission, errorWrapper(fetchUsers));
router.put('/:id', checkAuth, checkPermission, validateUpdateUser, validationError, errorWrapper(updateUser));
router.delete('/:id', checkAuth, checkPermission, errorWrapper(removeUser));

module.exports = router;
