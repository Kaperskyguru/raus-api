"use strict";

const { faker } = require("@faker-js/faker");
// const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    const cabins = [...Array(150)].map((user) => ({
      name: faker.commerce.productName(),
      water: faker.datatype.number({ min: 10, max: 100 }),
      temperature: faker.datatype.number({
        max: 100,
      }),
      power_consumption: faker.datatype.number({
        min: 10,
        max: 100,
        precision: 0.01,
      }),
      state: faker.address.state(),
      location: faker.address.streetAddress(),
      country: faker.address.country(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("cabins", cabins, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("cabins", null, {});
  },
};
