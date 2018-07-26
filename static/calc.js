var inputNumber = ""
var lastValue = null;
var el, newPoint, newPlace, offset;
function setup()
{
   inputNumber = document.querySelector("#testNum");
   inputRate = document.querySelector("#rateNum");
   inputCost = document.querySelector("#cost");
   outputText = document.querySelector("#userMessage");

}



function calculate()
{
  console.log("buttonPressed")
  userInput = Number(inputNumber.value);
  userRate = Number(inputRate.value);
  userCost = Number(inputCost.value);
  console.log(userInput*userRate)
  console.log(userCost)
  calcCost = userRate*userInput




  if(userRate == 0)
  {
    alert("Please put in a number for rate")
    return;
  }

  if(userInput!=lastValue && userInput>0)
  {
    console.log("4")

    var amt = userInput*userRate;
    electricSlide.value=userInput;
    costSlide.value = amt;
    inputCost.value = amt;
    lastValue=userInput
    outputText.innerHTML = "Because your rate was <div id=amtUsed>" + userRate + " $/kWh</div>, and your usage was <div id=amtUsed>" +
                            userInput + " kWh</div>, you payed <div id=amtUsed>$" + amt +"</div>."
  }

  else if(userCost/userRate!=lastValue && userCost/userRate!=0)
  {
    console.log("6")

    var amt = userCost/userRate
    electricSlide.value=amt
    inputNumber.value = amt
    costSlide.value = userCost
    lastValue = amt
    outputText.innerHTML = "Beacuse your rate was <div id=amtUsed>" + userRate + " $/kWh</div>, and your bill was <div id=amtUsed>" +
                            userCost + "</div>, <br>you used <div id=amtUsed>" + amt + "</div> kWh of electricity."
  }


}





window.addEventListener("load", () =>{

  setup()
  document.querySelector("#test").addEventListener("click", calculate);


    $("input[type='range']").on('input', function() {
      // Cache this for efficiency
      el = $(this);
      // Change Label
      console.log(el.attr("id"))
      if(el.attr("id")=="electricSlide")
        inputNumber.value = el.val();
      else if(el.attr("id")=="costSlide")
        inputCost.value = el.val()
     })





})
