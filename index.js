const balance = document.querySelector(".balance");
const money_plus = document.querySelector("#money-plus");
const money_minus = document.querySelector("#money-minus");
const list = document.querySelector(".list");
const form = document.querySelector("form");
const text = document.querySelector(".text-input");
const amount = document.querySelector(".entry-amount");
const btn = document.querySelector(".btn")

// const dummyTransactions = [
//     {id:1, text:'Flower', amount: -20  
//     },
//     {id:2, text:'Salary', amount: 300,  
//     },{id:3, text:'Book', amount: -10,  
// },{id:4, text:'Camera', amount: 150,  
// }
// ];

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);

// let transactions = dummyTransactions;
let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
//Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);

        //uPDATE VALUES
        updateValues();

        updateLocalStorage();
        //cLEAR TRANASCTIONS
        text.value = '';
        amount.value = ''
    }
}

//Generate random ID

function generateID() {
    return Math.floor(Math.random() * 100000000);
}
//Add transactions to dom list
function addTransactionDOM(transaction) {
    //Get sign
    console.log("word")
    const sign = transaction.amount < 0 ? '-' : ' + ';
    const item = document.createElement('li');
    //Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}
    </span><button class = "delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;

    list.appendChild(item);
    console.log("word")
}


//Update the balance income and expense

function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    console.log(total);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    console.log(income);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) *
        -1).toFixed(2);

    console.log(expense)

    balance.innerText = `£${total}`;
    money_plus.innerText = `£${income}`;
    money_minus.innerText = `£${expense}`;

}

//remove transaction by id
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

//Create a function to update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
//init app

function init() {
    console.log("word")
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    console.log("word")
    updateValues()
}

init();

form.addEventListener('submit', addTransaction);