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
        fetch(`https://oreumi.appspot.com/channel/getChannelInfo?video_channel=${video.video_channel}`, { method: 'POST' })
            .then((response) => response.json())
            .then((data) => {
                videoDiv.innerHTML = `
                <article class="Thumbnail_art">
                        <a href="index_video.html?video_id=${searchData}">
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
                                <h3 class="ThumbnailInfo">
                                    <a  class="Thumbnail_h3" href="index_video.html?video_id=${searchData}">
                                    ${video.video_title}
                                    </a>
                                </h3>
                                <a class="ThumbnailInfo" href="index_channel.html?channel_name=${encodeURIComponent(video.video_channel)}">
                                    ${video.video_channel}
                                </a>
                                <p class="ThumbnailInfo">${date} • ${convertViews(video.views)} views.</p>
                            </div>
                        </div>
                    </article>
                    `;
                videoContainer.appendChild(videoDiv);
            });
    }
    // URL에 검색어를 쿼리 스트링으로 추가
    let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + encodeURIComponent(text);
    window.history.pushState({ path: newURL }, '', newURL);


}

// click 시 검색
document.getElementsByClassName("search_box_icon")[0].addEventListener("click", () => {
    const value = document.getElementsByClassName("search_box")[0].value;
    window.location.href = `index.html?search=${value}`;
}); // 혹은 "click" 이벤트를 "input" 이벤트로 변경할 수 있습니다.

// enter 시 검색
document.getElementsByClassName("search_box")[0].addEventListener("keypress", function (e) {
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


function convertViews(views) {
    if (views >= 100000000) {
      let converted = (views / 1000000000).toFixed(1);
      return converted.endsWith(".0")
        ? converted.slice(0, -2) + "B"
        : converted + "B";
    } else if (views >= 1000000) {
      let converted = (views / 1000000).toFixed(1);
      return converted.endsWith(".0")
        ? converted.slice(0, -2) + "M"
        : converted + "M";
    } else if (views >= 1000) {
      let converted = (views / 1000).toFixed(1);
      return converted.endsWith("")
        ? converted.slice(0, -2) + "K"
        : converted + "K";
    } else {
      return views.toString();
    }
  }