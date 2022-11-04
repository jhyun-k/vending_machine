class Vendingmachine {
    constructor(){
        const vMachine = document.querySelector('.vending-machine')
        this.balance = vMachine.querySelector('.txt-balance');
        this.itemList = vMachine.querySelector('.list-item');
        this.inputCostEl = vMachine.querySelector('.inp-put');
        this.btnPut = vMachine.querySelector('.btn-put');
        this.btnReturn = vMachine.querySelector('.btn-return');
        this.btnGet = vMachine.querySelector('.btn-get');
        this.stagedList = vMachine.querySelector('.list-item-staged');
        
        const myinfo = document.querySelector('.my-info');
        this.myMoney = myinfo.querySelector('.txt-mymoney');
        this.goList = myinfo.querySelector('.list-item-staged');
        this.txtTotal = myinfo.querySelector('.txt-total')
    }

    setup(){
        this.bindEvents();
    }

    //선택한 음료수 목록 생성
    stagedItemGenerator(target){
        const stagedItem = document.createElement('li');
        stagedItem.dataset.item = target.dataset.item;
    }

    

    bindEvents(){
        /* 1. 입금버튼 기능
        - 입금액을 입력하고 입금 버튼을 누르면 소지금 == 소지금 - 입금액, 잔액 == 기존잔액 + 입금액이 됩니다.
        - 입금액이 소지금보다 많다면 실행을 중단하고 '소지금이 부족합니다.' 라는 알림창 뜸
        - 입금액 인풋창은 초기화 합니다. */

        //function 키워드 쓴다면 this 는 event target, 화살표함수 썼을때는 자기보다 상위요소
        this.btnPut.addEventListener('click',(event)=>{
            const inputCost = parseInt(this.inputCostEl.value);
            const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',',''))
            const balanceVal = parseInt(this.balance.textContent.replaceAll(',',''))

            if(inputCost){//inputCost 에 값이 입력된 경우에만 실행되게!! 
                if(inputCost<=myMoneyVal && inputCost>0){//Intl.NumberFormat().format() 은 천단위에 , 찍어주기 위함 국제표준맞춰주는 메서드
                    this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal - inputCost) + ' 원'; 
                    this.balance.textContent = new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputCost) + ' 원';
                }else{
                    alert('소지금이 부족합니당')
                }
                this.inputCostEl.value = null;
            }
        })
        /*
        * 2. 거스름돈 반환 버튼 기능
        * 반환 버튼을 누르면 소지금 == 소지금 + 잔액이 됩니다.
        * 반환 버튼을 누르면 잔액 창은 초기화됩니다.
        */ 

        this.btnReturn.addEventListener('click',()=>{
            const balanceVal = parseInt(this.balance.textContent.replaceAll(',',''));
            const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(',',''));

            if(balanceVal){
                this.myMoney.textContent = new Intl.NumberFormat().format(balanceVal + myMoneyVal) + '원';
                this.balance.textContent = '원'
            }
        })

        /*
         * 3. 자판기 메뉴 기능
         * 아이템을 누르면 잔액 == 잔액 - 아이템 가격이 됩니다.
         * 아이템 가격보다 잔액이 적다면 "잔액이 부족합니다. 돈을 입금해주세요" 경고창이 나타납니다.
         * 아이템이 획득가능 창에 등록됩니다.
         * 아이템 버튼의 data-count 값이 -1 됩니다.
         * 만약 data-count 값이 0 이라면 부모 li에 sold-out 클래스를 붙여줍니다.
        */

        /* *
        이벤트를 부모요소에 이벤트를 걸어주면 자식요소한테 알아서 전파가 되지만 그건 접근성측면에서 안좋다(li에게 이벤트 주고싶으면 ul에만 이벤트 넣어줘도 다 적용되는것이 이벤트위임)
        이벤트 위임을 사용하게 되면 자식요소들에게 이벤트가 전파가 되는데 이렇게되면 접근성측면에서 안좋다
         * 그 이유는 스크린 리더가 이벤트를 읽을때 해당요소에 이벤트가 달려있어야 읽는데 이벤트위임을 하게되면
         * 실제로 그 요소에는 이벤트가 달려있지 않은것이므로 읽지를 않음. */

        const btnCola = this.itemList.querySelectorAll('button');

        btnCola.forEach((item)=>{
            item.addEventListener('click',(event)=>{
                /* target 과 currentTarget 차이
                target : 클릭하고있는 그녀석(image span 등)
                currentTarget : 이벤트가 발생하는 녀석! 여기서는 button 다 */
                const targetEl = event.currentTarget;
                const balanceVal = parseInt(this.balance.textContent.replaceAll(',',''));
                let isStaged = false; // 이미 선택되었는가?
                const targetElPrice = parseInt(targetEl.dataset.price);
                const stagedListItem = this.stagedList.querySelectorAll('li');
                
                // 입금한 금액
                if(balanceVal>=targetElPrice){
                    this.balance.textContent = new Intl.NumberFormat().format(balanceVal - targetElPrice) + '원';
                    if(!isStaged){// isStaged가 true라면
                        this.stagedItemGenerator(targetEl)
                    }
                }else{
                    alert('잔액이 부족해요')
                }
            })
        })


    }


}

export default Vendingmachine