const { expect } = require('chai');
const sinon = require('sinon');

const {
  BlogPost,
  Category,
  User,
  PostCategory,
} = require('../../../src/models');
const { postService } = require('../../../src/services');
const {
  allBlogPosts,
  newPostResponse,
  newPost,
  editedBlogPost,
  editingABlogPost,
} = require('../mocks/postsMock');
const { allCategories } = require('../mocks/categoriesMock');
const { allUsers } = require('../mocks/userMocks');

describe('BlogPost service', function () {
  afterEach(sinon.restore);

  const userName = allUsers[0].displayName;

  describe('Searching for blog posts', function () {
    it('Show all blogs posts', async function () {
      sinon.stub(BlogPost, 'findAll').resolves(allBlogPosts);

      const result = await postService.getAllBlogPosts();
      expect(result).to.deep.equal(allBlogPosts);
    });

    it('Shows a blog post by id', async function () {
      sinon.stub(BlogPost, 'findByPk').resolves(allBlogPosts[0]);

      const result = await postService.getBlogPostById(1);
      expect(result.message).to.deep.equal(allBlogPosts[0]);
    });

    it('Fails if the id is invalid', async function () {
      sinon.stub(BlogPost, 'findByPk').resolves(undefined);

      const result = await postService.getBlogPostById(1);
      expect(result.message).to.deep.equal('Post does not exist');
    });

    describe('Searching by query', function () {
      it('Show a blog posts that includes a specific title', async function () {
        sinon.stub(BlogPost, 'findAll').resolves(allBlogPosts[1]);
        const result = await postService.getBlogPostsByQuery('vamos');
        expect(result.message).to.deep.equal(allBlogPosts[1]);
      });

      it('Show all blog posts if the query is empty', async function () {
        sinon.stub(BlogPost, 'findAll').resolves(allBlogPosts);
        const result = await postService.getBlogPostsByQuery('');
        expect(result.message).to.deep.equal(allBlogPosts);
      });

      it('Show an empty array if the blog post was not find', async function () {
        sinon.stub(BlogPost, 'findAll').resolves([]);
        const result = await postService.getBlogPostsByQuery('doideira');
        expect(result.message).to.be.an('array');
        expect(result.message).to.have.length(0);
      });
    });
  });

  describe('Creating a new blog post', function () {
    it('With success', async function () {
      sinon.stub(Category, 'findAll').resolves(allCategories);
      sinon.stub(User, 'findOne').resolves(allUsers[0]);
      sinon.stub(BlogPost, 'create').resolves({ dataValues: newPostResponse });
      sinon.stub(PostCategory, 'bulkCreate').resolves();

      const result = await postService.createBlogPostRegistry(
        userName,
        newPost
      );
      expect(result.message).to.deep.equal(newPostResponse);
    });

    it('Fails if the post body is invalid', async function () {
      const result = await postService.createBlogPostRegistry(userName, {
        ...newPost,
        title: '',
      });
      expect(result.message).to.equal('Some required fields are missing');
    });

    it('Fails if a category id is invalid', async function () {
      sinon.stub(Category, 'findAll').resolves([]);

      const result = await postService.createBlogPostRegistry(
        userName,
        newPost
      );
      expect(result.message).to.equal('one or more "categoryIds" not found');
    });
  });

  describe('Editing a blog post', function () {
    it('With success', async function () {
      sinon.stub(User, 'findOne').resolves(allUsers[0]);
      sinon
        .stub(BlogPost, 'findByPk')
        .onFirstCall()
        .resolves({ dataValues: allBlogPosts[0] })
        .onSecondCall()
        .resolves(editedBlogPost);
      sinon.stub(BlogPost, 'update').resolves();

      const result = await postService.editBlogPost(
        userName,
        1,
        editingABlogPost
      );
      expect(result.message).to.deep.equal(editedBlogPost);
    });

    it('Fails if the post body is invalid', async function () {
      const result = await postService.editBlogPost(userName, 1, {
        ...newPost,
        title: '',
      });
      expect(result.message).to.equal('Some required fields are missing');
    });

    it('Fails if the user is not the owner of the blog post', async function () {
      sinon.stub(User, 'findOne').resolves(allUsers[1]);
      sinon
        .stub(BlogPost, 'findByPk')
        .resolves({ dataValues: allBlogPosts[1] });

      const result = await postService.editBlogPost(
        userName,
        1,
        editingABlogPost
      );
      expect(result.message).to.equal('Unauthorized user');
    });
  });

  describe('Deleting a blog post', function () {
    it('With success', async function () {
      sinon
        .stub(BlogPost, 'findByPk')
        .resolves({ dataValues: allBlogPosts[0] });
      sinon.stub(User, 'findOne').resolves(allUsers[0]);
      sinon.stub(BlogPost, 'destroy').resolves();

      const result = await postService.deleteBlogPost(userName, 1);
      expect(result.type).to.equal(null);
    });

    it('Fails if the blog post id is invalid', async function () {
      sinon.stub(BlogPost, 'findByPk').resolves(undefined);

      const result = await postService.deleteBlogPost(userName, 999);
      expect(result.message).to.equal('Post does not exist');
    });

    it('Fails if the user is not the owner', async function () {
      sinon
        .stub(BlogPost, 'findByPk')
        .resolves({ dataValues: allBlogPosts[0] });
      sinon.stub(User, 'findOne').resolves(allUsers[1]);

      const result = await postService.deleteBlogPost(userName, 1);
      expect(result.message).to.equal('Unauthorized user');
    });
  });
});
