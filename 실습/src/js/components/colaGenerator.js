class ColaGenerator {
    constructor(){// constructor는 class 통해서 인스턴스 만들 때 자동으로 실행되는 함수
        this.itemList = document.querySelector('.list-item')
    }      

    // setup함수가 실행되면 로드데이타 함수가 실행이됨
    // 쭊쭊 실행하다가 json파일을 가져오고 끝이나는데 끝이나면서 콜백함수를 실행시킨다.
    // 콜백함수는 인자로 제이슨을 로드데이타의 인자로 전달함
    // 콜백함수는 콜라팩토리를 실행시킴
    // 그 뒤 json이 콜라팩토리의 인자로 들어감.
    // setup함수를 따로만든 이유는 여러번 사용하였을 때의 메서드의 일관성을 위해서이다.
    async setup(){//index.js 에서 await 쓰기 위해 asnyc 문법으로 만든것
        await this.loadData((json)=>{
            this.colaFactory(json)
        })
    }
    /* loadData라는 함수를 실행해서 나온 결과물은 json데이터, colaFactory의 결과물은  json데이터를 받아서 li를 생성한것,  그 실행을  setup()함수로 하는건데 ()안에 있는 json이라고 이름붙인게 각각의 결과물들...!  */

    async loadData(callback){
        // 옛날방식 
        // 엑쎄멜 리퀘스트 함수가 실행되면 서버와 통신하기위해 객체가 생성되고 변수에 저장됨.

        /* 
        const requestObject = new XMLHttpRequest(); //서버와 통신하기 위해 객체를 생성합니다. 
        requestObject.open("GET",`src/js/item.json`) // 요청시작, 두번째 인자로 서버주소를 요청하여 서버를 오픈
        requestObject.onreadystatechange = () => {  // readyState 가 변화하면 트리거 요청이 시작되고 요청에 변화가 있을 때 콜백함수를 실행시킴

        // readyState 가 변화되면 트리거
        // stauts는 클라이언트에서 요청을주면 요청을 처리하는 과정에서 아무런 문제가 없음을 의미한다.
        // status는 처리하는 과정이 잘 되었습니까? => 200이면 문제없이 잘 되었습니다~
        // readyState는 처리되는 상태를 의미
        // readtState는 서버로부터 당신이 서버로부터 요청한 과정이 어떠한 과정에 있습니다~ 라는 말이다.
        // https://developer.mozilla.org/ko/docs/Web/HTTP/Status
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState


            if(requestObject.readyState === 4 && requestObject.status === 200){ // readyState 가 4면 요청이 끝났다는 뜻(처리상태) , status 는 처리과정에서 문제 있는지없는지 알려줌 200은 문제없다는 뜻 
                callback(JSON.parse(requestObject.responseText))
            }  
        }
        requestObject.send(null) 잘받았다~ 따로 더 보낼 데이터는 없으니 null이나 받아라ㅋ */

        //fetch 요즘방식
        // 데이터를 받아올때와 데이터를 사용할때 await을 사용합니다.    
        const response = await fetch('src/js/item.json');

        if (response.ok){ // http상태코드가 200~299일경우 , 200(문제없음) 이니? 라고 물어보는 것이다
            callback(await response.json()) // 응답 본문을 읽으면서 객체 형태로 파싱합니다.
        }else{
            alert('통신에러'+response.status)
        }

    }
    colaFactory(data) {
        const docFrag = document.createDocumentFragment()
        data.forEach((el) => {// colaFactory가 콜백함수가 될것임
            // 데이터를 순환하면서 데이터를 자바스크립트 객체로 바꿈 (json내 배열로 받았으므로 foreach문으로 돌릴 수 있음)
            // foreach 문이 계속 실행되면서 생성하고 붙이는 과정을 반복하므로 비효율적
            const item = document.createElement('li');
            const itemTemplate = `
            <button type="button" class="btn-item" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
                <img src="src/images/${el.img}" alt="" class="img-item">
                <strong class="tit-item">${el.name}</strong>
                <span class="txt-price">${el.cost}원</span>
            </button>`;
            item.innerHTML = itemTemplate;
            // this.itemList.appendChild(item);   // 만들어진 li를 ul에 붙임 -> 비효율적이므로 다음줄처럼 수정
            docFrag.appendChild(item);   // 콜라팩토리 함수 최적화
        });
        this.itemList.appendChild(docFrag);   // 콜라팩토리 함수 최적화
    }
}

/* 음 그러니까  document.creageDocumentFragment() 라는 코드를 이용해서 가상의 fragment 라는 공간을 만들어주는건데, 

그렇지 않으면 forEach문이 직접적으로 DOM을 도니까 코드가 무거워?지는데 Fragment 를 이용하면 forEach로 fragment에 append 할 요소를 차곡차곡 쌓아뒀다가 

forEach문 밖에서 한번에 실제 itemList에 docFrag덩어리를 모아서 append 해주는거다~ 그것은 메모리 최적화를 위해! */

export default ColaGenerator;

/* XML 파일을 서버와 비동기적으로 주고받기위해 등장한게 Ajax인거고 그렇다고 XML만 오갈수 있는게 아니라 JSON같은 다른 파일 포멧도 가능한거고

XMLHttpRequest 생성자가 Ajax 통신을 할 때 필요한 인스턴스를 제공해주고 그 인스턴스를 활용해서 통신하는게 Ajax

fetch는 그 후 등장 */

/* 
state 숫자 의미
1. UNSENT (숫자 0) : XMLHttpRequest 객체가 생성됨.

 2. OPENED (숫자 1) : open() 메소드가 성공적으로 실행됨.

 3. HEADERS_RECEIVED (숫자 2) : 모든 요청에 대한 응답이 도착함.

 4. LOADING (숫자 3) : 요청한 데이터를 처리 중임.

 5. DONE (숫자 4) : 요청한 데이터의 처리가 완료되어 응답할 준비가 완료됨. */



