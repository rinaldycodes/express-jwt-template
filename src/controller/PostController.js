const PostController = {
    getAllPosts: (req, res) => {
      // Logic to fetch all posts from the database
      res.status(200).json({ message: 'Get all posts' });
    },
    getPostById: (req, res) => {
      const postId = req.params.id;
      // Logic to fetch a post by ID from the database
      res.status(200).json({ message: `Get post with ID ${postId}` });
    },
    createPost: (req, res) => {
      // Logic to create a new post based on request data
      res.status(201).json({ message: 'post created successfully' });
    },
  };
  
  module.exports = PostController;
  