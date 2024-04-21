import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    const element = event.currentTarget.elements;
    const delay = Number(element.delay.value);
    const state = element.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
                console.log(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(delay);
                console.log(`❌ Rejected promise in ${delay}ms`);
            }
        })
    }, delay);


    promise
        .then((delay) => {
            iziToast.show({
                position: 'topRight',
                titleColor: 'white',
                titleSize: '18px',
                backgroundColor: '#59a10d',
                messageColor: 'white',
                messageSize: '16px',
                title: 'OK',
                message: `✅ Fulfilled promise in ${delay}ms`,
            })
        })
        .catch((delay) => {
            iziToast.show({
                position: 'topRight',
                titleColor: "white",
                titleSize: '18px',
                backgroundColor: '#b54657',
                messageColor: "white",
                messageSize: '16px',
                title: `Error`,
                message: `❌ Rejected promise in ${delay}ms`
            })
        })
    
};
