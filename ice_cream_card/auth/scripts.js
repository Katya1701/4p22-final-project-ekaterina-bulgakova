'use strict';

const formBtn = document.querySelector('.form-button__submit');
const form = document.querySelector('.form');
const email = document.querySelector('#email');
const emptyEmail = document.querySelector('.form-label__error___emptyEmail');
const incorrectEmail = document.querySelector('.form-label__error___incorrectEmail');
const pass = document.querySelector('#password');
const emptyPass = document.querySelector('.form-label__error___emptyPass');
const lengthPass = document.querySelector('.form-label__error___lengthPass');
const emptyPassConfirm = document.querySelector('.form-label__error___emptyPassConfirm');
const confirmation = document.querySelector('#password-confirmation');


formBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (form.classList.contains('formError')) {
        clear();
    }

    let error = false;
    const data = new FormData(form);
    const formDataEmail = data.get('email');
    const formDataEpass = data.get('password');
    const formDataEconformPass = data.get('password-confirmation');

    if (formDataEmail === '') {
        emptyEmail.classList.remove('hide');
        email.classList.add('border-error');
        error = true;
    } else {
        if (!validateEmail(formDataEmail)) {
            incorrectEmail.classList.remove('hide');
            email.classList.add('border-error');
            error = true;
        }
    }

    if (formDataEpass === '') {
        emptyPass.classList.remove('hide');
        pass.classList.add('border-error');
        error = true;
    } else if (formDataEpass.length < 8) {
        lengthPass.classList.remove('hide');
        pass.classList.add('border-error');
        error = true;
    }

    if (formDataEconformPass !== formDataEpass) {
        emptyPassConfirm.classList.remove('hide');
        confirmation.classList.add('border-error');
        error = true;
    }

    if (!error) {
        const finalyData = {
            'email': formDataEmail,
            'pass': formDataEpass,
            'gender': data.get('gender'),
            'comment': data.get('comment'),
            'checkbox': data.get('checkbox'),
        }
        console.log(finalyData);
    }

    conditionApp(error);
});

function conditionApp(state) {
    if (state) {
        form.classList.add('formError');
    } else {
        form.classList.remove('formError');
    }
}

function clear() {
    emptyEmail.classList.add('hide');
    email.classList.remove('border-error');
    incorrectEmail.classList.add('hide');
    email.classList.remove('border-error');
    emptyPass.classList.add('hide');
    pass.classList.remove('border-error');
    lengthPass.classList.add('hide');
    pass.classList.remove('border-error');
    emptyPassConfirm.classList.add('hide');
    confirmation.classList.remove('border-error');
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

