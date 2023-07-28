function displayVideos(videoIds) {
    const container = document.getElementById('videoContainer');

    videoIds.forEach(videoId => {
        createVideoItem(videoId, container);
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
            <video class="video" controls src='${data.video_link}'></video>
            <div class="info_box">
                <div class="info_title">${data.video_title}</div>
                <div class="info_bottom">
                    <span class="info_view">    
                        <span>${data.views}</span>
                        <span>views.</span>
                        <span style="margin-left:10px;">${data.upload_date}</span>
                    </span>
                    <span class="info_icon">
                        <button><img src="../Image/Channel/Vector.png"><span>1.7K</span></button>
                        <button><img src="../Image/Channel/Vector-1.png"><span>632</span></button>
                        <button><img src="../Image/Channel/Vector-2.png"><span>SHARE</span></button>
                        <button><img src="../Image/Channel/Vector-3.png"><span>SAVE</span></button>
                        <button><img src="../Image/Channel/Vector-4.png"></button>
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
    // id = 0부터 아이템 불러오기


function displayVideos2(videoIds) {
    const container2 = document.getElementById('videoDesc');

    videoIds.forEach(videoId => {
        createVideoItem2(videoId, container2);
    });
}

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
            <div class="channel_title">
                    <button class="channel_btn"><img src="../Image/Sidebar/Marcus Levin.png" alt=""></button>
                    <span class="channel_name">${data.video_channel}</span>
                    <button class="subscribes_btn"><img src="../Image/Channel/Subscribes-Btn.png"></button>
                </div>
                    <div class="video_desc">
                    <span>vidio_desssssssssssssssc</span>
                    <button class="showmore_btn">SHOW MORE</button>
                    </div>      
            `;
            // console.log(data.video_link);
            container.appendChild(videoDiv2);
              // 다음 video_id로 재귀 호출
            // createVideoItem(video_id + 1);
                }
            }
            };
            xhr.open('GET', apiUrl, true);
            // 요청 전송
            xhr.send();
        }

        function cancelComment() {
            const commentInput = document.getElementById('commentInput')
            commentInput.value = '';
        }

let videoIds = [0];
window.onload=function(){
    displayVideos(videoIds);
    displayVideos2(videoIds);
}
