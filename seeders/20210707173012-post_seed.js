'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      id: 1,
      title: 'Blog Post',
      content: 'content of the blog is lorem ipsum for now',
      date:  new Date(),
      author: "imtheknown",
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
