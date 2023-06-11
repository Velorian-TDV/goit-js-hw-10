import SlimSelect from 'slim-select';
import { Notify } from 'notiflix'

const api_key = 'api_key=live_CzQbAgMGHKxPVe8rCobHj90GkfjvtTbnpWOKKgExi1wwjhsHe63KrLdXBNkEmEbC';
const breed_select = document.querySelector('.breed-select');
const cat_info = document.querySelector('.cat-info');
const search = document.getElementById('search');
const loader = document.querySelector('.loader');

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

fetch(`https://api.thecatapi.com/v1/breeds?${api_key}`)
    .then(response => response.json())
    .then(data => {

        const breeds = data.map(breed => ({
            text: breed.name,
            value: breed.id
        }));

        breeds.unshift({ text: 'Select Cat', value: '', placeholder: true });

        new SlimSelect({
            select: breed_select,
            data: breeds
        });

    })
    .catch(error => {
        Notify.failure(error)
    });

search.addEventListener('click', event => {

    const catId = breed_select.value;
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

            const existingCatCard = cat_info.querySelector('.cat-card');
            if (existingCatCard) {
                existingCatCard.remove();
            }

            cat_info.insertAdjacentHTML('beforeend', cat_card)

        })
        .catch(error => {
  
            Notify.failure('Wooops something wrong, more details in console')
            console.log(error);
            hideLoader()
  
        });

})