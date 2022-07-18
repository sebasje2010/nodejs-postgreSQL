'use strict';
const{DataTypes} = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn (CUSTOMER_TABLE, "userId", { //esta linea es para cambiar algo en la columna, en este caso el unique true
      allowNull: false,
      field: 'user_id',
      type: DataTypes.INTEGER,
      unique: true, //esto antes nos faltaba y esto es para que sea unico
    });
  },

  async down (queryInterface) {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
