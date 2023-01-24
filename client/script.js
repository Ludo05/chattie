import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval;

function loader(element) {
    element.innerText = '';

    loadInterval = setInterval(() => {
        element.textContent += '.'

        if(element.textContent.length === 5){
            element.innerText = ''
        }

    },300)
}


function typeText(element, text) {
        let index = 0;

        let interval = setInterval(() => {
            if(index < text.length) {
                element.innerHTML += text.charAt(index)
                index++;
            } else {
                clearInterval(interval)
            }
        }, 20)
}


function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hex = randomNumber.toString(16)

    return `id-${randomNumber}-${timestamp}`

}


function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">      
                <div class="profile">
                    <img src="${isAi ? bot : user}"
                    alt="${isAi ? 'bot' : 'user'}"/>
                </div>
                <div class="message" id="${uniqueId}">
                    ${value}
                </div>
            </div>
        </div>
        `
    )
}

const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

    form.reset();



    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, '' , uniqueId)

    chatContainer.scrollTop = chatContainer.scrollHeight

    const messageDiv = document.getElementById(uniqueId)

    loader(messageDiv)


    const response = await fetch('http://serv-env.eba-tfnkxnjy.us-east-1.elasticbeanstalk.com/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: data.get('prompt')
        })
    })


    clearInterval(loadInterval)
    messageDiv.innerHTML = '';

    if(response.ok) {
        const data = await response.json();

        const parsedText = data.bot.trim()

        typeText(messageDiv, parsedText)
    } else {
        const error = await response.text();
        messageDiv.innerHTML = 'Something went wrong';

        alert(error)
    }

}


form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        handleSubmit(e)
    }
})
