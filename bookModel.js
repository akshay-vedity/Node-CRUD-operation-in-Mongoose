let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let validationError = require('mongoose-validation-error-transform');
let schema = new Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    copyrightYear: { type: Number, required: true },
    publishedDate: { type: Date, required: true }
}, {
    collection: "book", autoIndex: true, timestamps: true,
    toObject: {
        transform: function (doc, obj) {
            obj.id = obj._id;
            delete obj._id;
        }
    },
    toJSON: {
        transform: function (doc, obj) {
            obj.id = obj._id;
            delete obj._id;
        }
    }
});
mongoose.plugin(validationError, {
    capitalize: true,
    humanize: true,
    transform: function (messages) {
        return messages;
    }
});
mongoose.model("book", schema);
