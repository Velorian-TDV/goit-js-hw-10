import { Notify } from 'notiflix'
import { fetchBreeds } from './script/fetchBreeds';

const api_key = 'api_key=live_CzQbAgMGHKxPVe8rCobHj90GkfjvtTbnpWOKKgExi1wwjhsHe63KrLdXBNkEmEbC';
const breed_select = document.querySelector('.breed-select');
const cat_info = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function checkCatInfo() {

    const existingCatCard = cat_info.querySelector('.cat-card');

    if (existingCatCard) {
        existingCatCard.remove();
    }

}

function selectHandler() {

    const catId = breed_select.value;

    if (catId === 'Select Cat') {

        return console.log(breed_select.value)

    } else {

        const url = `https://api.thecatapi.com/v1/images/search?${api_key}&breed_id=${catId}`;

        showLoader()

        fetch(url)
            .then(response => response.json())
            .then(data => {

                hideLoader();

                const cat = data[0];

                const cat_card = `
                    <div class="cat-card">
                    
                        <div class="left-side">
                            <img src="${cat.url}" alt="${cat.breeds[0].name} image">
                        </div>

                        <div class="right-side">
                            <h1 class="name">${cat.breeds[0].name}</h1>
                            <p class="description">${cat.breeds[0].description}</p>
                            <p class="temperament"><span class="bold">Temperament:</span> ${cat.breeds[0].temperament}</p>
                        </div>

                    </div>
                `;

                checkCatInfo()

                cat_info.insertAdjacentHTML('beforeend', cat_card)

            })
            .catch(error => {

                Notify.failure('Wooops something wrong, more details in console')
                console.error(error);

                hideLoader()
                checkCatInfo()

            });

    }

}

fetchBreeds(api_key, breed_select, Notify)
breed_select.addEventListener('change', selectHandler)