const router = require("express").Router();

const {errorWrapper} = require('../utils/errorWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkPermission = require('../middlewares/checkPermission');
const { validateAddPermission, validateModifyPermission } = require('../validators/validatePermission');
const { validationError } = require('../utils/validationError');
const { insertPermission, fetchPermission, modifyPermission, removePermission } = require('../controllers/permission');

router.post('/', checkAuth, checkPermission, validateAddPermission,  validationError, errorWrapper(insertPermission));
router.get('/', checkAuth, checkPermission, errorWrapper(fetchPermission));
router.put('/:id', checkAuth, checkPermission, validateModifyPermission, validationError, errorWrapper(modifyPermission));
router.delete('/:id', checkAuth, checkPermission, errorWrapper(removePermission));

module.exports = router;