var inputNumber = ""

function setup()
{
   inputNumber = document.querySelector("#testNum");
   slider1 = document.querySelector("#electricSlide");

}









function test()
{
  userInput = inputNumber.value.replace(/\D/g,'');
  //if(userInput>slider)
  console.log(userInput)
  slider1.value=userInput;
}



window.addEventListener("load", () =>{

  setup()
  document.querySelector("#test").addEventListener("click", test);


})
