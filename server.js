var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var app = express();
var crypto=require('crypto');
var bodyParser=require('body-parser');
app.use(morgan('combined'));
app.use(bodyParser.json());

var config={
    user:'swadiquesadi',
    database:'swadiquesadi',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
    };
var pool=new Pool(config);
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
function createTemplate(data){
    
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
        <div>${date.toDateString()}</div>
        <div>
        ${content}
        </div>
        </div>
    </body>
    
</html>`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
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
var names=[];
app.get('/submit-name',function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));

});
function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
};
app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-a-random string');
    res.send(hashedString);
});
app.post('/login',function(req,res){
    var username=req.body.username;
   var password=req.body.password;
   pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result)
   {
       if(err)
       {
        result.status(500).send(err.toString());
       }
       if(result.length.rows===0)
       {
           res.send(403).send("username or password is incorrect");
       }
       else{
           var dbstring=result.rows[0].password;
           var salt=dbstring.split('$')[2];
           var hashedpassword=hash(password,salt);
           if(dbstring===hashedpassword)
            {res.send("Credentials are correct");}
            else
            {res.send(403).send("username or password incorrect");}
            }
        
   });
    
});

app.post('/create-user',function(req,res){
   var username=req.body.username;
   var password=req.body.password;
   var salt=crypto.randomBytes(128).toString('hex');
   var dbstring=hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) values($1,$2)',[username,dbstring],function(err,result)
   {
       if(err)
       {
        result.status(500).send(err.toString());
       }
       else{
           res.send('user successfully created'+username);
            }
        
   });
});
app.get('/articles/:articleName',function(req,res){
    pool.query("SELECT * FROM article WHERE title= $1",[req.params.articleName], function(err,result){
    if(err)
        {
        res.status(500).send(err.toString()); 
        }
    else{
            if(result.rows.length===0)
            {
            res.status(404).send('no articles found');    
            }
            else
            {
            var articleData=result.rows[0];
            res.send(createTemplate(articleData));
            }
        }
    });
     
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80
var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
