const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE }= require('./category.model');
const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field:"created_at"
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT  // TEXT is the default type for MySQL
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(10,2)
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  categoryId:{
    allowNull: false,
    field: 'category_id',
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  }
};

class Product extends Model {
  static associate(models){
    this.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
  }
  static config(sequelize) {
    return{
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = {Product, ProductSchema, PRODUCT_TABLE};
