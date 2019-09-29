Date.prototype.Code = function (current) {
  var currentYear = current.getFullYear().toString();
  var currentMonth = (current.getMonth()+1).toString();
  var currentDay = current.getDate().toString();
  var currentHour = current.getHours().toString();
  var currentMinutes = current.getMinutes().toString();
  var currentSeconds  = current.getSeconds().toString();
  var currentTime = currentYear + currentMonth + currentDay + currentHour + currentMinutes + currentSeconds;
  var letterArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  var UpperLetter = letterArray.map(item => item.toLocaleUpperCase());
  var numberArray = [1,2,3,4,5,6,7,8,9,0];
  var Array = letterArray.concat(UpperLetter);
  var number = '';
  var letter = '';
   for (var i = 0 ;i < 4; i++){
     var MathNumber = Math.floor(Math.random()*10);
     number += numberArray[MathNumber].toString();
   }

    for (var j = 0 ;j < 4; j++){
      var MathLetter = Math.floor(Math.random()*54);
      letter += Array[MathLetter].toString();
    }
    return letter + currentTime  +  number;
}


Date.prototype.format = function (current) {
  var currentYear = current.getFullYear().toString();
  var currentMonth = (current.getMonth()+1).toString();
  var currentDay = current.getDate().toString();
  var currentHour = current.getHours().toString();
  var currentMinutes = current.getMinutes().toString();
  var currentSeconds  = current.getSeconds().toString();
  if(currentMonth<10){
    currentMonth = '0'+currentMonth
  }
  if(currentDay<10){
    currentMonth = '0' + currentDay
  }
  if(currentHour<10){
    currentHour = '0' + currentHour
  }
  if(currentMinutes<10){
    currentMinutes = '0' + currentMinutes
  }
  if(currentSeconds<10){
    currentSeconds = '0' + currentSeconds
  }
  var currentTime = currentYear +'-'+ currentMonth +'-'+ currentDay +'/'+ currentHour +':'+ currentMinutes +':'+ currentSeconds;
  return currentTime
}

