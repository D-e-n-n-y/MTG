'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Prodact}) {
      this.hasMany(Prodact, {foreignKey: "creator_id", as: "creator"},)
      this.belongsToMany(Prodact, {through: "Cards", foreignKey: "user_id"})
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};