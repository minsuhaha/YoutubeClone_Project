fetch('http://oreumi.appspot.com/video/getVideoList')
    .then(res => res.json())
    .then(data => console.log(data));



/* 3페이지 HTML에 추가 <button id="subscribe-button" style="background-color: red;">
Subscribe</button>*/

const subs_Btn = document.getElementById('subscribe-button');

subs_Btn.addEventListener('click', function(b) {
    if(subs_Btn.innerText === 'Subscribe'){
        subs_Btn.innerText = '1 Subscribed';
        b.target.style.backgroundColor = 'darkgray';
    } else {
        subs_Btn.innerText = 'Subscribe';
        b.target.style.backgroundColor = 'red';
    }});

/* 별다른 기능없이 클릭 시에 버튼색과 텍스트만 반복적으로 변경되게 했습니다. */
