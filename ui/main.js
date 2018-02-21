var button=document.getElementById("counter");
var counter=0;
var span=document.getElementById("count");
button.onclick=function(){
var request=new XMLHttpRequest();
request.onreadystatechange = function(){
                                        if(request.readyState === XMLHttpRequest.DONE)
                                         {
                                            if(request.status===200)
                                             {
                                                 var counter = request.responseText;
                                                 var span = document.getElementById("count");
                                                span.innerHTML=counter.toString();
                                                }
                                         }
                                        }
request.open('GET',"http://http://swadiquesadi.imad.hasura-app.io/",true);
request.send(null);
};