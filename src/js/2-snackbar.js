import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const delay = formData.get('delay');
  const state = formData.get('state');

  const delayInMilliseconds = parseInt(delay);

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delayInMilliseconds);
      }, delayInMilliseconds);
    } else {
      setTimeout(() => {
      reject(delayInMilliseconds);
    }, delayInMilliseconds);
  }
});


  promise.then(
    (delay) => {
        iziToast.show(
            {message: `✅ Fulfilled promise in ${delay}ms`,
             messageColor: 'white',
             color: 'green',
             theme: 'dark',
             position: 'topCenter',
             progressBar: false,
           });
    }  
  ).catch((delay) => {
    iziToast.show(
        {message: `❌ Rejected promise in ${delay}ms`,
         messageColor: 'white',
         color: 'red',
         theme: 'dark',
         position: 'topCenter',
         progressBar: false,
       });
});
}