'use strict';

const fs = require("fs")

module.exports = {
  up (queryInterface, Sequelize) {

    const arts = JSON.parse(fs.readFileSync("./data/arts.json", "utf-8"))
    arts.forEach((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert("Arts", arts, {});
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Arts", null, {})
  }
};
