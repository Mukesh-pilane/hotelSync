const router = require("express").Router();

const {errorWrapper} = require('../utils/errorWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkPermission = require('../middlewares/checkPermission');
const { validateAddRange, validateUpdateRange } = require('../validators/validateRange');
const { validationError } = require('../utils/validationError');
const { insertTokenRange, fetchTokenRange, modifyRange, removeRange } = require('../controllers/tokenRange');

router.post('/', checkAuth, checkPermission, validateAddRange, validationError, errorWrapper(insertTokenRange));
router.get('/', checkAuth, checkPermission, errorWrapper(fetchTokenRange));
router.put('/:id', checkAuth, checkPermission, validateUpdateRange, validationError, errorWrapper(modifyRange));
router.delete('/:id', checkAuth, checkPermission, errorWrapper(removeRange));

module.exports = router;
