let express = require('express');
let app = require('./server');
let router = express.Router();

// Import controller
let bookController = require('./bookController');

// Setup CRUD routers
router.post('/book', bookController.add);
router.put('/book', bookController.edit);
router.delete('/book', bookController.edit);
router.delete('/book/:bookId', bookController.delete);
router.get('/book', bookController.list);

app.use(router);
module.exports = router;
