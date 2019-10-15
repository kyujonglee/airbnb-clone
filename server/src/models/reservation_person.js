export default (sequelize, DataTypes) =>
  sequelize.define(
    'reservation_person',
    {
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    { timestamps: false }
  );
