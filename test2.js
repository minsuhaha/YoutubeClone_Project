fetch('http://oreumi.appspot.com/video/getVideoList')
    .then(res => res.json())
    .then(data => console.log(data));

