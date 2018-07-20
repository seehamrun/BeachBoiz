var inputNumber = ""

function setup()
{
   inputNumber = document.querySelector("#testNum");

}









function test()
{
  userInput = inputNumber.value.replace(/\D/g,'');;
  console.log(userInput)
}



window.addEventListener("load", () =>{
  setup()
  document.querySelector("#test").addEventListener("click", test);


})
