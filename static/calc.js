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
  userInput = Number(inputNumber.value.replace(/\D/g,''));
  if(electricSlide.value==lastValue)
  {
    console.log(userInput>electricSlide.max)
    if(userInput>electricSlide.max)
    {

      electricSlide.max=userInput*1.25
    }
    electricSlide.value=userInput;

    console.log(userInput)
    console.log(electricSlide.value)
    lastValue=userInput
  }
  else if(userInput==lastValue)
  {
    inputNumber.value = electricSlide.value
    lastValue=electricSlide.value
  }

}



window.addEventListener("load", () =>{

  setup()
  document.querySelector("#test").addEventListener("click", test);


})
