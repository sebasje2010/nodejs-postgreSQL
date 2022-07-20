const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field:"created_at"
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

class Category extends Model {
  static associate(models){
    this.hasMany(models.Product, {foreignKey: 'categoryId', as: 'products'});
  }
  static config(sequelize) {
    return{
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = {Category, CategorySchema, CATEGORY_TABLE};
