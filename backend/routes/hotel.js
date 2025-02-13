const router = require("express").Router();

const {errorWrapper} = require('../utils/errorWrapper');
const checkAuth = require('../middlewares/checkAuth');
const checkPermission = require('../middlewares/checkPermission');
const { validateAddHotel, validateAddRange } = require('../validators/validateAddHotel');
const { validationError } = require('../utils/validationError');
const { insertHotel, fetchHotels, insertRange } = require('../controllers/hotel');

router.post('/', checkAuth,/* checkPermission,*/ validateAddHotel, validationError, errorWrapper(insertHotel));
router.get('/', checkAuth,/* checkPermission,*/ errorWrapper(fetchHotels));
router.post('/range', checkAuth,/* checkPermission,*/ validateAddRange, validationError, errorWrapper(insertRange));

module.exports = router;