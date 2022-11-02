const leftSide = document.querySelector('.left_side');
const rightSide = document.querySelector('.right_side');

const redItem = leftSide.getElementsByClassName('menu_item')[0]
const violetItem = leftSide.getElementsByClassName('menu_item')[1]
const yellowItem = leftSide.getElementsByClassName('menu_item')[2]
const coolItem = leftSide.getElementsByClassName('menu_item')[3]
const grennItem = leftSide.getElementsByClassName('menu_item')[4]
const orangeItem = leftSide.getElementsByClassName('menu_item')[5]

const selectList = leftSide.querySelector('.select_list');

const selectItem = document.createElement('li');
const selectImg = document.createElement('img');
const selectName = document.createElement('p');
const selectCount = document.createElement('p');

let balance = leftSide.querySelector('.change_txt input')
balance.value = 1000

let deposit = leftSide.querySelector('.deposit_input')
const depositBtn = leftSide.querySelector('.deposit_btn')

const changeBtn = leftSide.querySelector('.change_btn')

let money = rightSide.querySelector('.money_violet input')
money.value = 25000

depositBtn.addEventListener('click',()=>{
    if(Number(money.value)>Number(deposit.value)){
        money.value -= deposit.value;
        balance.value = Number(balance.value) + Number(deposit.value);
        deposit.value=''
    }else{
        alert('소지금이 부족해용')
    }
})

changeBtn.addEventListener('click',()=>{
    money.value = Number(money.value)+ Number(balance.value)
    balance.value = 0
})

let redStock = 3;
let violetStock = 0;
let yellowStock = 3;
let coolStock = 3;
let greenStock = 3;
let orangelStock = 3;


redItem.addEventListener('click',()=>{
    redStock--
    if(redStock<=0){
        redItem.classList.add('soldOut');
        selectCount.innerHTML = 3
    }
    if(redStock==2){
        selectList.append(selectItem);
        selectItem.classList.add('select_item')
        selectItem.append(selectImg,selectName,selectCount);
        selectImg.src=`./img/Original_Cola.png`
        selectName.innerHTML = 'Original Cola'
        selectCount.innerHTML = 3 - redStock;
        selectCount.classList.add('count');
        balance.value -= 1000
    }else if(redStock < 2 && redStock >=0){
        selectCount.innerHTML = 3 - redStock;
        selectCount.classList.add('count');
        balance.value -= 1000
    }
    if(balance.value<=0){
        redStock++
        alert('잔액이 부족합니다ㅠ');
        balance.value=0;
    }
})

yellowItem.addEventListener('click',()=>{
    yellowStock--
    if(yellowStock<=0){
        yellowItem.classList.add('soldOut');
        selectCount.innerHTML = 3
    }
    if(yellowStock==2){
        selectList.insertBefore(selectItem,redItem);
        selectItem.classList.add('select_item')
        selectItem.append(selectImg,selectName,selectCount);
        selectImg.src=`./img/Yellow_Cola.png`
        selectName.innerHTML = 'Yellow Cola'
        selectCount.innerHTML = 3 - yellowStock;
        selectCount.classList.add('count');
        balance.value -= 1000
    }else if(yellowStock < 2 && yellowStock >=0){
        selectCount.innerHTML = 3 - yellowStock;
        selectCount.classList.add('count');
        balance.value -= 1000
    }
    if(balance.value<=0){
        yellowStock++
        alert('잔액이 부족합니다ㅠ');
        balance.value=0;
    }
})