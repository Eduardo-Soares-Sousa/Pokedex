const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonName = document.querySelector('.pokemon-name')
const pokemonImage = document.querySelector('.pokemon-image')

const form = document.querySelector('.form')
const input = document.querySelector('.search-pokemon')
const btnPrevious = document.querySelector('.btn-previous')
const btnNext = document.querySelector('.btn-next')

let pokemonId = 1

async function pokemonApi(pokemon) {
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if(api.status === 200) {
        const pokemonData = await api.json();
        return pokemonData
    }
}

async function renderPokemon(pokemon) {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const pokemonData = await pokemonApi(pokemon)

    if(pokemonData) {
        pokemonImage.style.display = 'block'
        pokemonNumber.innerHTML = pokemonData.id
        pokemonName.innerHTML = pokemonData.name
        pokemonImage.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonId = pokemonData.id
    }else {
        pokemonImage.style.display = 'none'
        pokemonNumber.innerHTML = '**'
        pokemonName.innerHTML = 'Not found'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
    input.value = '';
})

btnPrevious.addEventListener('click', (event) => {
    if(pokemonId > 1) {
        pokemonId-=1
        renderPokemon(pokemonId)
    }
})

btnNext.addEventListener('click', (event) => {
    pokemonId+=1
    renderPokemon(pokemonId)

})

renderPokemon(pokemonId);