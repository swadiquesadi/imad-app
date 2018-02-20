var button=document.getElementById("counter");
var counter=0;
var span=documet.getElementById("count");
counter.onclick=function(){
    counter=counter+1;
    span.innerHTML=counter.tostring();
    
}