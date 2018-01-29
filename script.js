//OBJECT
var obj = {
   isSession: true,
   t: {h: 0, min: 0, sec: 0},
   timeSession: 25,
   timeBreak: 5,   
   status: "Session",
   fancyH: "",
   //CHANGE SESSION TIME
   increaseSession: function(){this.timeSession++;},
   decreaseSession: function(){if(this.timeSession>1)this.timeSession--;},
   //CHANGE BREAK TIME
   increaseBreak: function(){this.timeBreak++;},
   decreaseBreak: function(){if(this.timeBreak>1)this.timeBreak--;},
   //CONVERT TO HOURS
   convertHours: function(){
      while(this.t.min > 60){
         this.t.min -= 60;
         this.t.h++;
      }      
   },
   //SET TIME
   setCurrent: function(time){
      this.t.h = 0;
      this.t.min = time;
      this.t.sec = -1;
      obj.convertHours();
   }   
};
//
obj.setCurrent(obj.timeSession);
var timer = null;
var div = document.getElementById("stretch");
//SET SECCION TIME/can be customised while break
$("#plus-s").click(function(){
   $("#dis-s").html(obj.increaseSession());
   obj.convertHours();
   if(obj.isSession) {
      obj.setCurrent(obj.timeSession);
      div.style.width = 0 + 'px';
   }   
   writeTime();   
   }
);
$("#min-s").click(function(){
   $("#dis-s").html(obj.decreaseSession());
   obj.convertHours();
   if(obj.isSession) {
      obj.setCurrent(obj.timeSession);
      div.style.width = 0 + 'px';      
   }
   writeTime();
   }
);
//SET BREAK TIME
$("#plus-b").click(function(){
   $("#dis-b").html(obj.increaseBreak());
   obj.convertHours();
   
   if(!obj.isSession){
      obj.setCurrent(obj.timeBreak);
      div.style.width = 0 + 'px';
   }
   writeTime();
   }
);
$("#min-b").click(function(){
   $("#dis-b").html(obj.decreaseBreak());
   obj.convertHours();
   if(!obj.isSession){
      obj.setCurrent(obj.timeBreak);
      div.style.width = 0 + 'px';
   }
   writeTime();
   }
);
//WRITE TIME
function writeTime(){
   $('#dis-b').html(obj.timeBreak);
   $('#dis-s').html(obj.timeSession);
   var seconds = (obj.t.sec > 0) ? (":"+(obj.t.sec+1)) : "";   
   if(obj.isSession){
      $("#time-show").html("Session: "+(obj.t.h*60+obj.t.min)+seconds);      
   }else{
      $("#time-show").html("Break: "+(obj.t.h*60+obj.t.min)+seconds);
   }
}
//FOR ANIMATION
function resetInterval(){
   clearInterval(timer);
   timer = null;
}
var odd = true;//the click is odd or even
var plusB = document.getElementById("plus-b"),
    minusB = document.getElementById("min-b"),
    plusS = document.getElementById("plus-s"),
    minusS = document.getElementById("min-s");
//ANIMATION CLICK
$("#sheath").click(function() {   
   if(odd){
      odd = !odd;      
      plusS.disabled = true;
      minusS.disabled = true;
      plusB.disabled = true;
      minusB.disabled = true;
      //obj.convertHours();
      animateDiv(div);
   }else{
      odd = !odd;
      plusS.disabled = false;
      minusS.disabled = false;
      plusB.disabled = false;
      minusB.disabled = false;
      resetInterval();
   }   
});
//ANIMATE STRETCH
function animateDiv(div) {
  var shWidth = $("#sheath").width();
  timer = setInterval(function() {  
     
     if(obj.t.h > 0 && obj.t.min === 0 && obj.t.sec === -1){
        obj.t.h--;
        obj.t.min = 59;
        obj.t.sec = 59;
     }
     obj.fancyH = (obj.t.h === 0) ? "" : (obj.t.h+":");
     
     if(obj.t.h === 0 && obj.t.sec === -1 && obj.t.min === 0){   
            if(obj.isSession) {               
               obj.isSession = !obj.isSession; 
               obj.t.min = obj.timeBreak;
               obj.status = "Break";
               obj.t.sec = 0;
               //alert(obj.timeBreak);
               $("body").css("background", "PaleGreen");
               
            }else{            
               obj.isSession = !obj.isSession;
               obj.t.min = obj.timeSession;
               obj.status = "Session";
               obj.t.sec = 0;
               //alert(obj.timeSession);
               $("body").css("background", "Linen");            
            }         
            clearInterval(timer);
            timer = null;
            div.style.width = 0 +"px";
            animateDiv(div);
            obj.convertHours();
         }
          
     
     if(obj.t.min > 0 && obj.t.sec === -1){
            obj.t.sec = 59;
            obj.t.min--;
         }
     
     if(obj.isSession){
        div.style.width = (shWidth - Math.round( 
                          ((60*(obj.t.h*60+obj.t.min)+obj.t.sec)*shWidth)/
                          (obj.timeSession*60) ) - 2) + 'px';
     }else{
        div.style.width = (shWidth - Math.round( 
                          ((60*(obj.t.h*60+obj.t.min)+obj.t.sec)*shWidth)/
                          (obj.timeBreak*60) ) - 2) + 'px';
     }
     
     $("#time-show").html(obj.status + ":   " + obj.fancyH + obj.t.min + ":" + obj.t.sec);
     obj.t.sec--;
  }, 1000);
}

/*BY THE WAY, THANKS FOR THIS: https://learn.javascript.ru/task/array-unique
CODE, IT HELPED ME/*
   var obj = {};

  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true; // запомнить строку в виде свойства объекта
  }

  return Object.keys(obj);* MANY TIMES
  */