var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var counter=0;
var articles={
 'article-one':{
    title:'Article one|swadique',
    heading:'Article one',
    date:'20 FEB 2018',
    content:` <p>this is my first arcle.i create this article to test my first url accessible page.this is my first arcle.i create this article to test my first url accessible pagethis is my first arcle.i create this article to test my first url accessible pagethis is my first arcle.i create this article to test my first url accessible pagethis is my first arcle.i create this article to test my first url accessible page
            </p>
        </div>
        <div>
            <p>this is my first arcle.i create this article to test my first url accessible page.this is my first arcle.i create this article to test my first url accessible pagethis is my first arcle.i create this article to test my first url accessible pagethis is my first arcle.i create this article to test my first url accessible pagethis is my first arcle.i create this article to test my first url accessible page
            </p>`
},
'article-two':{ title:'Article two|swadique',
    heading:'Article two',
    date:'30 FEB 2018',
    content: `<p>this is my second article for second article page</p>`},
 'article-three':{ title:'Article three|swadique',
    heading:'Article two',
    date:'30 FEB 2018',
    content: `<p>this is my second article for second article page
            </p>`}};
function createTemplate($data){
    
var title=data.title;
var heading=data.heading;
var date=data.date;
var content=data.content;
var htmlTemplate=`<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>
    ${title}
    </title>
    <link href="/ui/style.css" rel="stylesheet">
    </head>
    
    <body>
        <div class="container">
        <div><a href="/">home</a></div>
        <hr/>
        <div>
            <h3>${heading}</h3>
        </div>
        <div>${date}</div>
        <div>
        ${content}
        </div>
        </div>
    </body>
    
</html>`;
return htmlTemplate;
}


app.get('/:article',function(req,res){
    var article=req.params.article;
     res.send(createTemplate(articles[article]));
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/counter',function (req, res) {
    counter = counter+1;
    
    res.send(counter.toString());
   
    
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
