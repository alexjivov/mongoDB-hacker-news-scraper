// dependencies for cheerio to pull data from hacker news
var request = require('request');
var cheerio = require('cheerio');
var axios = require("axios");
var logger = require("morgan");

// Require all models
var Article = require("./models/Article");
var Note = require("./models/Note");



var PORT = 3000;

// Initialize Express
var app = express ();

// Use morgan logger for loggin requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//Mongo DB connection
mongoose.connect("mongodb://localhost/news");



//Load the front page of Hacker News and displays its HTML code 
// use the <span> and .comhead class to hook jQuery API onto top 30 articles and parse through them easily
request('https://news.ycombinator.com', function (error, response, html) {
    if (!error && response.statusCode == 200) { // only loads the html if there is no error code and status code is 200
        var $ = cheerio.load(html);
        //create array for results to load into
        var parsedResults = [];
        $ ('span.comhead').each(function(i, element) {
            // Selects the previous element
            var a = $(this).prev();
            // Get rank by parsing the element two levels above the "a" element
            var rank = a.parent().parent().text();
            // Parses link title
            var title = a.text();
            // Parse href attribute from the "a" element
            var url = a.attr('href');
            // Get subtext children from the next row in the HTML table
            var subtext = a.parent().parent().next().children('.subtext').children();
            // Extract relevant data from children  
            var points = $(subtext).eq(0).text();
            var username = $(subtext).eq(1).text();
            var comments = $(subtext).eq(2).text();
            //Parsed meta data object
            var metadata = {
                rank: parseInt(rank),
                title: title,
                url: url,
                points: parseInt(points),
                username: username,
                comments: parseInt(comments)
            }
           // Push meta-data into parsedResults array
           parsedResults.push(metadata);
            
        });
        //Log finished parse results in terminal
        console.log(parsedResults);
    }
});


