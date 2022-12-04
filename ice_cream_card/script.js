// здесь лежат товары
const url = 'api/product.json';

// body
const body = document.querySelector('body');

// мороженки для главной
const mainIce_cream = [
    {
        id: 1,
        title : 'Нежный пломбир<br> с клубничным джемом',
        description : 'Натуральное мороженое из свежих сливок<br> и молока с вкуснейшим клубничным джемом – это идеальный десерт для всей семьи.',
        img: 1,
        img_second: 2,
        img_third: 3,
    },
    {
        id: 2,
        title : 'Сливочное мороженое<br> со вкусом банана',
        description : 'Сливочное мороженое с ярким банановым<br> вкусом подарит вам свежесть и наслаждение<br> даже в самый жаркий летний день.',
        img: 2,
        img_second: 3,
        img_third: 1,
    },
    {
        id: 3,
        title : 'Карамельный пломбир<br> с маршмеллоу',
        description : 'Необычный сладкий десерт с карамельным<br> топпингом и кусочками зефира завоюет<br> сердца сладкоежек всех возрастов.',
        img: 3,
        img_second: 1,
        img_third: 2,
    },
];

// асинхронно получаем товары
async function fetchProducts(url) {
    // возвращаем результат
    return await fetch(url).then((response) => {
        // если ок, вернутся нужные данные
        if (response.ok) {
            return response.json();
        // если нет то выведется ошибка
        } else {
            return response.json().then((error) => {
                throw error;
            });
        }
    });
}

// шаблон карточки товара
function templateCard(product) {
    return `
        <div class="card-item">
            <div class="card-item__img">
                <img src="images/main/card/ice_cream${product.image}" alt="">
            </div>
            <div class="card-item__title">${product.name}</div>
            <div class="card-item__text">${product.description}</div>
            <div class="card-item__price_block">
                <span class="card-item__price">${product.price} ₽/кг</span>
                <button class="card-item__btn" data-id="${product.article}">
                    <img src="images/main/card/icon.svg" alt="">
                </button>
            </div>
        </div>
    `;
}

// шаблон мороженок на главной
function templateIceCream(iceCream) {
    return `
        <div class="mainPage1" data-id="${iceCream.id}">

            <div class="mainPage1-title">${iceCream.title}</div>
            <div class="mainPage1-description">${iceCream.description}</div>
            <button class="mainPage1-btn">Заказать</button>

        </div>

        <div class="mainPage2">

                <div class="mainPage2-img__first">
                    <button class="mainPage2-img-arrow__left btn_switch" data-btn="prev"></button>
                    <button class="mainPage2-img-arrow__right btn_switch" data-btn="next"></button>
                    <img class="mainPage2-img__product1" src="./images/main/imgMain/ice-cream${iceCream.img}.png" alt="">
                    <div class="mainPage2-img__background1"></div>
                </div>

                <div class="mainPage2-img__second">
                    <img class="mainPage2-img__product2" src="./images/main/imgMain/min_ice-cream${iceCream.img_second}.png" alt="">
                    <div class="mainPage2-img__background2"></div>
                </div> 
                
                <div class="mainPage2-img__third">
                    <img class="mainPage2-img__product3" src="./images/main/imgMain/min_ice-cream${iceCream.img_third}.png" alt="">
                    <div class="mainPage2-img__background2"></div>
                </div>

                <div class="mainPage2-social">
                    <a class="mainPage2__social_item" href="#">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM12.5884 14.9749H11.8711C11.8711 14.9749 10.2885 15.0584 8.89479 13.7867C7.37486 12.3995 6.03249 9.64702 6.03249 9.64702C6.03249 9.64702 5.95511 9.46654 6.03917 9.3793C6.13366 9.28121 6.39106 9.27493 6.39106 9.27493L8.10567 9.26508C8.10567 9.26508 8.26727 9.28878 8.38294 9.36317C8.47824 9.42457 8.53167 9.53936 8.53167 9.53936C8.53167 9.53936 8.80878 10.1536 9.17581 10.7093C9.89212 11.7942 10.2258 12.0315 10.469 11.9152C10.8233 11.7458 10.7171 10.3816 10.7171 10.3816C10.7171 10.3816 10.7236 9.88646 10.5387 9.66601C10.3955 9.4951 10.1254 9.44527 10.0062 9.43128C9.90971 9.42 10.0681 9.22367 10.2733 9.13558C10.5819 9.00308 11.1268 8.99551 11.7706 9.00136C12.2722 9.00579 12.4165 9.0332 12.6127 9.07475C13.0677 9.17105 13.0536 9.47963 13.0229 10.1454C13.0138 10.3444 13.0032 10.5752 13.0032 10.8418C13.0032 10.9018 13.0012 10.9657 12.9991 11.0315C12.9885 11.3725 12.9763 11.7629 13.2324 11.908C13.3637 11.9822 13.6849 11.9191 14.4884 10.7233C14.8693 10.1566 15.1549 9.49024 15.1549 9.49024C15.1549 9.49024 15.2173 9.37145 15.3142 9.32048C15.4134 9.26851 15.5472 9.2845 15.5472 9.2845L17.3515 9.27465C17.3515 9.27465 17.8937 9.21796 17.9815 9.43242C18.0735 9.65758 17.7788 10.1833 17.0417 11.0444C16.3463 11.8567 16.006 12.1587 16.0328 12.4236C16.0527 12.6198 16.2739 12.7957 16.7015 13.1436C17.5897 13.8661 17.8264 14.2455 17.8827 14.3357C17.8872 14.343 17.8906 14.3484 17.893 14.3519C18.2905 14.9296 17.4522 14.9749 17.4522 14.9749L15.8497 14.9944C15.8497 14.9944 15.5053 15.0543 15.0521 14.7814C14.8151 14.6388 14.5833 14.406 14.3626 14.1842C14.0251 13.8451 13.7131 13.5316 13.4469 13.6056C13.0002 13.7298 13.0143 14.5734 13.0143 14.5734C13.0143 14.5734 13.0175 14.7536 12.9157 14.8495C12.8051 14.954 12.5884 14.9749 12.5884 14.9749Z" fill="#FCFCFC"/>
                        </svg>
                    </a>

                    <a class="mainPage2__social_item" href="#">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM14.4286 12.9H13V18H10.7143V12.9H9V10.5H10.7143V8.82C10.7143 6.9942 11.816 6 13.3674 6C14.1103 6 14.8137 6.0582 15 6.084V8.1H14.1429C13 8.1 13 8.682 13 9.3V10.5H15L14.4286 12.9Z" fill="#FCFCFC"/>
                        </svg>
                    </a>

                    <a class="mainPage2__social_item" href="#">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM14.4732 6.036C13.8336 6.006 13.6302 6 12 6C10.3698 6 10.1664 6.0078 9.5268 6.036C8.8872 6.066 8.4528 6.1662 8.07 6.315C7.66946 6.46544 7.3066 6.70154 7.0068 7.0068C6.70128 7.30639 6.46514 7.66931 6.315 8.07C6.1662 8.4528 6.066 8.8872 6.036 9.5268C6.006 10.1664 6 10.3698 6 12C6 13.6302 6.0078 13.8336 6.036 14.4732C6.066 15.1122 6.1662 15.5478 6.315 15.93C6.46556 16.3305 6.70164 16.6933 7.0068 16.9932C7.30652 17.2986 7.6694 17.5347 8.07 17.685C8.4528 17.8332 8.8878 17.934 9.5268 17.964C10.1664 17.994 10.3698 18 12 18C13.6302 18 13.8336 17.9922 14.4732 17.964C15.1122 17.934 15.5478 17.8332 15.93 17.685C16.3304 17.5343 16.6932 17.2982 16.9932 16.9932C17.2987 16.6936 17.5348 16.3307 17.685 15.93C17.8332 15.5472 17.934 15.1122 17.964 14.4732C17.994 13.8336 18 13.6302 18 12C18 10.3698 17.9922 10.1664 17.964 9.5268C17.934 8.8878 17.8332 8.4522 17.685 8.07C17.5344 7.66955 17.2983 7.30674 16.9932 7.0068C16.6596 6.6738 16.326 6.4674 15.93 6.315C15.5472 6.1662 15.1122 6.066 14.4732 6.036ZM9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868ZM15.6803 8.31967C15.821 8.46032 15.9 8.65109 15.9 8.85C15.9 9.04891 15.821 9.23968 15.6803 9.38033C15.5397 9.52098 15.3489 9.6 15.15 9.6C14.9511 9.6 14.7603 9.52098 14.6197 9.38033C14.479 9.23968 14.4 9.04891 14.4 8.85C14.4 8.65109 14.479 8.46032 14.6197 8.31967C14.7603 8.17902 14.9511 8.1 15.15 8.1C15.3489 8.1 15.5397 8.17902 15.6803 8.31967ZM13.2728 10.7272C12.9352 10.3896 12.4774 10.2 12 10.2C11.5226 10.2 11.0648 10.3896 10.7272 10.7272C10.3896 11.0648 10.2 11.5226 10.2 12C10.2 12.4774 10.3896 12.9352 10.7272 13.2728C11.0648 13.6104 11.5226 13.8 12 13.8C12.4774 13.8 12.9352 13.6104 13.2728 13.2728C13.6104 12.9352 13.8 12.4774 13.8 12C13.8 11.5226 13.6104 11.0648 13.2728 10.7272Z" fill="#FCFCFC"/>
                        </svg>
                    </a>
                </div>

        </div>
    `;
}

// функция рендеринга мороженок на главной
// получаем массив мороженок и в каком порядке их расставить
function renderIceCream(mainIce_cream, method = '123') {

    // выбираем контейнер для мороженок на странице
    const container = document.querySelector('.mainPage');

    // создаем контейнер для мороженок в коде
    let iceCreams = '';

    // получаем мороженки в нужном порядке
    if (method === '123') {
        body.className = '';
        body.classList.add('pink');
        iceCreams += templateIceCream(mainIce_cream[0]);
    } else if (method === '231') {
        body.className = '';
        body.classList.add('blue');
        iceCreams += templateIceCream(mainIce_cream[1]);
    } else if (method === '312') {
        body.className = '';
        body.classList.add('yellow');
        iceCreams += templateIceCream(mainIce_cream[2]);
    }

    // вставляем сгенерированные мороженки на страницу
    container.innerHTML = iceCreams;


    // кнопка переключения мороженок
    const btn_switch = document.querySelectorAll('.btn_switch');

    // элемент по дата айди которого будем смотреть на какой мороженке сейчас стоим
    const iceCreamFlag = document.querySelector('.mainPage1');

    // переключение мороженок после отрисовки
    btn_switch.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            renderHelper(event, iceCreamFlag);
        });
    });

}

// функция для рендеринга карточек товаров
function renderCards(products) {
    // выбираем контейнер для карточек на странице
    const container = document.querySelector('.card-container');

    // создаем контейнер для карточек в коде
    let cards = '';

    // проверяем на какой странице находимся главная/каталог
    if (container.dataset.role === 'main') {
        // если главная, создаем счетчик, т.к. на главной только 4 позиции
        let counter = 0;
        for (product in products) {
            cards += templateCard(products[product]);
            counter++;
            if (counter === 4) {
                break;
            }
        }
    } else if (container.dataset.role === 'submissive') {
        for (product in products) {
            cards += templateCard(products[product]);
        }
        cards += `
        <div class="pagination">
            <button class="pagination_btn">Показать ещё</button>
        </div>
        <hr class="line">
        `;
    }

    // вставляем сгенерированные карточки на страницу
    container.innerHTML = cards;
}

// вызываем функцию которая получает данные из апи
// за тем вызываем рендер карточек и передаем туда полученный объект товаров
const products = fetchProducts(url)
    .then(res => {obj = res})
    .then(() => { renderCards(obj.products) });

// рендер дефолтного отображения мороженок
renderIceCream(mainIce_cream);


// помогает при формировании мороженок после переключения
function renderHelper(event, iceCreamFlag) {
    if (event.target.dataset.btn === 'prev') {
        switch (iceCreamFlag.dataset.id) {
            case '1':
                renderIceCream(mainIce_cream, '312');
                break;
            case '2':
                renderIceCream(mainIce_cream, '123');
                break;
            case '3':
                renderIceCream(mainIce_cream, '231');
                break;
            default:
                break;
        }
    } else if (event.target.dataset.btn === 'next') {
        switch (iceCreamFlag.dataset.id) {
            case '1':
                renderIceCream(mainIce_cream, '231');
                break;
            case '2':
                renderIceCream(mainIce_cream, '312');
                break;
            case '3':
                renderIceCream(mainIce_cream, '123');
                break;
            default:
                break;
        }
    }
}