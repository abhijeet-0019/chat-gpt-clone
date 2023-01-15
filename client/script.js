import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container'); //bcs chat continer is id

let loadInterval;

//repeat the three dots animation until we get the result
function loader(element){
  console.log("---- loader is runnning ----")
  element.textContent = "";
  loadInterval = setInterval(()=>{
    element.textContent += ".";

    if(element.textContent === "...."){
      element.textContent = "";
    }
  }, 300)
}

//function to let the result apper letter by letter
function typeText(element, text){
  let index = 0;

  let interval = setInterval(()=>{
    if(index < text.length){
      element.innerHTML += text.charAt(index);
      index++;
    }else{
      clearInterval(interval);
    }
  }, 20)
}

//generation of Unique IDs
function generateUniqueID(){
  const timestamp = Date.now()
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

//creating different stripes (design) for user and AI (response)
function chatStripe(isAi, value, uniqueId){
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div>
          <div>
            <img
              src="${isAi ? bot : user}"
              alt="${isAi ? 'bot' : 'user'}"
            />
          </div>
          <div class="message" id=${uniqueId}>${value}</div>
        </div>
      </div> 
    `
  )
}

//handle Submit
const handleSubmit = async(e) => {
  console.log("---- handling the submit request ----")
  e.preventDefault()

  const data = new FormData(form);
  console.log("-----1")
  //user's chat stripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  console.log("-----1.1")
  form.reset();
  console.log("-----2")
  //bot's chatstript
  const uniqueId = generateUniqueID();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
  console.log("-----3")
  //as the user types, keep scrolling down
  chatContainer.scrollTop = chatContainer.scrollHeight;
  console.log("-----4")
  const messageDiv = document.getElementById(uniqueId);
  console.log("-----5")
  loader(messageDiv);
}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})
