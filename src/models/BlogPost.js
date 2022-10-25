module.exports = (sequelize, DataTypes) => {
  const BlogPostsTable = sequelize.define(
    'BlogPost',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      tableName: 'blog_posts',
      underscored: true,
      createdAt: 'published',
      updatedAt: 'updated',
    }
  );

  BlogPostsTable.associate = ({ User }) => {
    BlogPostsTable.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return BlogPostsTable;
};
