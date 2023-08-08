let sidebarVisible = false;

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sideContent = document.querySelector('.video_second')

    sidebarVisible = !sidebarVisible;
    const thmbox = document.querySelector('.primary');
    if (sidebarVisible) {
        sidebar.style.left = "0px";
        thmbox.classList.add('thumbnailWider');
        sideContent.classList.add('sideContentDarker');
    } else {
        sidebar.style.left = "-240px";
        thmbox.classList.remove('thumbnailWider');
        sideContent.classList.remove('sideContentDarker');
    }
}

document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
