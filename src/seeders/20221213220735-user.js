"use strict";

const { faker } = require("@faker-js/faker");
// const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */

    const users = [...Array(49)].map((user) => {
      const cabinId = faker.helpers.arrayElement([
        faker.helpers.unique(faker.datatype.number, [
          {
            max: 150,
            min: 2,
          },
        ]),
        null,
      ]);
      let status = "ACTIVE";
      if (!cabinId) status = "INACTIVE";
      return {
        name: faker.name.fullName(),
        home_address: faker.address.streetAddress(true),
        job_title: faker.name.jobTitle(),
        country: faker.address.country(),
        email: faker.internet.email(),
        phone_number: faker.phone.number(),
        cabin_id: cabinId,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    const testUser = {
      name: "Test Test",
      home_address: faker.address.streetAddress(true),
      job_title: faker.name.jobTitle(),
      country: faker.address.country(),
      email: "test@example.com",
      cabin_id: 1,
      status: "ACTIVE",
      phone_number: faker.phone.number(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(testUser);
    return queryInterface.bulkInsert("users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("users", null, {});
  },
};
