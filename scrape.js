// dependencies for cheerio to pull data from hacker news
var request = require('request');
var cheerio = require('cheerio');

//Load the front page of Hacker News and displays its HTML code 
// use the <span> and .comhead class to hook jQuery API onto top 30 articles and parse through them easily
request('https://news.ycombinator.com', function (error, response, html) {
    if (!error && response.statusCode == 200) { // only loads the html if there is no error code and status code is 200
        var $ = cheerio.load(html);
        $ ('span.comhead').each(function(i, element) {
            var a = $(this).prev();
            console.log(a.text());
        });
    }
});


