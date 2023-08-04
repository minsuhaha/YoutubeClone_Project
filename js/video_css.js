// 페이지가 로드되면 displayVideos 함수를 호출하여 비디오 표시
window.onload = function() {
    let urlParams = new URLSearchParams(window.location.search);
    let videoId = urlParams.get('video_id');
    let videoChannel = urlParams.get('video_channel');
    displayVideos([videoId,videoChannel]);
};

// 비디오 메인 함수 displayVideo  페이지에 동영상을 표시하는 기능
function displayVideos([videoId,videoChannel]) {
    const container = document.getElementById('videoContainer');

    // videoId를 배열 형태로 만들어서 해당 비디오만 크게 표시
    createVideoItem(videoId, container);
    
    // 전체 리스트 영상을 표시하기 위해 다른 videoIds를 사용 -> id 0 부터 시작하도록  
    const otherVideoIds = [0];
    // 해당 videoId를 제외한 영상들을 옆에 작은 크기로 표시
    const otherVideoIdsWithoutCurrent = otherVideoIds.filter(id => id !== videoId);

    const container2 = document.getElementById('videoDesc');
    const container3 = document.getElementById('videoSecond');
    
    createVideoItem2(videoId, container2);
    createVideoItem3(videoId, container2);

    otherVideoIdsWithoutCurrent.forEach(videoId => {
        
        createVideoItem4(videoId, container3);
    });
}


// 서버에서 비디오 정보를 가져오는 XMLHttpRequest를 만듬
function createVideoItem(video_id,container) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();
    // API 요청 설정
    let apiUrl = `https://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`;
    

    // 응답 처리 설정
    xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        // 가져온 응답 처리
        let data = JSON.parse(xhr.responseText);
        // 데이터 있는지 확인
        if (data && data.video_id !== undefined) {
            let videoDiv = document.createElement('div');
            videoDiv.innerHTML = `
            <video class="video" controls autoplay src='${data.video_link}'></video>
            <div class="info_box">
                <div class="info_title">${data.video_title}</div>
                <div class="info_bottom">
                    <span class="info_view">    
                        <span>${data.views}</span>
                        <span>views.</span>
                        <span style="margin-left:10px;">${data.upload_date}</span>
                    </span>
                    <span class="info_icon">
                        <button><img src="./Image/Channel/Vector.png"><span>1.7K</span></button>
                        <button><img src="./Image/Channel/Vector-1.png"><span>632</span></button>
                        <button><img src="./Image/Channel/Vector-2.png"><span>SHARE</span></button>
                        <button><img src="./Image/Channel/Vector-3.png"><span>SAVE</span></button>
                        <button><img src="./Image/Channel/Vector-4.png"></button>
                    </span>
                </div>
            </div>
        `;
            // console.log(data.video_link);
            container.appendChild(videoDiv);
              // 다음 video_id로 재귀 호출
            // createVideoItem(video_id + 1);
                }
            }
            };
            xhr.open('GET', apiUrl, true);
            // 요청 전송
            xhr.send();
        }
    
async function getVideoInfo(videoId) {
    let url = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${videoId}`;
    let response = await fetch(url);
    let videoData = await response.json();
    return videoData;
    }
          // "SHOW MORE" 버튼과 함께 비디오 채널 제목 ​​및 설명을 표시
async function createVideoItem2(video_id,container) {
    
        let videoData = await getVideoInfo(video_id)
        let videoDiv2 = document.createElement('div');
        videoDiv2.innerHTML = `
        <div class="channel_title">
                <button class="channel_btn"><img src="./Image/Sidebar/Marcus Levin.png" alt=""></button>
                <span class="channel_name">${videoData.video_channel}</span>
                <button class="subscribes_btn"><img src="./Image/Channel/Subscribes-Btn.png"></button>
        </div>
        `;
        // console.log(data.video_link);
        container.appendChild(videoDiv2);
            // 다음 video_id로 재귀 호출
    // createVideoItem(video_id + 1);
}

// "SHOW MORE" 버튼과 함께 비디오 채널 제목 ​​및 설명을 표시
function createVideoItem3(video_id,container) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();
    // API 요청 설정
    let apiUrl = `https://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`;
    

    // 응답 처리 설정
    xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        // 가져온 응답 처리
        let data = JSON.parse(xhr.responseText);
        // 데이터 있는지 확인
        if (data && data.video_id !== undefined) {
            let videoDiv3 = document.createElement('div');
            videoDiv3.innerHTML = `
            <div class="video_desc">
                        <span>${data.video_detail}</span>
                        <button class="showmore_btn">SHOW MORE</button>
            </div>      
            `;
            // console.log(data.video_link);
            container.appendChild(videoDiv3);
              // 다음 video_id로 재귀 호출
            // createVideoItem(video_id + 1);
                }
        }
        };
        xhr.open('GET', apiUrl, true);
        // 요청 전송
        xhr.send();
}
       
//     // 동영상 제목, 채널명, 조회수, 업로드 날짜가 포함된 작은 동영상 썸네일을 나타내는 div 요소를 생성하고 추가
function createVideoItem4(video_id,container) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();
    // API 요청 설정
    let apiUrl = `https://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`;
    

    // 응답 처리 설정
    xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        // 가져온 응답 처리
        let data = JSON.parse(xhr.responseText);
        // 데이터 있는지 확인
        if (data && data.video_id !== undefined) {
            let videoDiv4 = document.createElement('div');
            videoDiv4.innerHTML = `
            <div class="second_vd">
            <button type="button" class="second_vd_vdbox">
                <a href ="index_video.html?video_id=${data.video_id}">
                    <img class="second_vd_vd" src="${data.image_link}">
                </a>
            </button>
            <div class="second_vd_infobox">
                <div>${data.video_title}
                </div>
                <div>${data.video_channel}
                </div>
                <div>${data.views} views. ${data.upload_date}
                </div>
            </div>
        </div>
            `;
            // console.log(data.video_link);
            container.appendChild(videoDiv4);
                // 다음 video_id로 재귀 호출
            createVideoItem4(video_id + 1,container);
                }
            }
            };
            xhr.open('GET', apiUrl, true);
            // 요청 전송
            xhr.send();
        }

// 댓글 입력란에 연결된 "취소" 버튼을 클릭했을 때 호출되는 함수
function cancelComment() {
    const commentInput = document.getElementById('commentInput')
    commentInput.value = '';
}

// 구독 버튼
const subs_Btn = document.getElementById('subscribe-button');

subs_Btn.addEventListener('click', function(b) {
    if(subs_Btn.innerText === 'SUBSCRIBES'){
        subs_Btn.innerText = '1 SUBSCRIBED';
        b.target.style.backgroundColor = 'darkgray';
    } else {
        subs_Btn.innerText = 'SUBSCRIBES';
        b.target.style.backgroundColor = '#cc0000';
    }});


