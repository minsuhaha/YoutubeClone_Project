// // 검색기능 구현 (검색 시 메인페이지로 이동하여 검색)
// document.getElementsByClassName("search_box_icon")[0].addEventListener("click", search); 

// function search(event) {
//     event.preventDefault(); // form action을 막기 위해
    
//     let text = document.getElementsByClassName("search_box")[0].value;
    
//     // 메인 페이지 URL
//     let mainPageUrl = "index.html";
//     // 검색어를 쿼리 스트링으로 추가한 URL
//     let newURL = mainPageUrl + '?search=' + encodeURIComponent(text);
    
//     // 리다이렉트
//     window.location.href = newURL;
// }

// window.addEventListener('DOMContentLoaded', (event) => {
//     let urlParams = new URLSearchParams(window.location.search);
//     let searchKeyword = urlParams.get('search');

//     // 검색어가 있을 경우 검색 수행
//     if (searchKeyword) {
//         fetch("https://oreumi.appspot.com/video/getVideoList")
//         .then((response) => response.json())
//         .then((videoAll) => {
//             search_video = videoAll;
//             let search_video_with_info = [];

//             // 각 비디오에 대해 추가 정보를 가져오는 Promise를 배열에 저장
//             let promises = search_video.map(video => {
//                 return fetch(`https://oreumi.appspot.com/video/getVideoInfo?video_id=${video.video_id}`)
//                         .then(response => response.json())
//                         .then(videoInfo => {
//                             search_video_with_info.push({...video, ...videoInfo});
//                         });
//             });

//             // 모든 Promise가 완료될 때까지 기다림
//             Promise.all(promises).then(() => {
//                 // 대소문자 가리지 않도록 설정
//                 let value = search_video_with_info.filter((video) => video.video_title.toLowerCase().includes(searchKeyword.toLowerCase()));
//                 let container = document.getElementById('videoContainer');

//                 // videoContainer의 기존 내용을 제거
//                 container.innerHTML = '';

//                 for (let video of value) {
//                     let videoDiv = document.createElement('div');
//                     videoDiv.innerHTML = `
//                                     <article class="Thumbnail_art">
//                                         <a href="index_video.html?video_id=${video.video_id}">
//                                             <img class="Thumbnail_img" src='${video.image_link}' alt='Video Thumbnail'>
//                                         </a>
//                                         <h3 class="Thumbnail_h3">${video.video_title}</h3>
//                                         <p>채널명: <a href="/HTML/index_channel.html?channel_name=${encodeURIComponent(video.video_channel)}">${video.video_channel}</a></p>
//                                         <p>등록일: ${video.upload_date}, 조회수: ${video.views}회</p>
//                                     </article>
//                                         `;

//                     container.appendChild(videoDiv);
//                 }
//             });
//         });
//     }
// });
let videoAll = [];
let search_video = [];

fetch("https://oreumi.appspot.com/video/getVideoList")
    .then((response) => response.json())
    .then((data) => {
        videoAll = data;
        getVideo(videoAll);
    });

async function getVideo(videoList) {
    for (let i = 0; i < videoList.length; i++) {
        const data = await fetch(`https://oreumi.appspot.com/video/getVideoInfo?video_id=${videoList[i].video_id}`).then((response) => response.json());
        search_video[i] = data
    }
}

function search() {
    let text = document.getElementsByClassName("search_box")[0].value;
    let value = search_video.filter((video) => video.video_title.toLowerCase().includes(text.toLowerCase()));
    let container = document.getElementById('videoContainer');

    // videoContainer의 기존 내용을 제거
    container.innerHTML = '';

    for (let video of value) {
        let videoDiv = document.createElement('div');
        let date = formatDate(video.upload_date);
        fetch(`https://oreumi.appspot.com/channel/getChannelInfo?video_channel=${video.video_channel}`, {method: 'POST'})
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
                        <a href="index_channel.html?channel_name=${encodeURIComponent(video.video_channel)}">
                            <img 
                                class="Thumbnail_profile_img"
                                src="${data.channel_profile}"
                                alt="Channel Avatar"
                            >
                        </a>
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
    }
     // URL에 검색어를 쿼리 스트링으로 추가
     let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + encodeURIComponent(text);
     window.history.pushState({path: newURL}, '', newURL);


}

// click 시 검색
document.getElementsByClassName("search_box_icon")[0].addEventListener("click", () => {
    const value = document.getElementsByClassName("search_box")[0].value;
    window.location.href = `index.html?search=${value}`;
}); // 혹은 "click" 이벤트를 "input" 이벤트로 변경할 수 있습니다.

// enter 시 검색
document.getElementsByClassName("search_box")[0].addEventListener("keypress", function(e) {
    if (e.keyCode === 13) {
        const value = document.getElementsByClassName("search_box")[0].value;
        window.location.href = `index.html?search=${value}`;
    }
});


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