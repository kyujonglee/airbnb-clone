export default (sequelize, DataTypes) =>
  sequelize.define(
    'user',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      naverId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('NOW()')
      }
    },
    { timestamps: false, underscored: false }
  );
