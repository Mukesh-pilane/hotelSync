const router = require("express").Router();

const {errorWrapper} = require('../utils/errorWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkPermission = require('../middlewares/checkPermission');
const { validateAddHotel, validateModifyHotel } = require('../validators/validateAddHotel');
const { validationError } = require('../utils/validationError');
const { insertHotel, fetchHotels, modifyHotel, deleteHotel } = require('../controllers/hotel');

router.post('/', checkAuth,/* checkPermission,*/ validateAddHotel, validationError, errorWrapper(insertHotel));
router.get('/', checkAuth,/* checkPermission,*/ errorWrapper(fetchHotels));
router.put('/:id', checkAuth,/* checkPermission,*/ validateModifyHotel, validationError, errorWrapper(modifyHotel));
router.delete('/:id', checkAuth,/* checkPermission,*/ errorWrapper(deleteHotel));

module.exports = router;