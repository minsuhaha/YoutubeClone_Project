let sidebarVisible = false;

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebarVisible = !sidebarVisible;
    if (sidebarVisible) {
        sidebar.style.left = "0px";
    } else {
        sidebar.style.left = "-240px";
    }
}

document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
