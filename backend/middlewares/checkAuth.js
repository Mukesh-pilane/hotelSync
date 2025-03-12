const { verifyToken } = require('../utils/jwt');
const db = require('../models');
const { Model } = require('sequelize');

module.exports = async (req, res, next) => {
    const checkToken = req.headers.authorization;
    if (!checkToken) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    let accessToken = req.headers.authorization.split(' ')[1];
    const findInDb = await db.user_token.findOne({ where: { token: accessToken }});
    if (!findInDb) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const decode = verifyToken(accessToken);
    const userDetails = await db.user.findOne({ 
        where: { 
            mobile: decode.mobile,
            deletedAt: null
        },
        include: [
            { 
                model: db.role
            }
        ]
    });
    if (userDetails) {
        req.userData = { 
            id: userDetails.id, 
            role: userDetails.role_id,
            hotel: userDetails.hotel_id,
            roleName: userDetails.role?.name
        };
        next();
    } 
    else {
        return res.status(401).send({ message: 'Unauthorized' });
    }
};
