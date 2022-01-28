console.log('Clientside JS')



const weatherForm = document.querySelector('form');
const addressInput = weatherForm.querySelector('input');
const infoParagraph = document.querySelector('#info');
const forecastParagraph = document.querySelector('#forecast');


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    infoParagraph.textContent='Searching location...'
    forecastParagraph.textContent=''
    fetch(`http://localhost:3000/weather?address=${addressInput.value}`).then((response)=>{
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