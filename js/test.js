// 네비게이션
// const showMenu = (headerToggle,navbarID) =>{
//   const toggleBtn = document.getElementById(headerToggle);

//   if (headerToggle && navbarID) {
//     toggleBtn.addEventListener('click',() => {
//       nav.classList.toggle('show-menu')
//       toggleBtn.classList.toggle('x-times')
//     })
//   }
// }
// showMenu('header-toggle', 'navbar')

// const linkcolor = document.querySelectorAll('.nav_link');

// function colorLink() {
//   linkcolor.forEach((1, => 1.classList.remove('active'))
//   this.classList.add('active')
// }
//

// function searchYoutube() {
//     const searchData = document.getElementById('search').value; // x에는 검색어 입력/input ID
//     const apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${searchData}`;
  
//     fetch(apiUrl)
//       .then(response => response.json())
//       .then(data => {
//         displaySearchResults(data);
//         saveSearchHistory(searchData);
//       })
//       .catch(error => console.error('API 요청 실패:', error));
//   }
  
//   function displaySearchResults(data) {
//     const searchResultsDiv = document.getElementById('searchResults'); // searchResult를 가져와서 저장
//     searchResultsDiv.innerHTML = ''; 
  
//   if (data.items.length === 0) {
//     searchResultsDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
//     return;
//   }else{~
//     let Info = '';
//                     Info += '<p><img src=' + data.image_link + '></p>'
//                     // Info += '<h2>' + data.Title + '</h2>';
//                     // Info += '<p><strong>장르:</strong>' + data.Genre + '</p>';
//                     // Info += '<p><strong>감독:</strong>' + data.Director + '</p>';
//                     // Info += '<p><strong>배우:</strong>' + data.Actors + '</p>';
//                     // movieInfo += '<p><strong>평점:</strong>' + rate[Value] + '</p>';
//                     document.getElementById('Info').innerHTML = Info
//   }

//   오르미 api 에서 해당값들을 입력받아 작동하게 만들어야 되는데 방법을 잘 모르겠어요

  // data.items.forEach(item => {
    // const videoId =
    // const videoTitle = 
    // const videoThumbnail = 
    // const videoLink = data.video_link

    function displayVideos(videoIds) {
        const container = document.getElementById('videoContainer');
    
        videoIds.forEach(videoId => {
            searchYoutube(videoId, container);
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
                            <article class="Thumbnail_art">
                                <img class="Thumbnail_img" src='${data.image_link}' alt='Video Thumbnail'>
                                <h3 class="Thumbnail_h3">제목: ${data.video_title}</h3>
                                <p>채널명: ${data.video_channel}</p>
                                <p>등록일: ${data.upload_date}, 조회수: ${data.views}회</p>
                            </article>
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
    
    let videoIds = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]; // 여기에 비디오 id 작성해주시면 됩니다!
    displayVideos(videoIds);