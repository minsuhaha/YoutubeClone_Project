fetch('http://oreumi.appspot.com/video/getVideoList')
    .then(res => res.json()) // .json() 메서드는 JSON 응답을 JavaScript 객체 리터럴로 구문분석합니다.
    .then(data => console.log(data));

