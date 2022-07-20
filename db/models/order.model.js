const { Model, DataTypes, Sequelize } = require('sequelize');
const{ CUSTOMER_TABLE }=require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field:"created_at"
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if(this.products.length>0){
        return this.products.reduce((total,item)=>{
          return total+(item.price*item.OrderProduct.amount);
        },0)
      }
      return 0;
    }
  }
};

class Order extends Model {
  static associate(models){
    this.belongsTo(models.Customer, {foreignKey: 'customerId', as: 'customer'});
    this.belongsToMany(models.Product, {through: models.OrderProduct, foreignKey: 'orderId', as: 'products', otherKey: 'productId'});
  }
  static config(sequelize) {
    return{
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = {Order, OrderSchema, ORDER_TABLE};