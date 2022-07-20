const { Model, DataTypes, Sequelize } = require('sequelize');
const{ ORDER_TABLE} = require('./order.model');
const{ PRODUCT_TABLE} = require('./product.model');

const ORDER_PRODUCT_TABLE = 'order_product';
const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  orderId:{
    allowNull: false,
    field: 'order_id',
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'amount'
  },
  productId:{
    allowNull: false,
    field: 'product_id',
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  }
}

class OrderProduct extends Model {
  static associate(){
    //
  }
  static config(sequelize) {
    return{
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false
    }
  }
}

module.exports = {ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct};
