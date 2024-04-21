import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const LS_KEY = "show date";
const inputEl = document.querySelector('#datetime-picker');
const btnElStart = document.querySelector('button[data-start]');
btnElStart.disabled = true;
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let userSelectedDate;
let setIntervalId = null;
userSelectedDate = btnElStart.disabled;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= Date.now()) {
          iziToast.error({
            title: 'Error',
            titleSize: '18',
            titleColor: 'black',
            message: 'Please choose a date in the future',
            position: 'topRight',
            messageColor: 'white',
            messageSize: '18',
            backgroundColor: 'red',
            maxWidth: '380',
            transitionIn: 'fadeInLeft',
            timeout: '3000',
          });
            btnElStart.disabled = true;
            btnElStart.classList.add('not-show');
        } else {
            btnElStart.disabled = false;
            btnElStart.classList.remove('not-show');
            userSelectedDate = selectedDates[0];
      }
  },
};

flatpickr(inputEl, options);




btnElStart.addEventListener('click', showCountdawn);
function showCountdawn() {
    btnElStart.disabled = true;
     btnElStart.classList.add('not-show');
    inputEl.disabled = true;
    
    
    setIntervalId = setInterval(() => {
        const currentDate = Date.now();
        const differenceTime = userSelectedDate - currentDate;
        startCountdawn(convertMs(differenceTime));
        console.log(differenceTime);
        if (differenceTime < 1000) {
            clearInterval(setIntervalId); 
        } 
    }, 1000);
};


function startCountdawn({ days, hours, minutes, seconds }) {
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000; // 1000
  const minute = second * 60; // 60 000
  const hour = minute * 60; // 3 600 000
  const day = hour * 24; // 84 400 000

  
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};


/* console.log(convertMs(2000)); 
console.log(convertMs(140000)); 
console.log(convertMs(24140000)); 
 */