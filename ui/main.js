console.log("loaded");
var button=document.getElementById('counter');
button.onclick=function(){
var request=new XMLHttpRequest();
request.onreadystatechange = function(){
                                        if(request.readyState === XMLHttpRequest.DONE)
                                         {
                                            if(request.status===200)
                                             {
                                                 var counter = request.responseText;
                                                 var span = document.getElementById('count');
                                                span.innerHTML=counter.toString();
                                                }
                                         }
                                        };
request.open('GET','http://swadiquesadi.imad.hasura-app.io/counter',true);
request.send(null);
};
var nameInput=document.getElementById('name');

submit.onclick() =function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange= function(){
        if(request.readyState===XMLHttpRequest.DONE)
            {
                if(request.status===200)
                {
                      var names=request.responseText;
                      names=JSON.parse(names);
                         var list='';
                         for(var i=0;i<names.length;++i)
                        { 
                         list+='<li>'+names[i]+'</li>';
                        }
                       var ul=document.getElementById('namelist');
                        ul.innerHTML=list;
                        console.log("work1");
                }
            }
   }
   var name=nameInput.value;
var submit=document.getElementById('submit_btn');

  request.open('GET','http://swadiquesadi.imad.hasura-app.io/submit-name?name='+ name,true);
request.send(null);
};

console.log("work 2");

