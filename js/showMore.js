document.getElementById('show-more').addEventListener('click', function (e) {
    e.preventDefault();
    let hiddenPart = document.querySelector('.sidebar_hidden');
    let arrowImg = document.getElementById('arrow-img');
    if (hiddenPart.style.display == 'none') {
        hiddenPart.style.display = 'block';
        arrowImg.src = '../Image/Sidebar/chevron-up-solid.svg';
        arrowImg.style.width = '15px';
        arrowImg.style.height = '30px';
        arrowImg.style.color = '#ffffff';
    } else {
        hiddenPart.style.display = 'none';
        arrowImg.src = '../Image/Sidebar/show.svg';
        arrowImg.style.width = '15px';
        arrowImg.style.height = '15px';
    }
});

