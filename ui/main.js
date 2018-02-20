var button=document.getElementById("counter");
var counter=0;
var span=document.getElementById("count");
counter.onclick=function(){
    counter=counter+1;
    var span=document.getElementById("count");
    span.innerHTML=counter.tostring();
    
}