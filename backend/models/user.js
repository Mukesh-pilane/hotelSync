const { hashSync, compare } = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      allowNull: false,
    },
    mobile: {
      type: DataTypes.INTEGER,
      field: 'mobile',
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
      allowNull: false,
    },
    roleId : {
      type: DataTypes.INTEGER,
      filed: 'role_id',
      allowNull: false,
    },
    hotelId : {
      type: DataTypes.INTEGER,
      filed: 'hotel_id',
      allowNull: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
        default: null,
    },
    }, {
      indexes: [
        {
          name: 'unique_mobile_number_on_active_users',
          unique: true,
          fields: ['mobile'],
          where: {
            deleted_at: null, // Ensure uniqueness only for active users
          },
        },
      ],
      tableName: 'user',
      paranoid: true,
      underscored: true,
  });

  user.prototype.comparePassword = function (passw, cb) {
    return new Promise((resolve, reject) => {
      compare(passw, this.password, (err, isMatch) => {
        if (err) {
          return reject(err);
        }
        return resolve(isMatch);
      });
    });
  };

  user.associate = (models) => {
    user.hasOne(models.user_token, { foreignKey: 'user_id' });
    user.hasOne(models.user_otp, { foreignKey: 'user_id' });
    user.belongsTo(models.role, { foreignKey: 'role_id' });
    user.belongsTo(models.hotel, { foreignKey: 'hotel_id'} );
  };

  user.beforeCreate(async function(user, options) {
    if(user.password){
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
        } catch (err) {
            throw new Error(err);
        }
    }
  });

  user.beforeUpdate(async function(user, options) {
    if (user.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
        } catch (err) {
            throw new Error(err);
        }
    }
  });

  user.prototype.comparePassword = async function(passw) {
    try {
        const isMatch = await bcrypt.compare(passw, this.password);
        return isMatch;
    } 
    catch (err) {
        throw new Error(err);
    }
  };

  return user;
};
