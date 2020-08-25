//1 Declare variables
const button = document.querySelector(".btn")
const amount = document.querySelector(".amount")
const text_input = document.querySelector(".text-input")
const entry_amount = document.querySelector(".entry-amount")
const money_plus = document.querySelector("#money-plus")
const money_minus = document.querySelector("#money-minus")
const balance = document.querySelector("#balance")
const list = document.querySelector(".list")
const form =document.querySelector("form")





// function addTransaction(e){
//     console.log(transactions)
// }
// addTransaction()


//2 Hard code transactions
// const dummyTransactions = [
//     {id:1,entry: "Cashews", amount:45}, 
//     {id:2,entry: "Pawpaw", amount:5},
//     {id:3,entry: "Mango", amount:19}, 
//     {id:4,entry: "Beans", amount:-109}
// ];




//9 create local storage transaction variable
const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
  );
    
let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


//3)Declare dummy transactions
// const transactions = dummyTransactions

//7) Add transaction
function addTransaction(e){
    e.preventDefault();
    
    if(text_input.value.trim() === '' || entry_amount.value.trim() === '')
    {
        alert("Please add a valid entry and amount");
    }
    else{
        const transaction = {
            id : generateID(),
            entry : text_input.value,
            amount: +entry_amount.value
        };
        //Push the new transaction into the existing transactions array
        transactions.push(transaction)
        //Run add transactiondom
        addTransactionToDom(transaction);

        //Update the value
        updateBalance();
        updateLocalStorage();

        text_input.value = '';
        entry_amount.value = '';
        
    }
}

//6)Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
  }
  

//4)Add transactions to dom list
function addTransactionToDom(transaction){
    //Get the sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const li = document.createElement("li")
    //Add class based on value
    li.classList.add(transaction.amount < 0 ? "minus" : "plus");

    li.innerHTML = ` ${transaction.entry}
    <span> ${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${
        transaction.id
      })">x</button>`;
    list.appendChild(li)
            
        };











//5) Update the balance income and expense
function updateBalance(){
    const amounts = transactions
        .map(transaction => transaction.amount)
    const total = amounts.reduce((accumulator, item) => (accumulator += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((accumulator, item) => (accumulator += item), 0)
        .toFixed(2);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((accumulator, item) => (accumulator += item), 0) * -1).toFixed(2);
    
    money_plus.innerText= `£${income}`
    money_minus.innerText = `£${expense}`
    balance.innerText = `£${total}`

}

//Update values

//8)remove transaction by id
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();

}

//10)Create a function to update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

//11)init app

function init() {
    list.innerHTML = '';
  
    transactions.forEach(addTransactionToDom);
   updateBalance()
  }
  



// 12)Run app
init();

//13)Add event listener
form.addEventListener("submit", addTransaction)