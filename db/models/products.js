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
    static associate({User}) {
      this.belongsTo(User, {foreignKey: "creator_id"})
      this.belongsToMany(User, {through: "Cards", foreignKey: "product_id"})
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