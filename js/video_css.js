
    function displayVideos(videoIds) {
        const container = document.getElementById('videoContainer');
        const container_desc = document.getElementById('videoDesc');

        videoIds.forEach(videoId => {
            searchYoutube(videoId, container);
            searchYoutube_Second(videoId, container_desc);
        });
    }


    function searchYoutube(searchData, container){
        const apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${searchData}`;

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE){
                if (xhr.status === 200){ 
                    let data = JSON.parse(xhr.responseText)
                    if (data.Response === 'False'){
                        alert('정보를 가져오는데 실패했습니다.')
                    } else{
                        // let videoDiv = '';
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
                        container.appendChild(videoDiv);
                        
                        // document.getElementById('InfoTitle').innerHTML = videoDiv
                    }
                } else {
                    alert('정보를 가져오는데 실패했습니다.');
                }
            }
        };
        xhr.open('GET', apiUrl, true); 
        xhr.send();
    }

    function searchYoutube_Second(searchData, container){
        const apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${searchData}`;
        const apiUrl2 = `http://oreumi.appspot.com/channel/getChannelInfo?video_channel=${searchData}`;

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === XMLHttpRequest.DONE){
                if (xhr.status === 200){ 
                    let data = JSON.parse(xhr.responseText)
                    if (data.Response === 'False'){
                        alert('정보를 가져오는데 실패했습니다.')
                    } else{
                        // let videoDiv = '';
                        let videoDiv2 = document.createElement('div');
                        videoDiv2.innerHTML = `
                        <div class="channel_title">
                            <button><img src="../Image/Sidebar/Marcus Levin.png" alt=""></button>
                            <span>${data.video_channel}</span>
                            
                            <button><img src="../Image/Channel/Subscribes-Btn.png"></button>
                        </div>
                            <div>
                                Video-desc
                            </div>
                                <button>SHOW MORE</button>
                        `;
                        container.appendChild(videoDiv2);
                        
                        // document.getElementById('InfoTitle').innerHTML = videoDiv
                    }
                } else {
                    alert('정보를 가져오는데 실패했습니다.');
                }
            }
        };
        xhr.open('GET', apiUrl, true); 
        xhr.send();
    }

    let videoIds = [2]; // 여기에 비디오 id 작성해주시면 됩니다!
    displayVideos(videoIds);
