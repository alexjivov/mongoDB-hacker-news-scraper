var mongoose = require("mongoose");

// Get a reference to the mongoose schema
var Schema = mongoose.Schema;

// Create a new schema
var newsSchema = new Schema({

     // `number` is of type Number
    // `number` must be unique
    // `number` is required. The default mongoose error message is thrown if it is not supplied
    rank: {
        type: Number,
        unique: true,
        required: true
    },

      // `string` must be of type String. We "trim" it to remove any trailing white space
    // `string` is a required field, and a custom error message is thrown if it is not supplied

    title: {
        type: String,
        trim: true,
        required: "String is Required"
    },
   
    // Mongoose URL use: https://www.npmjs.com/package/mongoose-type-url
    url: {
        work: {
            type: mongoose.SchemaTypes.Url,
            required: true
        },
        profile: {
            type: mongoose.SchemaTypes.Url,
            required: true
        },

    },

    points: {
        type: Number,
        unique: true,
        required: true,
    },

    username: {
        type: String,
        trim: true,
        required: "String is Required"
    },

    comments: {
        type: String,
        trim: true,
        required: false 
    }

});



// This creates our model from the above schema, using mongoose's model method
var News = mongoose.model("News", newsSchema);

        // Export the Example model
        module.exports = News;
