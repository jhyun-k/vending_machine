class ColaGenerator {
    constructor(){// constructor는 class 통해서 인스턴스 만들 때 자동으로 실행되는 함수
        this.itemList = document.querySelector('.list-item')
    }      

    setup(){
        this.loadData((json)=>{
            this.colaFactory(json)
        })
    }

    async loadData(callback){
        /* const requestObject = new XMLHttpRequest(); //서버와 통신하기 위해 객체를 생성합니다.
        requestObject.open("GET",`src/js/item.json`) // 요청시작
        requestObject.onreadystatechange = () => {  // readyState 가 변화하면 트리거

            if(requestObject.readyState === 4 && requestObject.status === 200){ // readyState 가 4면 요청이 끝났다는 뜻(처리상태) , status 는 처리과정에서 문제 있는지없는지 알려줌 200은 문제없다는 뜻 
                callback(JSON.parse(requestObject.responseText))
            }  
        }
        requestObject.send(null) */

        //fetch

        const response = await fetch('src/js/item.json');

        if (response.ok){ // http상태코드가 200~299일경우 , 200(문제없음) 이니? 라고 물어보는 것이다
            callback(await response.json()) // 응답 본문을 읽으면서 객체 형태로 파싱합니다.
        }else{
            alert('통신에러'+response.status)
        }

    }
    colaFactory(data) {
        const docFrag = document.createDocumentFragment()
        data.forEach((el) => {
            const item = document.createElement('li');
            const itemTemplate = `
            <button type="button" class="btn-item" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
                <img src="src/images/${el.img}" alt="" class="img-item">
                <strong class="tit-item">${el.name}</strong>
                <span class="txt-price">${el.cost}원</span>
            </button>
            `;
            item.innerHTML = itemTemplate;
            docFrag.appendChild(item);
        });
        this.itemList.appendChild(docFrag)
    }
}


export default ColaGenerator;

/* XML 파일을 서버와 비동기적으로 주고받기위해 등장한게 Ajax인거고 그렇다고 XML만 오갈수 있는게 아니라 JSON같은 다른 파일 포멧도 가능한거고

XMLHttpRequest 생성자가 Ajax 통신을 할 때 필요한 인스턴스를 제공해주고 그 인스턴스를 활용해서 통신하는게 Ajax

fetch는 그 후 등장 */

