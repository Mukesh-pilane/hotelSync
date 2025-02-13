const router = require("express").Router();

const {errorWrapper} = require('../utils/errorWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkPermission = require('../middlewares/checkPermission');
const { validateAddCustomer } = require('../validators/customerValidation');
const { validationError } = require('../utils/validationError');
const { insertCustomer, fetchCustomer } = require('../controllers/customer');

router.post('/', checkAuth,/* checkPermission,*/ validateAddCustomer, validationError, errorWrapper(insertCustomer));
router.get('/', checkAuth,/* checkPermission,*/ errorWrapper(fetchCustomer));

module.exports = router;
