"use strict";
const Cabin = require("./cabin");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      cabin_id: {
        type: DataTypes.STRING,
        references: {
          model: Cabin,
          key: "id",
        },
      },
      name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      home_address: DataTypes.STRING,
      job_title: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
        unique: {
          args: "email",
          msg: "The email is already taken!",
        },
      },
      country: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      underscored: false,
      timestamps: true,
      freezeTableName: true,
      tableName: "users",
    }
  );
  User.associate = function (models) {
    // associations can be defined here
    User.belongsTo(models.Cabin, {
      foreignKey: "cabin_id",
      targetKey: "id",
    });
  };

  return User;
};
