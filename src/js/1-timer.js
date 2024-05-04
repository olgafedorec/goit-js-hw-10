import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    countDownEl: document.querySelector('.timer'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
    startBtnEl: document.querySelector('[data-start]'),
    inputDateEl: document.querySelector('#datetime-picker'),
  };
  let intervalId = null;
  let userSelectedDate = [];

  refs.startBtnEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      const nowDate = Date.now()
      if(userSelectedDate < nowDate) {
        iziToast.show(
         {message: 'Please choose a date in the future',
          messageColor: 'white',
          color: 'red',
          theme: 'dark',
          position: 'topCenter',
          progressBar: false,
        }
      );
      } else {
        refs.startBtnEl.disabled = false;
      }
    },
  };
  
  flatpickr(refs.inputDateEl, options);

  const timer = {
    start() {
        const startTime = userSelectedDate;
        intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
           
            if (deltaTime <= 0) {
                clearInterval(intervalId);
                refs.inputDateEl.disabled = false;
                return;
            }
    
            const time = convertMs(deltaTime);
            updateCountdown(time);
            refs.startBtnEl.disabled = true;
            refs.inputDateEl.disabled = true;
        }, 1000);
    }
  }
  refs.startBtnEl.addEventListener('click', () => {
    timer.start();
  });

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
 
  function updateCountdown({ days, hours, minutes, seconds }) {
    refs.daysEl.textContent = `${days}`;
    refs.hoursEl.textContent = `${hours}`;
    refs.minutesEl.textContent = `${minutes}`;
    refs.secondsEl.textContent = `${seconds}`;
  }

  function pad(value) {
        return String(value).padStart(2, '0'); 
      }
    

 
  