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

const checkbox = document.querySelector('input')
const [formSection, menuSection,  tableSection] = document.querySelectorAll('section')
const [form] = document.forms
const [nameInput, timeInput, button] = form
const [feedback, errorMessage, errorMenu] = formSection.querySelectorAll('p')
const resetBtn = tableSection.querySelector('.reset-btn')
const table = tableSection.querySelector('table')
const [tbody] = table.tBodies
const spanOutCal = document.querySelector('.out-cal')
const lists = document.querySelectorAll('ul');

let caloriesToday = 0

renderMenu()

menuSection.onclick = handleChoice
button.onclick = addMeal
resetBtn.onclick = clearForm
checkbox.onchange = isChecked

function renderMenu() {
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

  let isValid = true

  for (const input of inputs) {
    if (!input.value) {
      isValid = false

      input.classList.add('invalid')
      errorMessage.hidden = false

      setTimeout(() => {
        input.classList.remove('invalid')
        errorMessage.hidden = true
        form.reset()
      }, 1000)
    }
  }
  if (dict.hasOwnProperty(form.foodName.value) && isValid) {
    createRecordObj()
  }

  else if (isValid && !(form.foodName.value in dict)) {
    form.foodName.classList.add('invalid')
    errorMenu.hidden = false

    setTimeout(() => {
      errorMenu.hidden = true
      form.foodName.classList.remove('invalid')
    }, 1000)
  }

}

// function renderMeal(record) {
//   const tableRow = document.createElement('tr')

//   tableRow.innerHTML = `
//       <td>${record.time}</td>
//       <td>${record.product}</td>
//       <td>${record.cal}</td>
//       <td><button>&times;</button></td>
//     `
//   tbody.append(tableRow)
// }

function renderMeal(record) {
  tbody.insertRow().innerHTML = `
    <td>${record.time}</td>
    <td>${record.product}</td>
    <td>${record.cal}</td>
    <td><button>&times;</button></td>
  `
}

function createRecordObj() {
  const record = {
    product: form.foodName.value,
    time: form.foodTime.value,
    cal: dict[form.foodName.value],
  }

  caloriesToday += record.cal
  spanOutCal.innerText = caloriesToday
  form.reset()
  feedback.hidden = false
  renderMeal(record)

  setTimeout(() => feedback.hidden = true, 1000)
}

function clearForm() {
  tbody.innerHTML = ''
  spanOutCal.innerText = '0'
  caloriesToday = 0
}

function isChecked() {

  if (checkbox.checked) {
    menuSection.style = 'display: none'
    tableSection.style = 'display: flex'
  }
  else {
    menuSection.style = 'display: block'
    tableSection.style = 'display: none'
  }

  // [sectionMenu.style, sectionTable.style] = checkbox.checked
  //   ? ['display: none', 'display: flex']
  //   : ['display: block', 'display: none']
}