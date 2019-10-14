export default (sequelize, DataTypes) =>
  sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      // options
    }
  );
