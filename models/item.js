'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    flavorText: DataTypes.STRING,
    weight: DataTypes.DECIMAL,
    value: DataTypes.DECIMAL,
    addedBy: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
  };
  return Item;
};