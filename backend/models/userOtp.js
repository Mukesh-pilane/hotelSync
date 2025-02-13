const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
    const userOtp = sequelize.define('user_otp', {
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        field: 'is_verified',
        defaultValue: false,
      },
      expiryTime: {
        type: DataTypes.DATE,
        field: 'expiry_time',
        allowNull: true,
      },
    }, {
      freezeTableName: true,
      underscored: true,
      tableName: "user_otp"
    });

    userOtp.associate = (models) => {
      userOtp.belongsTo(models.user, { foreignKey: 'user_id' });
    };

    userOtp.beforeCreate(async function( userOtp, options ){
      const expiryTime = moment().add(10, "minutes");
      userOtp.expiryTime = expiryTime;
    });

    return userOtp;
  };
