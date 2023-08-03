function displayVideos(videoIds) {
    const container = document.getElementById('channel_mainVD');
    const container2 = document.getElementById('channel_subVD');

    videoIds.forEach(videoId => {
        createVideoItem(videoId, container);
        createVideoItem2(videoId, container2);
        
    });
}

function createVideoItem(video_id,container) {
    // XMLHttpRequest 객체 생성
    let xhr = new XMLHttpRequest();
    // API 요청 설정
    let apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`;
    

    // 응답 처리 설정
    xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        // 가져온 응답 처리
        let data = JSON.parse(xhr.responseText);
        // 데이터 있는지 확인
        if (data && data.video_id !== undefined) {
            let videoDiv = document.createElement('div');
            videoDiv.innerHTML = `
                <div><video class="channel_mvd" controls src='${data.video_link}'></video></div>
                <div class="channel_mdesc_box">
                <div class="channel_mvd_desc">${data.video_title}</div>
                <div class="channel_mvd_desc">${data.views} views. ${data.upload_date}</div>
                <div>${data.video_detail}</div>
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
    // id = 0부터 아이템 불러오기

        function createVideoItem2(video_id,container) {
            // XMLHttpRequest 객체 생성
            let xhr = new XMLHttpRequest();
            // API 요청 설정
            let apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${video_id}`;
            
        
            // 응답 처리 설정
            xhr.onreadystatechange = function(){
                if (xhr.readyState === xhr.DONE && xhr.status === 200) {
                // 가져온 응답 처리
                let data = JSON.parse(xhr.responseText);
                // 데이터 있는지 확인
                if (data && data.video_id !== undefined) {
                    let videoDiv2 = document.createElement('div');
                    videoDiv2.innerHTML = `
                        <video class="channel_svd" controls src="${data.video_link}">
                    `;
                    // console.log(data.video_link);
                    container.appendChild(videoDiv2);
                      // 다음 video_id로 재귀 호출
                    createVideoItem2(video_id + 1,container);
                        }
                    }
                    };
                    xhr.open('GET', apiUrl, true);
                    // 요청 전송
                    xhr.send();
                }

let videoIds = [0];
window.onload=function(){
    displayVideos(videoIds);
}

