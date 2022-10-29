module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          display_name: 'Amelia Watson',
          email: 'ameliawatson@hololive.com',
          password: '123456',
          image:
            'https://static.wikia.nocookie.net/virtualyoutuber/images/9/97/Watson_Amelia_Portrait.png/revision/latest?cb=20200910193116',
        },
        {
          id: 2,
          display_name: 'Red PKMN',
          email: 'red.pkmn@pokemail.com',
          password: '123456',
          image:
            'https://archives.bulbagarden.net/media/upload/8/83/FireRed_LeafGreen_Red.png',
        },
      ],
      { timestamps: false }
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
