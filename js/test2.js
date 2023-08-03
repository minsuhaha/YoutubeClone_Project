fetch('http://oreumi.appspot.com/video/getVideoList')
    .then(res => res.json())
    .then(data => console.log(data));



/* 구독 버튼입니다. 2,3페이지에 사용되며 피그마에 나와있는 크기와 색상대로 하였고 구독 시에 변경되는 버튼의 색은 따로 나와있지 않아서 임의로 회색으로 했습니다.
HTML 및 CSS에 추가하면 될 거 같습니다.*/

 /*HTML에 
 <button id="subscribe-button">SUBSCRIBES</button> 추가*/
 
 /*CSS에  
 #subscribe-button {
    background-color: #cc0000; 
    color: #fff;
    display: flex; 
    padding: 10px 16px; 
    align-items: flex-start; 
    gap: 10px; 
    font-size: 14px; 
    font-weight: 700;
 } 추가*/
 


subs_Btn.addEventListener('click', function(b) {
    if(subs_Btn.innerText === 'SUBSCRIBES'){
        subs_Btn.innerText = '1 SUBSCRIBED';
        b.target.style.backgroundColor = 'darkgray';
    } else {
        subs_Btn.innerText = 'SUBSCRIBES';
        b.target.style.backgroundColor = '#cc0000';
    }});
