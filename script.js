const picture = document.querySelector('.img-box')
const all = document.querySelector('#all')
const search = document.querySelector('#search')
const submit = document.querySelector('#submit')
const searchInput = document.querySelector('#searchInput')
const name = document.querySelector('#name')
const category = document.querySelector('#category')
const instruction = document.querySelector('#instruction')
const img = document.querySelector('#img')
const ingredients = document.querySelector('#ingredients')
const result = document.querySelector('.result')
const searchWrapper=document.querySelector('.search-wrapper')


const handleDrink = () => {
    fetch('https://www.thecocktaildb.com/api/json/v2/1/popular.php')
        .then(res => res.json())
        .then(json => {
            console.log(json)
            json.drinks.forEach(drinks => {
                picture.innerHTML += `
                            <div class="col-4">
                <div class="card">
                    <img src="${drinks.strDrinkThumb}" class="card-img-top" alt=""/>
                    <div class="card-body">
                    <h2  class="card-title">${drinks.strDrink}</h2>
                    <p class="card-text">${drinks.strCategory}</p>
                    <p class="">${drinks.strAlcoholic}</p>
                    </div>
                </div>
            </div>
                `
            })
        })

}
handleDrink()

all.addEventListener('change', () => {
    if (all.checked) {
        picture.classList.remove('hidden')
        search.classList.add('hidden')
        searchWrapper.classList.add('hidden')
    }
})

search.addEventListener('change', () => {
    if (search.checked) {
        search.classList.remove('hidden')
        picture.classList.add('hidden')
        searchWrapper.classList.remove('hidden')
    }
})

const handleSearch = () => {
    let value = searchInput.value
    result.classList.remove('hidden')
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
        .then(res => res.json())
        .then(json => {
            console.log(value)
            const cocktail = json.drinks[0]
            ingredients.innerHTML=`
            <div class="col-4">
                <div>
                    <img src="https://www.thecocktaildb.com/images/ingredients/${cocktail.strIngredient1}-Medium.png" alt="">
                    <p>${cocktail.strIngredient1}</p>
                </div>
            </div>
            <div class="col-4">
                <div>
                    <img src="https://www.thecocktaildb.com/images/ingredients/${cocktail.strIngredient2}-Medium.png" alt="">
                    <p>${cocktail.strIngredient2}</p>
                </div>
            </div>
            <div class="col-4">
            <img src="https://www.thecocktaildb.com/images/ingredients/${cocktail.strIngredient3}-Medium.png" alt="">
            <p>${cocktail.strIngredient3}</p>
            </div>
           
            `
            json.drinks.forEach(drinks => {
                img.src = drinks.strDrinkThumb
                name.innerHTML =drinks.strDrink
                category.innerText = 'Category: ' + drinks.strCategory
                instruction.innerText = drinks.strInstructions
            })

        })
}

submit.addEventListener('click', () => {
    handleSearch()
})

searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSearch()
    }
})

