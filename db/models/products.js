'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      this.belongsTo(Users, {foreignKey: "creator_id"})
      this.belongsToMany(Users, {through: "Cards", foreignKey: "product_id"})
    }
  }
  Products.init({
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    condition: DataTypes.STRING,
    creator_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};