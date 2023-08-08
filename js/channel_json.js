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

    const tapName = document.querySelector('.tapName');
    tapName.innerHTML = `${channelInfo.channel_name} - YouTube`
    const channelTitle = document.querySelector('.Channel-Title');

    channelTitle.innerHTML = `
        <div class="channel-content">
            <div class = "channel-frame">
            <div class="Channel-Profile">
                <a href="#"><img src="${channelInfo.channel_profile}" alt="Channel Avatar"></a>
            </div>
            <div class="Channel-Profile-Name">
                <span>${channelInfo.channel_name}</span>
                <span>${convertViews(channelInfo.subscribers)} subscribers</span>
            </div>
            </div>
            <button id="subscribe-button">SUBSCRIBE</button>
        </div>
    `;
   
    let subs_Btn = document.querySelector('#subscribe-button');
    const subscription = document.querySelector('.subscribe');
    subscription.innerHTML =`
                <img src="${channelInfo.channel_profile}">
                <a href="index_channel.html?channel_name=${channelInfo.channel_name}">${channelInfo.channel_name}</a>
            `;
    subscription.style.display = 'none';
    subs_Btn.addEventListener('click', function(b) {
    if(subs_Btn.innerText === 'SUBSCRIBE'){
        subs_Btn.innerText = 'SUBSCRIBED';
        b.target.style.backgroundColor = 'darkgray';
        subscription.style.display = 'block';
    } else {
        subs_Btn.innerText = 'SUBSCRIBE';
        b.target.style.backgroundColor = '#cc0000';
        subscription.style.display = 'none';
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
            <p>${convertViews(representativeVideo.views)} views . ${representativeVideo.upload_date}</p>
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
        fetch(`https://oreumi.appspot.com/channel/getChannelInfo?video_channel=${videoName}`, {method: 'POST'})
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
                                    src="${channelInfo.channel_profile}"
                                    alt="Channel Avatar"
                                >
                            </a>
                            <div>
                                <h3 class="ThumbnailInfo">
                                    <a  class="Thumbnail_h3" href="index_video.html?video_id=${video.video_id}">
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
  };

let subsAdd = false;

function subscribe() {
        const subsName = document.querySelector('.subTitle>div');
        subsAdd = !subsAdd;
        if (subsAdd) {
            subsName.innerHTML =`
            <div class="sidebar_btn">
                <img src="${channelInfo.channel_profile}">
                <a href="#">${channelInfo.channel_name}</a>
            </div>
            `;
        } else {
            subsName.style.display = 'none';
        }
    }

document.getElementById('subscribe-button').addEventListener('click', subscribe);