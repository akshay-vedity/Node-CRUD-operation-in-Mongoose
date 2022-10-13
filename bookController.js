let mongoose = require('mongoose');
let async = require('async');

//Import models
let BookModel = mongoose.model("book");

module.exports = {

    add: function (request, response) {

        let input = request.body;
        let bookModel = new BookModel;
        bookModel.title = input.title;
        bookModel.description = input.description;
        bookModel.author = input.author;
        bookModel.copyrightYear = input.copyrightYear;
        bookModel.publishedDate = new Date(input.publishedDate);
        bookModel.save().then(result => {
            response.status(200).send({ 'response': result });
        }).catch(err => {
            if (err) response.status(400).send({ 'errorMsg': err.name, 'response': err });
        });
    },

    edit: function (request, response) {

        let input = request.body;

        BookModel.findOne({ '_id': mongoose.Types.ObjectId(input.bookId) }).then(bookModel => {
            bookModel.title = input.title;
            bookModel.description = input.description;
            bookModel.author = input.author;
            bookModel.copyrightYear = input.copyrightYear;
            bookModel.publishedDate = new Date(input.publishedDate);
            bookModel.save().then(result => {
                response.status(200).send({ 'response': result });
            }).catch(err => {
                if (err) response.status(400).send({ 'errorMsg': err.name, 'response': err });
            });
        }).catch(err => {
            if (err) response.status(500).send({ 'errorMsg': err.name, 'response': err });
        });
    },

    delete: function (request, response) {

        let params = request.params;

        BookModel.findOne({ '_id': mongoose.Types.ObjectId(params.bookId) }).then(bookModel => {
            bookModel.remove().then(user => {
                response.status(200).send({ 'response': "Record deleted successfully" });
            }).catch(err => {
                if (err) response.status(400).send({ 'errorMsg': err.name, 'response': err });
            });
        }).catch(err => {
            if (err) response.status(500).send({ 'errorMsg': err.name, 'response': err });
        });
    },

    list: function (request, response) {

        let input = request.body;

        async.parallel({
            count: function (callback) {
                BookModel.count().exec(function (err, result) {
                    if (err) response.status(500).send({ 'errorMsg': err.name, 'response': err });

                    callback(err, result);
                });
            },
            list: function (callback) {
                BookModel.find().sort('-createdAt').exec(function (err, result) {
                    if (err) response.status(500).send({ 'errorMsg': err.name, 'response': err });

                    callback(err, result);
                });
            },
        }, function (err, results) {
            if (err) response.status(500).send({ 'errorMsg': err.name, 'response': err });

            response.status(200).send({
                'response': {
                    "total": results.count,
                    "list": results.list,
                }
            });
        });
    },
};
