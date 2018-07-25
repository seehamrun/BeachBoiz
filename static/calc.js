var inputNumber = ""
var lastValue = null;
var el, newPoint, newPlace, offset;
function setup()
{
   inputNumber = document.querySelector("#testNum");
   inputRate = document.querySelector("#rateNum");
   inputCost = document.querySelector("#cost");

}



function calculate()
{
  userInput = Number(inputNumber.value);
  userRate = Number(inputRate.value);
  userCost = Number(inputCost.value);
  console.log(userInput*userRate)
  console.log(userCost)
  calcCost = userRate*userInput


  // if(userCost==0)
  //   calcCost=userRate*electricSlide.value

  if(userRate == 0)
  {
    alert("Please put in a number for rate")
    return;
  }

  // if(userInput>electricSlide.max)
  // {
  //   console.log("1")
  //   electricSlide.max=userInput*1.25;
  //   electricSlide.max = userInput*userRate*1.25
  // }

  // if(calcCost>costSlide.max)
  // {
  //   console.log("2")
  //   costSlide.max=calcCost*1.25;
  //   electricSlide.max=(calcCost/userRate)*1.25
  // }

  // if(userCost>costSlide.max)
  // {
  //   console.log("3")
  //
  //   costSlide.max=userCost*1.25
  //   electricSlide.max=userCost/userRate*1.25
  // }

  if(userInput!=lastValue && userInput>0)
  {
    console.log("4")
    // electricSlide.value=userInput;
    // costSlide.value = userInput*(userRate);
    inputCost.value = userInput*(userRate);
    lastValue=userInput
  }
  // else if(electricSlide.value!=lastValue && electricSlide.value!=1)
  // {
  //   console.log("5")
  //
  //   inputNumber.value = electricSlide.value
  //   costSlide.value = electricSlide.value*userRate
  //   inputCost.value = electricSlide.value*userRate
  //   console.log(inputCost.value)
  //   lastValue=electricSlide.value*userRate
  // }
  else if(userCost/userRate!=lastValue && userCost/userRate!=0)
  {
    console.log("6")

    var amt = userCost/userRate
    // electricSlide.value=amt
    inputNumber.value = amt
    // costSlide.value = userCost
    lastValue = amt
  }
  // else if (costSlide.value/userRate!=lastValue && costSlide.value!=1)
  // {
  //   console.log("madeit" +costSlide.value)
  //   var amt = costSlide.value/userRate
  //   console.log("amt:" + amt)
  //   electricSlide.value = amt
  //   inputNumber.value = amt
  //   inputCost.value = costSlide.value
  //   console.log(userInput)
  //   console.log(lastValue)
  //   lastValue = amt
  // }

}





window.addEventListener("load", () =>{

  setup()
  document.querySelector("#test").addEventListener("click", calculate);


  $(document).ready(function(){
      // Select all range inputs, watch for change
    $("input[type='range']").change(function() {
      console.log("madeite")
     // Cache this for efficiency
     el = $(this);

     // Measure width of range input
     width = el.width();

     // Figure out placement percentage between left and right of input
     newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));

      offset = -1;

     // Prevent bubble from going beyond left or right (unsupported browsers)
     if (newPoint < 0) { newPlace = 0; }
     else if (newPoint > 1) { newPlace = width; }
     else { newPlace = width * newPoint + offset; offset -= newPoint; }

     // Move bubble
     el
       .next("output")
       .css({
         left: newPlace,
         marginLeft: offset + "%"
       })
         .text(el.val());
     })
     // Fake a change to position bubble at page load
     .trigger('change');
  })


})
