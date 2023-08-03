let sidebarHidden = false;
    // const allowedLinkNames = ["Home", "Explore", "Subscriptions", "Library", "History", "Your Videos", "watch Later"];
    function toggleSidebar() {
        const sidebarLinks = document.querySelectorAll('.sidebar> div > div');
        sidebarHidden = !sidebarHidden;//버튼 눌러서 숨김으로 반전
        const sidebar = document.querySelector('.sidebar');
        if (sidebarHidden) {
        sidebar.classList.add('sidebarHidden_vd');
        } else {
        sidebar.classList.remove('sidebarHidden_vd');
    }

        sidebarLinks.forEach((link) => {
            const linkname = link.querySelector('.sidebar')

            // if (allowedLinkNames.includes(linkname)) { //무조건 보일 요소들 집합에 linkname이 있으면 block
            //     link.style.display = 'block';
            // }
            if (sidebarHidden) {// sidebar 상태가 숨겨져 있는걸로 설정 되어있으면 none
                link.style.display = 'none';
            }
            else {//sidebar 상태가 보이는 걸로 설정 되어있으면 block
                link.style.display = 'block';
            }
        });
}