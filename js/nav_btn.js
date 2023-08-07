const navigation = document.querySelector('.navigation');
const itemsContainer = document.getElementById('itemsContainer');
const scrollButtonLeft = document.getElementById('reverseScrollButton');
const scrollButtonRight = document.getElementById('xscroll');
const scrollStep = itemsContainer.querySelector('.item').clientWidth + 28; // 아이템 너비로 스크롤 양 설정

function checkScrollButtons() {
    const isOverflowing = itemsContainer.scrollWidth > itemsContainer.clientWidth;
    scrollButtonLeft.style.display = isOverflowing ? 'block' : 'none';
    scrollButtonRight.style.display = isOverflowing ? 'block' : 'none';
}

scrollButtonLeft.addEventListener('click', () => {
    itemsContainer.scrollBy({
        top: 0,
        left: -scrollStep,
        behavior: 'smooth'
    });
});

scrollButtonRight.addEventListener('click', () => {
    itemsContainer.scrollBy({
        top: 0,
        left: scrollStep,
        behavior: 'smooth'
    });
});

window.addEventListener('resize', checkScrollButtons);

checkScrollButtons();

// 마우스가 네비게이션 요소 위에 올라갔을 때만 스크롤 버튼을 표시하고, 벗어났을 때는 숨기기
navigation.addEventListener('mouseenter', () => {
    scrollButtonLeft.style.display = 'block';
    scrollButtonRight.style.display = 'block';
});

navigation.addEventListener('mouseleave', () => {
    scrollButtonLeft.style.display = 'none';
    scrollButtonRight.style.display = 'none';
});