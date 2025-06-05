const url =
  'https://raw.githubusercontent.com/dan-collins-dev/dummy-data-fetching-repo/refs/heads/main/data/users.json';

document.addEventListener('DOMContentLoaded', async () => {
  const getBtn = document.getElementById('btnGet');
  const underBtn = document.getElementById('btnUnder');
  const resetBtn = document.getElementById('btnReset');

  getBtn.addEventListener('click', async event => {
    clearList();
    const data = await getItems(url);
    addUserCards(data);
  });

  underBtn.addEventListener('click', async event => {
    clearList();
    const data = await getItems(url);

    const filteredData = data.filter(filterUnderTen);
    addUserCards(filteredData);
  });

  resetBtn.addEventListener('click', event => clearList());
});

async function getItems(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

function addUserCards(data) {
  const cardList = document.getElementById('cards');
  const paras = [];
  for (let i = 0; i < data.length; i++) {
    const newLi = document.createElement('li');
    newLi.classList.add('card');

    const newPara = document.createElement('p');
    newPara.innerText = `${data[i].firstName} ${data[i].lastName}`;
    newLi.appendChild(newPara);

    const newPara2 = document.createElement('p');
    newPara2.innerText = `${data[i].email}`;
    newLi.appendChild(newPara2);

    const newPara3 = document.createElement('p');
    newPara3.innerText = `${data[i].companyName}`;
    newLi.appendChild(newPara3);

    const newPara4 = document.createElement('p');
    newPara4.innerText = `Years employed: ${data[i].yearsEmployed}`;
    newLi.appendChild(newPara4);

    cardList.appendChild(newLi);
  }
}

function clearList() {
  const ulList = document.getElementById('cards');
  ulList.innerHTML = '';
}

function filterUnderTen(obj) {
  if (obj.yearsEmployed < 10) {
    return true;
  } else {
    return false;
  }
}
