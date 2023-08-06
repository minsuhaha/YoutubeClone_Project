let sidebarVisible = false;

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebarVisible = !sidebarVisible;
    const thmbox = document.querySelector('.primary');
    if (sidebarVisible) {
        sidebar.style.left = "0px";
        thmbox.classList.add('thumbnailWider');
    } else {
        sidebar.style.left = "-240px";
        thmbox.classList.remove('thumbnailWider');
    }
}

document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
