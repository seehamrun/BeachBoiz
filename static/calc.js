var inputNumber = ""

function setup()
{
   inputNumber = document.querySelector("#testNum");
   slider1 = document.querySelector("#electricSlide");

}









function test()
{
  userInput = inputNumber.value.replace(/\D/g,'');
  console.log(userInput)
  console.log(slider1.value)
}



window.addEventListener("load", () =>{
  setup()
  document.querySelector("#test").addEventListener("click", test);


})
