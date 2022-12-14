"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cabin = sequelize.define(
    "Cabin",
    {
      name: DataTypes.STRING,
      temperature: DataTypes.FLOAT,
      water: DataTypes.FLOAT,
      location: DataTypes.STRING,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      power_consumption: DataTypes.FLOAT,
      status: DataTypes.STRING,
    },
    {
      underscored: false,
      timestamps: true,
      freezeTableName: true,
      tableName: "cabins",
    }
  );
  Cabin.associate = function (models) {
    // associations can be defined here
    // Cabin.hasOne(models.User);
  };

  return Cabin;
};
