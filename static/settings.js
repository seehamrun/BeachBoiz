function loadData() {
  jQuery.get("/get_data", {}, (data) => {
    drawBackgroundColor(data)
  });
}

window.addEventListener("load", () =>{
  console.log('was setup')
  clickHandler()
})

function clickHandler() {
  button = document.querySelector("#submit")
  button.addEventListener("click", () => {
    var url = document.querySelector("#prof_url").value
    var zip = document.querySelector("#zipcode").value
    if (url == "" || zip == "") {
      alert("Please fill out all of the values.")
    }
    else {
      var message = (`You have submitted "${url}" as your profile picture and ${zip} as your zip code.`)
      alert(message)
      jQuery.post("/settings", {prof_url: url, zipcode: zip}, (data) => {
        console.log('it submitted')
        });
    }
  })
}
