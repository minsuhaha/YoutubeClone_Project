// 처음 화면 로드 시 전체 비디오 리스트 가져오기
getVideoList().then(createVideoItem);

// 현재 주소에서 비디오ID 가져오기
let currentURL = window.location.href;
let url = new URL(currentURL);
let videoid = url.searchParams.get("video_id"); //채널명
// videoId = "12";

// 비디오 리스트 정보
async function getVideoList() {
  let response = await fetch("https://oreumi.appspot.com/video/getVideoList");
  let videoListData = response.json();
  return videoListData;
}

// 각 비디오 정보
async function getVideoInfo(videoId) {
  const url = `https://oreumi.appspot.com/video/getVideoInfo?video_id=${videoId}`;
  let response = await fetch(url);
  let videoData = response.json();
  return videoData;
}

// 채널 정보
async function getChannelInfo(channelName) {
  let url = `https://oreumi.appspot.com/channel/getChannelInfo`;

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ video_channel: channelName }),
  });

  let channelData = await response.json();
  return channelData;
}

// 채널 내 영상정보
async function getChannelVideo() {
  let response = await fetch(
    `https://oreumi.appspot.com/video/getChannelVideo?video_channel=${channelName}`
  );
  let videoListData = await response.json();
  return videoListData;
}

// 피드 내용 로드
async function createVideoItem(videoList) {
  let videoContainer = document.getElementById("videoContainer");


  // 현재 비디오 정보 가져오기
  let currentVideoInfo = await getVideoInfo(videoid);
//   let tagList = currentVideoInfo.video_tag;
  let channelName = currentVideoInfo.video_channel;
  let targetTagList = currentVideoInfo.video_tag; //현재 비디오 태그
  let targetVideoId = currentVideoInfo.video_id;
  let date = formatDate(currentVideoInfo.upload_date);
  let tapName = document.querySelector('.tapName');
        tapName.innerHTML = `${currentVideoInfo.video_title} - YouTube`

  // 비디오 추가
  videoContainer.innerHTML = `
        <video class="video" controls autoplay src='${currentVideoInfo.video_link}'></video>
        <div class="info_box">
            <div class="info_title">${currentVideoInfo.video_title}</div>
            <div class="info_bottom">
                <span class="info_view">    
                    <span>${convertViews(currentVideoInfo.views)}</span>
                    <span>views.</span>
                    <span style="margin-left:10px;">${date}</span>
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

  // 추천 태그
//   let recoSortButtons = document.getElementById("second_topbox");

//   recoSortButtons.innerHTML += `<button class="selected">${currentVideoInfo.video_channel}</button>`;

//   for (let i = 0; i < tagList.length; i++) {
//     let tag = tagList[i];

//     recoSortButtons.innerHTML += `
//             <button>${tag}</button>
//             `;
//   }

  let currentChannelInfo = await getChannelInfo(channelName);
  // let currentChannelURL = `/index_channel.html?channelName=${channelName}`;
  let channelInfoBox = document.getElementById("channelInfo");
  channelInfoBox.innerHTML = `
    <div class="channel_title">
        <a href="index_channel.html?channel_name=${currentChannelInfo.channel_name}"><img src="${currentChannelInfo.channel_profile}" alt="Channel Avatar"></a>
        <div>
            <span class="channel_name">${currentChannelInfo.channel_name}</span>
            <span class="subscribers">${convertViews(currentChannelInfo.subscribers)} Subscribers </span>
        </div>
        <button id="subscribe-button">SUBSCRIBES</button>
    </div>
    `;

    let subs_Btn = document.querySelector('#subscribe-button');
    const subscription = document.querySelector('.subscribe');
    subscription.innerHTML =`
                <img src="${currentChannelInfo.channel_profile}">
                <a href="index_channel.html?channel_name=${currentChannelInfo.channel_name}">${currentChannelInfo.channel_name}</a>
            `;
    subscription.style.display = 'none';
    subs_Btn.addEventListener('click', function(b) {
    if(subs_Btn.innerText === 'SUBSCRIBES'){
        subs_Btn.innerText = 'SUBSCRIBED';
        b.target.style.backgroundColor = 'darkgray';
        subscription.style.display = 'block';
    } else {
        subs_Btn.innerText = 'SUBSCRIBES';
        b.target.style.backgroundColor = '#cc0000';
        subscription.style.display = 'none';
    }});
    

  let channelInfoDownSide = document.getElementById("videoDesc");
    channelInfoDownSide.innerHTML = `
    <div class="video_desc">
        <span>${currentVideoInfo.video_detail}</span>
        <button class="showmore_btn">SHOW MORE</button>
    </div>      
    `;

  // 각 비디오들 정보 가져오기
  let videoInfoPromises = videoList.map((video) =>
    getVideoInfo(video.video_id)
  );
  let videoInfoList = await Promise.all(videoInfoPromises);

  // 유사도 측정결과 가져오기
  async function getSimilarity(firstWord, secondWord) {
    const openApiURL = "http://aiopen.etri.re.kr:8000/WiseWWN/WordRel";
    const access_key = "c7f0233c-aa50-4b62-9d20-60731732014c";

    let requestJson = {
      argument: {
        first_word: firstWord,
        second_word: secondWord,
      },
    };

    let response = await fetch(openApiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_key,
      },
      body: JSON.stringify(requestJson),
    });
    let data = await response.json();
    return data.return_object["WWN WordRelInfo"].WordRelInfo.Distance;
  }

  async function calculateVideoSimilarities(videoList, targetTagList) {
    let filteredVideoList = [];

    for (let video of videoList) {
      let totalDistance = 0;
      let promises = [];

      for (let videoTag of video.video_tag) {
        for (let targetTag of targetTagList) {
          if (videoTag == targetTag) {
            promises.push(0);
          } else {
            promises.push(getSimilarity(videoTag, targetTag));
          }
        }
      }

      let distances = await Promise.all(promises);

      for (let distance of distances) {
        if (distance !== -1) {
          totalDistance += distance;
        }
      }

      if (totalDistance !== 0) {
        if (targetVideoId !== video.video_id) {
          filteredVideoList.push({ ...video, score: totalDistance });
        }
      }
    }

    filteredVideoList.sort((a, b) => a.score - b.score);

    filteredVideoList = filteredVideoList.map((video) => ({
      ...video,
      score: 0,
    }));
    console.log(filteredVideoList);
    return filteredVideoList;
  }

  let filteredVideoList = await calculateVideoSimilarities(
    videoInfoList,
    targetTagList
  );

  // 비디오리스트에 추가
  let videoListDiv = document.getElementById("videoSecond");
  let videoListItems = "";
    videoListItems += `
            <div class="second_topbox">
                <div class="second_topmenu">All</div>
                <div class="second_topmenu">토끼</div>
                <div class="second_topmenu">AI</div>
                <div class="second_topmenu">블록체인</div>
            </div>
            `;
  for (let i = 0; i < 5; i++) {
    let video = filteredVideoList[i];
    // let channelName = video.video_channel;
    let date = formatDate(video.upload_date);
    // let videoURL = `./index_video.html?id=${i}"`;
    // let channelURL = `./index_channel.html?channelName=${channelName}`;
    videoListItems += `
        <div class="second_vd">
        <button type="button" class="second_vd_vdbox">
            <a href ="index_video.html?video_id=${video.video_id}">
                <img class="second_vd_vd" src="${video.image_link}">
            </a>
        </button>
            <div class="second_vd_infobox">
                <div>
                  <a href ="index_video.html?video_id=${video.video_id}">
                  ${video.video_title}
                  </a>
                </div>
                <div>
                  <a href ="index_channel.html?channel_name=${video.video_channel}">
                  ${video.video_channel}
                  </a>
                </div>
                <div>
                  ${convertViews(video.views)} views  •  ${date}
                </div>
            </div>
        </div>
    `;
  }

  videoListDiv.innerHTML = videoListItems;
}

// 단위 변환 함수
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