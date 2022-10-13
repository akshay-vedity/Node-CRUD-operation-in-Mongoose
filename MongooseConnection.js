let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let uri = 'mongodb://localhost:27017/crud_demo_db';

let connectMongoose = function () {
    mongoose.connect(uri, {
        useMongoClient: true
    });
};

connectMongoose();

// Error handler
mongoose.connection.on('error', function (err) {
    console.log(err);
});

mongoose.connection.on('open', function () {
    //helper.importAllModels();
});

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
    setTimeout(function () {
        connectMongoose();
    }, 1000);
});

let helper = {
    importAllModels: function () {
        // body...
        require('./bookModel.js');
    }
};
helper.importAllModels();
