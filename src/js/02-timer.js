
// // Описаний в документації
import flatpickr from 'flatpickr';
// // Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

require('flatpickr/dist/themes/material_orange.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
    startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', timer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() > 0) {
      refs.startBtn.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    }
  },
};

const fp = flatpickr('input#datetime-picker', options);

function timer() {
  refs.startBtn.disabled = true;
  const startTime = fp.selectedDates[0];

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    if (deltaTime < 1000) {
     
      clearInterval(intervalId);
    }

    const timeLeft = convertMs(deltaTime);

    updateClockface(timeLeft);
  }, 1000);
}
function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

