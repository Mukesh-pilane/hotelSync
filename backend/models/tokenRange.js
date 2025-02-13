module.exports = (sequelize, DataTypes) => {
    const tokenRange = sequelize.define('token_range',{
        hotelId: {
            type: DataTypes.INTEGER,
            field: 'hotel_id',
            allowNull: false,
        },
        startAmount: {
            type: DataTypes.INTEGER,
            field: 'start_amount',
            allowNull: false,
        },
        endAmount: {
            type: DataTypes.INTEGER,
            field: 'end_amount',
            allowNull: false,
        },
        tokenPoints: {
            type: DataTypes.INTEGER,
            field: 'token_points',
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at',
            default: null,
        },
    },{
        tablename: 'token_range',
        paranoid : true, 
        timestamps: true ,
        underscored: true,
    });

    tokenRange.associate = (models) => {
        tokenRange.belongsTo(models.hotel, { foreignKey: 'hotel_id', as: 'hotel' });
    }

    return tokenRange;
}