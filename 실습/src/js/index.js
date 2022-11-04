import ColaGenerator from './components/colaGenerator.js';
import Vendingmachine from './components/vendingmachine.js';

const colaGenerator = new ColaGenerator();
const vendingmachine = new Vendingmachine();

//asnyc await

await colaGenerator.setup(); // await은  colaGenerator 가 다 실행될 때 까지 벤딩머신.setup 은 잠깐 기다려라 라는 뜻
vendingmachine.setup();

// const myMoney = document.querySelector('.txt-mymoney');
// const myMoneyVal = parseInt(myMoney.textContent.replaceAll(',',''));
// console.log(myMoneyVal)
