var inputNumber = ""
var lastValue = null;
var lastMonth = null;
var el, newPoint, newPlace, offset;
function setup()
{
   inputNumber = document.querySelector("#testNum");
   inputRate = document.querySelector("#rateNum");
   inputCost = document.querySelector("#cost");
   outputText = document.querySelector("#userMessage");

}

function loadData() {
  jQuery.get("/get_data", {}, (date) => {
    if(date[0]!=undefined)
    {
      lastMonth = date[0];
      inputRate.value=date[0]["cost"]/date[0]["qty"];
    }
  })
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
                            userInput + " kWh</div>, you would pay <div id=amtUsed>$" + amt +"</div>.";
    if(amt>lastMonth['cost'])
    {
      outputText.innerHTML += "<br> Compared to last month, you would spend <div id=amtOver>$" + (amt-lastMonth["cost"]) + "</div> more.";
    }
    else if(amt<lastMonth["cost"])
    {
      outputText.innerHTML += "<br> Compared to last month, you would save <div id=amtUnder>$" + (lastMonth["cost"]-amt) + "</div>.";
    }
    else
    {
      outputText.innerHTML += "<br> You would be paying the same as last month with this configuration.";
    }
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
                            userCost + "</div>, you used <div id=amtUsed>" + amt + "</div> kWh of electricity.";

    if(amt>lastMonth['cost'])
    {
      outputText.innerHTML += "<br> Compared to last month, you would spend <div id=amtOver>$" + (amt-lastMonth["cost"]) + "</div> more.";
    }
    else if(amt<lastMonth["cost"])
    {
      outputText.innerHTML += "<br> Compared to last month, you would save <div id=amtUnder>$" + (lastMonth["cost"]-amt) + "</div>.";
    }
    else
    {
      outputText.innerHTML += "<br> You would be paying the same as last month with this configuration.";
    }

  }


}





window.addEventListener("load", () =>{

  setup()
  loadData()
  document.querySelector("#test").addEventListener("click", calculate);

    console.log("test")
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
