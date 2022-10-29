const chai = require('chai');
const sinon = require('sinon');

chai.use(require('chai-http'));
const { expect } = chai;

const { postController } = require('../../../src/controllers');
const { postService } = require('../../../src/services');
const {
  newPost,
  newPostResponse,
  allBlogPosts,
  editedBlogPost,
} = require('../mocks/postsMock');

describe('Post controller', function () {
  afterEach(sinon.restore);

  describe('Creating a blog post', function () {
    it('With success', async function () {
      const req = {
        user: { displayName: 'Watson' },
        body: newPost,
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(postService, 'createBlogPostRegistry')
        .resolves({ type: null, message: newPostResponse });

      await postController.createBlogPost(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newPostResponse);
    });

    it('Fails if some value is invalid', async function () {
      const req = {
        user: { displayName: 'Watson' },
        body: { ...newPost, title: '' },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'createBlogPostRegistry').resolves({
        type: 400,
        message: 'Some required fields are missing',
      });

      await postController.createBlogPost(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: 'Some required fields are missing',
      });
    });

    it('Fails if a categoryId is invalid', async function () {
      const req = {
        user: { displayName: 'Watson' },
        body: { ...newPost, categoryIds: [999] },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'createBlogPostRegistry').resolves({
        type: 400,
        message: 'one or more "categoryIds" not found',
      });

      await postController.createBlogPost(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: 'one or more "categoryIds" not found',
      });
    });
  });

  describe('Searching for blog posts', function () {
    it('Shows all blog posts', async function () {
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'getAllBlogPosts').resolves(allBlogPosts);

      await postController.getAllBlogPosts({}, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allBlogPosts);
    });

    it('Shows blog posts by query', async function () {
      const req = { query: { q: 'Vamos' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'getBlogPostsByQuery').resolves({
        type: null,
        message: allBlogPosts[1],
      });

      await postController.getBlogPostsByQuery(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allBlogPosts[1]);
    });

    it('Shows a blog post by id', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'getBlogPostById').resolves({
        type: null,
        message: allBlogPosts[0],
      });

      await postController.getBlogPostById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allBlogPosts[0]);
    });

    it('Fails if the blog post id does not exists', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'getBlogPostById').resolves({
        type: 404,
        message: 'Post does not exist',
      });

      await postController.getBlogPostById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Post does not exist',
      });
    });
  });

  describe('Editing a blog post', function () {
    it('With success', async function () {
      const req = {
        user: { displayName: 'Lewis Hamilton' },
        params: { id: 1 },
        body: {
          title: 'Titulo editado',
          content: 'Conteúdo editado',
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'editBlogPost').resolves({
        type: null,
        message: editedBlogPost,
      });

      await postController.editBlogPost(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(editedBlogPost);
    });

    it('Fails if a value is invalid', async function () {
      const req = {
        user: { displayName: 'Lewis Hamilton' },
        params: { id: 1 },
        body: {
          title: '',
          content: 'Conteúdo editado',
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'editBlogPost').resolves({
        type: 400,
        message: 'Some required fields are missing',
      });

      await postController.editBlogPost(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: 'Some required fields are missing',
      });
    });

    it('Fails if the userId is not from the blog post owner', async function () {
      const req = {
        user: { displayName: 'Watson' },
        params: { id: 1 },
        body: {
          title: 'Titulo editado',
          content: 'Conteúdo editado',
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'editBlogPost').resolves({
        type: 401,
        message: 'Unauthorized user',
      });

      await postController.editBlogPost(req, res);

      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({
        message: 'Unauthorized user',
      });
    });
  });

  describe('Deleting a blog post', function () {
    it('With success', async function () {
      const req = {
        user: { displayName: 'Lewis Hamilton' },
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      sinon.stub(postService, 'deleteBlogPost').resolves({
        type: null,
        message: '',
      });

      await postController.deleteBlogPost(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('Fails if the blog post id does not exists', async function () {
      const req = {
        user: { displayName: 'Lewis Hamilton' },
        params: { id: 999 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'deleteBlogPost').resolves({
        type: 404,
        message: 'Post does not exist',
      });

      await postController.deleteBlogPost(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Post does not exist',
      });
    });

    it('Fails if the userId is not from the blog post owner', async function () {
      const req = {
        user: { displayName: 'Watson' },
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(postService, 'deleteBlogPost').resolves({
        type: 401,
        message: 'Unauthorized user',
      });

      await postController.deleteBlogPost(req, res);

      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({
        message: 'Unauthorized user',
      });
    });
  });
});
