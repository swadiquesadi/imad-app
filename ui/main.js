console.log("loaded");
var submit=document.getElementById('submit_btn');
submit.onclick=function()
{
var request=new XMLHttpRequest();
request.onreadystatechange= function()
    {
    if(request.readyState===XMLHttpRequest.DONE)
            {
                if(request.status===200)
                {
                     console.log("login successfully");
                     alert("successfully logged");
                }
                else if(request.status===403)
                    {
                        console.log("username/password incorrect");
                        alert("username or password incorrect");
                    }
                else if(request.status===500)
                    {
                        alert("something went wrong");
                    }
            }
    };
var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST','http://swadiquesadi.imad.hasura-app.io/login',true);
request.setRequestHeader('Content-Type','application/json')
request.send(JSON.stringify({"username":username,"password":password}));
};

