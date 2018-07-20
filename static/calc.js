var inputNumber = ""

function setup()
{
   inputNumber = document.querySelector("#testNum");
}









function test()
{
  console.log(inputNumber)
}



window.addEventListener("load", () =>{
  setup()
  document.querySelector("#test").addEventListener("click", test);


})
