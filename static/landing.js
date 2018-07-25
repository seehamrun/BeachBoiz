window.addEventListener('load', () => {

//console.log("hello")
var learnMoreB = document.querySelector('#learnMoreB')
learnMoreB.addEventListener('click', ()=>{
  document.querySelector('#proDes').scrollIntoView({
    behavior: 'smooth'
  });
})


})
