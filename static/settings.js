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
    url = document.querySelector("#prof_url").value
    zip = document.querySelector("#zipcode").value
    console.log('was pressed')
    jQuery.post("/settings", {prof_url: url, zipcode: zip}, (data) => {
      console.log('it happened')
    });
  })
}
