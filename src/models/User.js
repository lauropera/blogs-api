module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
    }
  );

  UserTable.associate = ({ BlogPost }) => {
    UserTable.hasMany(BlogPost, {
      as: 'blogPosts',
      foreignKey: 'userId',
    });
  };

  return UserTable;
};
