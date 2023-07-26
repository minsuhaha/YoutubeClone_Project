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
//   }else{
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

    function searchYoutube(){
      const searchData = document.getElementById('search').value; // x에는 검색어 입력/input ID
      const apiUrl = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${searchData}`;
      // let movieTitle = document.getElementById("movieTitle").value;
      // 무비타이틀이라는 id를 가져옴.값을 가져오고싶으면 .value를 붙히면됨.
      if (searchData == ''){
          alert('id 값을 입력해');
          return;
      }
      // xml로 웹 호스트 요청보내기
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if (xhr.readyState === XMLHttpRequest.DONE){
              if (xhr.status === 200){ // status 현재 상태 코드. 200 : 정상작동
                  // 데이터가 잘받아와졌을때 처리
                  let data = JSON.parse(xhr.responseText) // json 파일 불러오기. 요청받은 텍스트 가져오기.
                  if (data.Response === 'False'){
                      alert('정보를 가져오는데 실패했습니다.')
                  } else{
                      // rate = data.Ratings[0]
                      let Info = '';
                      Info += '<p><img src=' + data.image_link + '></p>'
                      Info += '<h2>' + data.video_title + '</h2>';
                      Info += '<p><strong>장르:</strong>' + data.upload_date + '</p>';
                      Info += '<p><strong>감독:</strong>' + data.video_channel + '</p>';
                      Info += '<p><strong>배우:</strong>' + data.video_link + '</p>';
                      document.getElementById('Info').innerHTML = Info
                  }
              } else {
                  alert('정보를 가져오는데 실패했습니다.');
              }
          }
      };
      xhr.open('GET',`http://oreumi.appspot.com/video/getVideoInfo?video_id=`+encodeURIComponent(searchData), true); 
      // api 키 뒤에 &t= : 타이틀 넣을위치
      xhr.send();
  }
  
  