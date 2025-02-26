const router = require("express").Router();

const {errorWrapper} = require('../utils/errorWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkPermission = require('../middlewares/checkPermission');
const { validateAddCustomer, validateAddTransaction, validateUpdateCustomer, validateUpdateTransaction } = require('../validators/customerValidation');
const { validationError } = require('../utils/validationError');
const { 
    insertCustomer, 
    fetchCustomer, 
    addTransaction, 
    fetchTransaction, 
    updateCustomer, 
    deleteCustomer,
    updateTransaction,
    deleteTransaction } = require('../controllers/customer');

router.post('/',/* checkAuth, checkPermission,*/ validateAddCustomer, validationError, errorWrapper(insertCustomer));
router.get('/', checkAuth,/* checkPermission,*/ errorWrapper(fetchCustomer));
router.put('/:id', checkAuth,/* checkPermission,*/ validateUpdateCustomer, validationError,  errorWrapper(updateCustomer));
router.delete('/:id', checkAuth/*, checkPermission*/, errorWrapper(deleteCustomer));

// cutomer transactons
router.post('/transaction', checkAuth,/* checkPermission,*/ validateAddTransaction, validationError, errorWrapper(addTransaction));
router.get('/transaction', checkAuth,/* checkPermission,*/ errorWrapper(fetchTransaction));
router.put('/transaction/:id', checkAuth,/* checkPermission,*/validateUpdateTransaction, validationError, errorWrapper(updateTransaction));
router.delete('/transaction/:id', checkAuth,/* checkPermission,*/ errorWrapper(deleteTransaction));

module.exports = router;
