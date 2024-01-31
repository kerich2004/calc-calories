const drinksDict = {
  cofee: 330,
  cola: 500,
  water: 100,
}

const dishesDict = {
  omelette: 200,
  'potatoes with cheese': 500,
  pasta: 350,
}

const snacksDict = {
  pizza: 700,
  roles: 500,
}

const dict = Object.assign({}, drinksDict, dishesDict, snacksDict)

renderMenu()

const form = document.querySelector('form')
const menu = document.querySelector('.section-menu')
const button = document.querySelector('button')
const records = []
const feedback = document.querySelector('.feedback')

menu.onclick = handleChoice
button.onclick = addMeal

function renderMenu() {
  const lists = document.querySelectorAll('ul');

  [drinksDict, dishesDict, snacksDict].forEach((dict, i) => {
    for (const product in dict) {
      lists[i].innerHTML += `<li>${product}</li>`
    }
  });
}

function handleChoice(event) {
  if (event.target.matches('li')) {
    form.foodName.value = event.target.textContent
  }
}

function addMeal(event) {
  event.preventDefault()

  let formData = new FormData(form)
  
  let record = {
    product: form.foodName.value,
    time: form.foodTime.value,
    cal: dict[form.foodName.value]
  }

  records.push(record)
  form.reset()
  feedback.hidden = false
  setTimeout(() => feedback.hidden = true, 1000)
} 

