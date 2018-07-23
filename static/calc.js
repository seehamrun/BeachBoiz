var inputNumber = ""
var lastValue = null;
function setup()
{
   inputNumber = document.querySelector("#testNum");
   slider1 = document.querySelector("#electricSlide");
   lastValue = slider1.value
}









function test()
{
  userInput = inputNumber.value.replace(/\D/g,'');
  if(slider1.value==lastValue)
  {
    if(userInput>slider1.max)
    {

      slider1.max=userInput*1.25
    }
    slider1.value=userInput;

    console.log(userInput)
    console.log(slider1.value)
    lastValue=userInput
  }
  else if(userInput==lastValue)
  {
    inputNumber.value = slider1.value
    lastValue=slider1.value
  }

}



window.addEventListener("load", () =>{

  setup()
  document.querySelector("#test").addEventListener("click", test);


})
