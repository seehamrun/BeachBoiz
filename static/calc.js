var inputNumber = ""
var lastValue = null;
function setup()
{
   inputNumber = document.querySelector("#testNum");
   electricSlide = document.querySelector("#electricSlide");
   inputRate = document.querySelector("#rateNum");
   costSlide = document.querySelector("#costSlide");
   inputCost = document.querySelector("#cost");
   lastValue = electricSlide.value
}









function test()
{
  console.log("in function")
  userInput = Number(inputNumber.value.replace(/\D/g,''));
  userRate = Number(inputRate.value.replace(/\D/g, ''));
  userCost = Number(inputCost.value.replace(/\D/g, ''));
  calcCost = userRate*userInput


  if(userCost==0)
    calcCost=userRate*electricSlide.value

  if(userRate == 0)
  {
    alert("Please put in a number for rate")
    return;
  }

  if(userInput>electricSlide.max)
  {
    console.log("1")
    electricSlide.max=userInput*1.25;
    electricSlide.max = userInput*userRate*1.25
  }

  if(calcCost>costSlide.max)
  {
    console.log("2")

    costSlide.max=calcCost*1.25;
    electricSlide.max=calcCost/userRate*1.25
  }

  if(userCost>costSlide.max)
  {
    console.log("3")

    costSlide.max=userCost*1.25
    electricSlide.max=userCost/userRate*1.25
  }
  if(userInput!=lastValue && userInput>0)
  {
    electricSlide.value=userInput;
    costSlide.value = userInput*userRate;
    inputCost.value = userInput*userRate;
    lastValue=userInput
  }
  else if(electricSlide.value!=lastValue && electricSlide.value!=1)
  {
    inputNumber.value = electricSlide.value
    costSlide.value = electricSlide.value*userRate
    inputCost.value = electricSlide.value*userRate
    lastValue=electricSlide.value*userRate
  }
  else if(userCost/userRate!=lastValue && userCost/userRate!=0)
  {
    var amt = userCost/userRate
    electricSlide.value=amt
    inputNumber.value = amt
    costSlide.value = userCost
    lastValue = amt
  }
  else if (costSlide.value/userRate!=lastValue && costSlide.value!=1)
  {
    console.log("madeit")
    var amt = costSlide.value/userRate
    electricSlide.value = amt
    inputNumber.value = amt
    inputCost.value = costSlide.value
    lastValue = amt
  }

}



window.addEventListener("load", () =>{

  setup()
  document.querySelector("#test").addEventListener("click", test);


})
