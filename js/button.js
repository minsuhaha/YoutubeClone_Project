

// 각 버튼 요소 가져오기
const createButton = document.getElementById('create_btn');
const alarmButton = document.getElementById('alarm_btn');
const profileButton = document.getElementById('profile_btn');
const appsButton = document.getElementById('apps')
// 각 버튼에 클릭 이벤트 리스너 추가
createButton.addEventListener('click', function () {
    toggleHiddenMenu(createButton);
    hideOtherMenus(createButton);
});

alarmButton.addEventListener('click', function () {
    toggleHiddenMenu(alarmButton);
    hideOtherMenus(alarmButton);
});

profileButton.addEventListener('click', function () {
    toggleHiddenMenu(profileButton);
    hideOtherMenus(profileButton);
});
appsButton.addEventListener('click', function () {
    toggleHiddenMenu(appsButton);
    hideOtherMenus(appsButton);
});

// 숨겨진 메뉴 토글 함수
function toggleHiddenMenu(button) {
    const hiddenMenu = button.nextElementSibling;
    hiddenMenu.classList.toggle('showMenu');
}

// 다른 히든 메뉴 닫기 함수
function hideOtherMenus(activeButton) {
    const buttons = document.querySelectorAll('.profile_main button');
    buttons.forEach(button => {
        if (button !== activeButton) {
            const hiddenMenu = button.nextElementSibling;
            hiddenMenu.classList.remove('showMenu');
        }
    });
}