const url = 'api/product.json';

async function fetchProducts(url) {
    return await fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then((error) => {
                throw error;
            });
        }
    });
}

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
                <button class="card-item__btn">
                    <img src="images/main/card/icon.svg" alt="">
                </button>
            </div>
        </div>
    `;
}

function renderCards(products) {
    const container = document.querySelector('.card-container');

    let cards = '';

    if (container.dataset.role === 'main') {
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

    container.innerHTML = cards;

}

const products = fetchProducts(url)
    .then(res => {b = res})
    .then(() => { renderCards(b.products) });
