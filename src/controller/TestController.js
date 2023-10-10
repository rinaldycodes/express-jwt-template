const TestController = {
    getAllProducts: async (req, res) => {
        const data = {};
        // Logic to fetch all products from the database
        // data.user = await db.query('SELECT * FROM users');
        data.user = 'test';
        res.status(200).json({ 
            message: 'Get all products',
            data: data
        });
    },
    getProductById: (req, res) => {
      const productId = req.params.id;
      // Logic to fetch a product by ID from the database
      res.status(200).json({ message: `Get product with ID ${productId}` });
    },
    createProduct: (req, res) => {
      // Logic to create a new product based on request data
      res.status(201).json({ message: 'Product created successfully' });
    },
  };
  
  module.exports = TestController;
  