export default (sequelize, DataTypes) =>
  sequelize.define(
    'room',
    {
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: '0.0'
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT
      },
      img_path: {
        type: DataTypes.STRING(200)
      },
      bedroom: {
        type: DataTypes.INTEGER,
        defaultValue: '0'
      },
      bed: {
        type: DataTypes.INTEGER,
        defaultValue: '0'
      },
      bathroom: {
        type: DataTypes.INTEGER,
        defaultValue: '0'
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
