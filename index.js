
const form = document.querySelector('form');
const table = document.querySelector('table');
function validateAge(age) {
  const today = new Date();
  const birthDate = new Date(age);
  const ageDiff = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  let ageValidation = false;

  if (ageDiff > 18 && ageDiff < 55) {
    ageValidation = true;
  } else if (ageDiff === 18) {
if (monthDiff > 0) {
    ageValidation = true;
} else if (monthDiff === 0 && today.getDate() >= birthDate.getDate()) {
      ageValidation = true;
    }
} else if (ageDiff === 55) {
    if (monthDiff < 0) {
    ageValidation = true;
    } else if (monthDiff === 0 && today.getDate() < birthDate.getDate()) {
      ageValidation = true;
    }
  }
  return ageValidation;
}
function clearForm() {
    form.reset();
  }
function addToTable(name, email, password, age, accepted) {
  const row = document.createElement('tr');

  const nameCell = document.createElement('td');
nameCell.textContent = name;
  row.appendChild(nameCell);

const emailCell = document.createElement('td');
  emailCell.textContent = email;
row.appendChild(emailCell);

const passwordCell = document.createElement('td');
  passwordCell.textContent = password;
row.appendChild(passwordCell);

  const ageCell = document.createElement('td');
  ageCell.textContent = age;
row.appendChild(ageCell);

  const acceptedCell = document.createElement('td');
  acceptedCell.textContent = accepted;
row.appendChild(acceptedCell);

  table.appendChild(row);
}



function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const password = document.getElementById('password').value.trim();
  const age = document.getElementById('age').value;
const accepted = document.getElementById('checkbox').checked;

  if (!validateAge(age)) {
    alert('Age should be between 18 and 55!');
    return;
  }

addToTable(name, email, password, age, accepted);

  localStorage.setItem('name', name);
localStorage.setItem('email', email);
  localStorage.setItem('password', password);
localStorage.setItem('age', age);
  localStorage.setItem('accepted', accepted);
  clearForm();
}

window.onload = function() {
  for (let i = 0; i < localStorage.length; i++) {
    const name = localStorage.getItem('name');
const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const age = localStorage.getItem('age');
const accepted = localStorage.getItem('accepted');
    
    if (name && email && password && age && accepted) {
      addToTable(name, email, password, age, accepted);
    }
  }
};

form.addEventListener('submit', handleSubmit);
