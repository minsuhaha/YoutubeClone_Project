fetch('http://oreumi.appspot.com/video/getVideoList')
    .then(res => res.json())
    .then(data => console.log(data));



/* 3페이지 HTML에 추가 <button id="subscribe-button" style="background-color: #cc0000; 
color: white;">SUBSCRIBES</button>*/



const subs_Btn = document.getElementById('subscribe-button');

subs_Btn.addEventListener('click', function(b) {
    if(subs_Btn.innerText === 'SUBSCRIBES'){
        subs_Btn.innerText = '1 SUBSCRIBED';
        b.target.style.backgroundColor = 'darkgray';
    } else {
        subs_Btn.innerText = 'SUBSCRIBES';
        b.target.style.backgroundColor = '#cc0000';
    }});

/* 별다른 기능없이 클릭 시에 버튼색과 텍스트만 반복적으로 변경되게 했습니다. */
