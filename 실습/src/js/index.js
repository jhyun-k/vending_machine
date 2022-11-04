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


/* 콜라리스트가 미처 받아지지 않았는데 클릭이벤트 먼저 실행되어서 클릭하면 아무 이벤트도 인식이 안되니까 await로 일단 리스트 다 받아와질때까지 기다리게하고 그 이후에 이벤트리스너를 붙여준거군요 */