const row=document.querySelector('.row')
const all=document.querySelector('#all')
const search = document.querySelector('#search')
const submit=document.querySelector('#submit')
const searchInput=document.querySelector('#searchInput')
const name=document.querySelector('#name')
const category=document.querySelector('#category')
const instruction=document.querySelector('#instruction')
const img=document.querySelector('#img')
const ingredients=document.querySelector('#ingredients')
const result=document.querySelector('.result')



const handleDrink = ()=> {
    fetch('https://www.thecocktaildb.com/api/json/v2/1/popular.php')
        .then(res => res.json())
        .then(json => {
            console.log(json)
            json.drinks.forEach(drinks => {
                row.innerHTML +=`
                            <div class="col-4">
                <div class="card">
                    <img src="${drinks.strDrinkThumb}" class="card-img-top" alt=""/>
                    <div class="card-body">
                    <h2 class="card-title">${drinks.strDrink}</h2>
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
        row.classList.remove('hidden')
        search.classList.add('hidden')
    }
})

search.addEventListener('change', () => {
    if (search.checked) {
        search.classList.remove('hidden')
        row.classList.add('hidden')
    }
})

const handleSearch=()=> {
    let value=searchInput.value
    result.classList.remove('hidden')
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`)
        .then(res => res.json())
        .then(json => {
            console.log(value)
            json.drinks.forEach(drinks => {
                img.src=drinks.strDrinkThumb
                name.innerHTML='Name: '+ drinks.strDrink
                category.innerText='Category: '+drinks.strCategory
                instruction.innerText='Instruction: '+drinks.strInstructions
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

