let showmoreHidden = false;

function showMore() {
        const hiddenPart = document.querySelector('.sidebar_hidden');
        showmoreHidden = !showmoreHidden;
        let arrowImg = document.getElementById('arrow-img');
        if (showmoreHidden) {
            hiddenPart.style.display = 'block';
            arrowImg.src = './Image/Sidebar/show_reverse.svg';
        } else {
            hiddenPart.style.display = 'none';
            arrowImg.src = './Image/Sidebar/show.svg';
        }
    }

document.getElementById('show-more').addEventListener('click', showMore);