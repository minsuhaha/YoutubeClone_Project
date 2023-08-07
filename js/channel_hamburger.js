let sidebarHidden = false; //처음엔 숨겨져 있는 상태가 아님
const allowedLinkNames = ["Home", "Explore", "Subscriptions", "Library", "History", "Your Videos", "watch Later"];
function toggleSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar> div > div');
    sidebarHidden = !sidebarHidden;//버튼 눌러서 숨김으로 반전
    const sidebar = document.querySelector('.sidebar');
    const channel = document.querySelector('.Channel');
    const sidebarsub = document.querySelector('.sidebarSub')
    
    if (sidebarHidden) {
        sidebar.classList.add('sidebarHidden');
        channel.classList.add('channelLonger');
        sidebarsub.classList.add('sidebarSub_del');
    } else {
        sidebar.classList.remove('sidebarHidden');
        channel.classList.remove('channelLonger');
        sidebarsub.classList.remove('sidebarSub_del');
    }


    sidebarLinks.forEach((link) => {
        const linkname = link.querySelector('a').textContent.trim();

        if (allowedLinkNames.includes(linkname)) { //무조건 보일 요소들 집합에 linkname이 있으면 block
            link.style.display = 'block';
        }
        else if (sidebarHidden) {// sidebar 상태가 숨겨져 있는걸로 설정 되어있으면 none
            link.style.display = 'none';
        }
        else {//sidebar 상태가 보이는 걸로 설정 되어있으면 block
            link.style.display = 'block';
        }
    });

}