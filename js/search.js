// 검색기능 구현
let videoAll = [];
let search_video = [];

fetch("http://oreumi.appspot.com/video/getVideoList")
    .then((response) => response.json())
    .then((data) => {
        videoAll = data;
        getVideo(videoAll);
    });

async function getVideo(videoList) {
    for (let i = 0; i < videoList.length; i++) {
        const data = await fetch(`http://oreumi.appspot.com/video/getVideoInfo?video_id=${videoList[i].video_id}`).then((response) => response.json());
        search_video[i] = data
    }
}

function search() {
    let text = document.getElementsByClassName("search_box")[0].value;
    let value = search_video.filter((video) => video.video_title.includes(text));
    let container = document.getElementById('videoContainer');

    // videoContainer의 기존 내용을 제거
    container.innerHTML = '';

    for (let video of value) {
        let videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
                            <article class="Thumbnail_art">
                            <a href="${video.video_link}"><img class="Thumbnail_img" src='${video.image_link}' alt='Video Thumbnail'></a>
                            <h3 class="Thumbnail_h3">${video.video_title}</h3>
                            <p>채널명: ${video.video_channel}</p>
                            <p>등록일: ${video.upload_date}, 조회수: ${video.views}회</p>
                            </article>
                            `;

        container.appendChild(videoDiv);
    }
}

document.getElementsByClassName("search_box_icon")[0].addEventListener("click", search); // 혹은 "click" 이벤트를 "input" 이벤트로 변경할 수 있습니다.
