export default (sequelize, DataTypes) =>
  sequelize.define(
    'reservation',
    {
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()')
      }
    },
    { timestamps: false }
  );
