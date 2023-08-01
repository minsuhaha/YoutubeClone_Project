// 채널명에 따른 데이터를 받아오기
window.addEventListener('DOMContentLoaded', (event) => {
    let urlParams = new URLSearchParams(window.location.search);
    let channelName = urlParams.get('channel_name');

    // 웹 로컬스토리지에 있는 데이터 접근
    let channelData = JSON.parse(localStorage.getItem(channelName));
    
    const container = document.getElementById('videoContainer'); 
    channelData.forEach(video => {
        let videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
            <article class="Thumbnail_art">
                <a href="${video.video_link}">
                    <img class="Thumbnail_img" src='${video.image_link}' alt='Video Thumbnail'>
                </a>
                <h3 class="Thumbnail_h3">${video.video_title}</h3>
                <p>채널명: <a href="/HTML/index_channel.html?channel_name=${encodeURIComponent(video.video_channel)}">${video.video_channel}</a></p>
                <p>등록일: ${video.upload_date}, 조회수: ${video.views}회</p>
            </article>
            `;
        container.appendChild(videoDiv);
    });
});


    

// 채널 프로필 불러오기
// window.addEventListener('DOMContentLoaded', (event) => {
//     let urlParams = new URLSearchParams(window.location.search);
//     let channelName = urlParams.get('channel_name');
    
//     getChannelInfo(channelName, document.getElementById('videoChannel'));
// });





// // 채널 정보를 받아오는 함수
// function getChannelInfo(channel_name, container) {
//     let xhr = new XMLHttpRequest();
//     let apiUrl = "http://oreumi.appspot.com/channel/getChannelInfo";
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
//     let apiUrl = "http://oreumi.appspot.com/channel/getChannelInfo";  // Your actual API URL
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
//     let apiUrl = "http://oreumi.appspot.com/channel/getChannelInfo";

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


