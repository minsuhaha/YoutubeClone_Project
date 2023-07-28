// 채널 페이지
function displayVideos(videoIds) {
    const container = document.getElementById('videoChannel');

    videoIds.forEach(videoId => {
        getChannelInfo(videoId, container);
    });
}
function getChannelInfo(video_channel, container) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();
    // Url은 get일때와 달리 ? 뒤는 생략
    let apiUrl = "http://oreumi.appspot.com/channel/getChannelInfo";

    // 요청할 데이터
    let jsondata = {
        "video_channel": video_channel
    }
    // 응답 처리 설정
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // 가져온 응답 처리
            let data = JSON.parse(xhr.responseText);
            // 데이터 있는지 확인
            if (data && data.channel_name !== undefined) {
                let videoDiv = document.createElement('div');
                // html 작성 부분
                videoDiv.innerHTML = `
                <p><img src="${data.channel_banner}"></p>
                <p>${data.subscribers}</p>
                <p><img src="${data.channel_profile}"></p>
            `;
                // console.log(data.video_link);
                container.appendChild(videoDiv);
                // 다음 video_id로 재귀 호출
                createVideoItem(video_id + 1);
            }
        }
    };

// post 방식으로 정보 불러오기
    xhr.open("POST", apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(jsondata));
}
let videoIds = [0];
// id = 0부터 아이템 불러오기
window.onload=function(){
    displayVideos(videoIds);
}