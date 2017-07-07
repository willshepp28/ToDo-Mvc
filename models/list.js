'use strict';
module.exports = function(sequelize, DataTypes) {
  var List = sequelize.define('List', {
    title: DataTypes.STRING,
    order: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return List;
};