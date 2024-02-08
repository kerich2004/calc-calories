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



let caloriesToday = 0

const dict = Object.assign({}, drinksDict, dishesDict, snacksDict)

renderMenu()

const form = document.querySelector('form')
const menu = document.querySelector('.section-menu')
const button = document.querySelector('button')
const resetBtn = document.querySelector('.reset-btn')
const records = []
const feedback = document.querySelector('.feedback')
const errorMessage = document.querySelector('.error')
const errorMenu = document.querySelector('.error-menu')
const table = document.querySelector('table')
const spanOutCal = document.querySelector('.out-cal')
const checkbox = document.querySelector('input[type = "checkbox"]')

menu.onclick = handleChoice
button.onclick = addMeal
resetBtn.onclick = clearForm
checkbox.addEventListener('change', isChecked)

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
  let inputAll = document.querySelectorAll('input')
  let isValid = true

  for (let i = 1; i < inputAll.length; i++) {
    if (!inputAll[i].value) {
      isValid = false

      inputAll[i].style = 'border: 2px solid red'
      errorMessage.hidden = false
      setTimeout(() => {
        inputAll[i].style = 'border: 2px solid black'
        errorMessage.hidden = true
        form.reset()
      }, 1000)
    }
  }
  if (dict.hasOwnProperty(form.foodName.value) && isValid) {
    createRecordObj(form)
  }

  else if (isValid && !dict.hasOwnProperty(form.foodName.value)) {
    form.foodName.style = "border: 2px  solid red"
    errorMenu.hidden = false
    setTimeout(() => {
      errorMenu.hidden = true
      form.foodName.style = "border: 2px  solid black"
    }, 1000)
  }

}

function renderMeal(records) {
  const tableRow = document.createElement('tr')
  const tbody = document.querySelector('tbody')

  records.forEach(element => {
    tableRow.innerHTML = `
    <td>${element.time}</td>
    <td>${element.product}</td>
    <td>${element.cal}</td>
    `
  })
  tbody.append(tableRow)
}

function createRecordObj(form) {
  let record = {
    product: form.foodName.value,
    time: form.foodTime.value,
    cal: dict[form.foodName.value]
  }

  records.push(record)
  caloriesToday += record.cal
  spanOutCal.innerText = caloriesToday
  form.reset()
  feedback.hidden = false
  setTimeout(() => feedback.hidden = true, 1000)
  renderMeal(records)
}

function clearForm() {
  document.querySelector('tbody').innerHTML = ''

  spanOutCal.innerText = '0'
}

function isChecked() {
  const sectionTable = document.querySelector('.section-table')
  const sectionMenu = document.querySelector('.section-menu')

  if (checkbox.checked) {
    sectionMenu.style = 'display: none'
    sectionTable.style = 'display: flex'
  }
  else {
    sectionMenu.style = 'display: block'
    sectionTable.style = 'display: none'
  }
}