export default (sequelize, DataTypes) =>
  sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(200),
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
    { timestamps: false, underscored: true }
  );
