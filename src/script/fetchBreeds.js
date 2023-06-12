import SlimSelect from 'slim-select';

export function fetchBreeds(key, selector, erroNotyfier) {
    
    fetch(`https://api.thecatapi.com/v1/breeds?${key}`)
        .then(response => response.json())
        .then(data => {

            const breeds = data.map(breed => ({
                text: breed.name,
                value: breed.id
            }));

            breeds.unshift({ text: 'Select Cat', value: undefined, placeholder: true });

            new SlimSelect({
                select: selector,
                data: breeds
            });

        })
        .catch(error => {
 
            erroNotyfier.failure(error)
            console.error(error)
 
        });
    
}