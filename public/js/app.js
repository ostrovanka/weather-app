console.log('Clientside JS')



const weatherForm = document.querySelector('form');
const addressInput = weatherForm.querySelector('input');
const infoParagraph = document.querySelector('#info');
const forecastParagraph = document.querySelector('#forecast');


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    fetch("https://api.bmg.tallium.com/v1/media").then(response=>{
        console.log(JSON.stringify(response))
    })
    infoParagraph.textContent='Searching location...'
    forecastParagraph.textContent=''
    fetch(`/weather?address=${addressInput.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                infoParagraph.textContent=data.error;
            }
            else{
                infoParagraph.textContent=data.location
                forecastParagraph.textContent=data.forecast
            }

        })
    })
})