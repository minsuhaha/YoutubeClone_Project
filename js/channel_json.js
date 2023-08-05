// 채널 페이지 -> 채널명에 따른 채널정보 및 영상데이터 가져오기
window.addEventListener('DOMContentLoaded', async (event) => {
    let urlParams = new URLSearchParams(window.location.search);
    let channelName = urlParams.get('channel_name');

    // 웹 로컬스토리지에 있는 데이터 접근
    let channelData = JSON.parse(localStorage.getItem(channelName));

    // 채널 정보 가져오기
    let channelInfo = await getChannelInfo(channelName);
    
    // 화면에 채널 정보 표시
    const channelCover = document.querySelector('.Channel-Cover');
    channelCover.innerHTML = `<img src="${channelInfo.channel_banner}" class="cover-image" alt="Channel Banner">`;

    const channelTitle = document.querySelector('.Channel-Title');

    channelTitle.innerHTML = `
        <div class="channel-content">
            <div class = "channel-frame">
            <div class="Channel-Profile">
                <a href="#"><img src="${channelInfo.channel_profile}" alt="Channel Avatar"></a>
            </div>
            <div class="Channel-Profile-Name">
                <span>${channelInfo.channel_name}</span>
                <span>${channelInfo.subscribers} subscribers</span>
            </div>
            </div>
            <button id="subscribe-button">SUBSCRIBES</button>
        </div>
    `;

    let subs_Btn = document.querySelector('#subscribe-button')

    subs_Btn.addEventListener('click', function(b) {
    if(subs_Btn.innerText === 'SUBSCRIBES'){
        subs_Btn.innerText = 'SUBSCRIBED';
        b.target.style.backgroundColor = 'darkgray';
    } else {
        subs_Btn.innerText = 'SUBSCRIBES';
        b.target.style.backgroundColor = '#cc0000';
    }});
    
    // 대표 영상 및 설명 찾기
    let representativeVideo = findRepresentativeVideo(channelData);

    // 화면에 대표 영상 및 설명 표시
    const channelBigVideoBox = document.querySelector('.Channel-Big-Video');
    let bigVideoItem = `
        <div class="channel__big__video">
            <video controls autoplay src='${representativeVideo.video_link}' width='480' height='270'></video>
        </div>
        <div class="big__video__info">
            <h5>${representativeVideo.video_title}</h5>
            <p>${representativeVideo.views} views . ${representativeVideo.upload_date}</p>
            <p>${representativeVideo.video_detail}</p>
        </div>
    `;
    channelBigVideoBox.innerHTML = bigVideoItem;


    // 화면에 비디오 리스트 표시
    const videoContainer = document.getElementById('videoContainer');
    channelData.forEach( video => {
        const videoName = video.video_channel;
        let videoDiv = document.createElement('div');
        let date = formatDate(video.upload_date);
        fetch(`http://oreumi.appspot.com/channel/getChannelInfo?video_channel=${videoName}`, {method: 'POST'})
            .then((response) => response.json())
            .then((data) => {
                videoDiv.innerHTML = `
                    <article class="Thumbnail_art">
                        <a href="index_video.html?video_id=${video.video_id}">
                            <img
                                class="Thumbnail_img"
                                src='${video.image_link}'
                                alt='Video Thumbnail'
                            >
                        </a>
                        <div>
                            <img
                                class="Thumbnail_profile_img"
                                src="${data.channel_profile}"
                                alt="Channel Avatar"
                            >
                            <div>
                                <h3 class="Thumbnail_h3">${video.video_title}</h3>
                                <a href="index_channel.html?channel_name=${encodeURIComponent(video.video_channel)}">
                                    ${video.video_channel}
                                </a>
                                <p>${date} • ${video.views} views.</p>
                            </div>
                        </div>
                    </article>
                    `;
                    videoContainer.appendChild(videoDiv);
                });
        });
});

// 채널 정보
async function getChannelInfo(channelName) {
    let url = `https://oreumi.appspot.com/channel/getChannelInfo`;

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_channel: channelName }),
    });

    let channelData = await response.json();
    return channelData;
}

// 대표 영상 찾기
function findRepresentativeVideo(channelData) {
    let maxViews = 0;
    let representativeVideo = null;

    channelData.forEach(video => {
        if (video.views > maxViews) {
            maxViews = video.views;
            representativeVideo = video;
        }
    });

    return representativeVideo;
}

function formatDate(dateString) {
    const uploadDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - uploadDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    let formattedDate;

    if (diffDays < 7) {
        formattedDate = `${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        formattedDate = `${weeks} weeks ago`;
    } else {
        const months = Math.floor(diffDays / 30);
        formattedDate = `${months} months ago`;
    }

    return formattedDate;
}



// 채널 프로필 불러오기
// window.addEventListener('DOMContentLoaded', (event) => {
//     let urlParams = new URLSearchParams(window.location.search);
//     let channelName = urlParams.get('channel_name');
    
//     getChannelInfo(channelName, document.getElementById('videoChannel'));
// });





// // 채널 정보를 받아오는 함수
// function getChannelInfo(channel_name, container) {
//     let xhr = new XMLRequest();
//     let apiUrl = "https://oreumi.appspot.com/channel/getChannelInfo";
//     let jsondata = { "channel_name": channel_name };

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === xhr.DONE && xhr.status === 200) {
//             let data = JSON.parse(xhr.responseText);
//             if (data && data.channel_name !== undefined) {
//                 let videoDiv = document.createElement('div');
//                 videoDiv.innerHTML = `
//                     <p><img src="${data.channel_banner}" alt="Channel banner"></p>
//                     <p>${data.channel_name}</p>
//                     <p>${data.subscribers}</p>
//                     <p><img src="${data.channel_profile}" alt="Channel profile"></p>
//                 `;

//                 container.appendChild(videoDiv);
//             }
//         }
//     };

//     xhr.open("POST", apiUrl, true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(JSON.stringify(jsondata));
// }

// // 채널 프로필 불러오기
// window.addEventListener('DOMContentLoaded', (event) => {
//     let urlParams = new URLSearchParams(window.location.search);
//     let channelName = urlParams.get('channel_name');
    
//     getChannelInfo(channelName, document.getElementById('videoChannel'));

//     // Get videos for this channel
//     let apiUrl = "https://oreumi.appspot.com/channel/getChannelInfo";  // Your actual API URL
//     let jsondata = { "channel_name": channelName };
    
//     let xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === xhr.DONE && xhr.status === 200) {
//             let data = JSON.parse(xhr.responseText);
//             if (data && data.channel_name !== undefined) {
//                 displayVideos(data.channel_name);
//             }
//         }
//     };

//     xhr.open("POST", apiUrl, true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(JSON.stringify(jsondata));
// });



// 이전 코드 

// 채널 프로필
// function displayVideos(videoIds) {
//     const container = document.getElementById('videoChannel');

//     videoIds.forEach(videoId => {
//         getChannelInfo(videoId, container);
//     });
// }
// function getChannelInfo(video_channel, container) {
//     // XMLHttpRequest 객체 생성
//     let xhr = new XMLHttpRequest();
//     // Url은 get일때와 달리 ? 뒤는 생략
//     let apiUrl = "https://oreumi.appspot.com/channel/getChannelInfo";

//     // 요청할 데이터
//     let jsondata = {
//         "video_channel": video_channel
//     }
//     // 응답 처리 설정
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === xhr.DONE && xhr.status === 200) {
//             // 가져온 응답 처리
//             let data = JSON.parse(xhr.responseText);
//             // 데이터 있는지 확인
//             if (data && data.channel_name !== undefined) {
//                 let videoDiv = document.createElement('div');
//                 // html 작성 부분
//                 videoDiv.innerHTML = `
//                 <p><img src="${data.channel_banner}"></p>
//                 <p>${data.channel_name}</p>
//                 <p>${data.subscribers}</p>
//                 <p><img src="${data.channel_profile}"></p>
//             `; 
//                 // console.log(data.video_link);
//                 container.appendChild(videoDiv);
//                 // 다음 video_id로 재귀 호출
//                 // createVideoItem(video_id + 1);
//             }
//         }
//     };

// // post 방식으로 정보 불러오기
//     xhr.open("POST", apiUrl, true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(JSON.stringify(jsondata));
// }

// // id = 0부터 아이템 불러오기
// window.onload = function(){
//     let videoIds = ['oreumi'];
//     displayVideos(videoIds);
// };