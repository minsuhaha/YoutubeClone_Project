const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get('video_id');
let comments = JSON.parse(localStorage.getItem('comments')) || {};
// 각 비디오에 대한 댓글을 객체 형태로 저장
let videoComments = JSON.parse(localStorage.getItem('videoComments')) || {};

//텍스트 줄바꿈 구현
const textarea = document.getElementById('commentInput');

textarea.addEventListener('input', function () {
    textarea.style.height = 'auto'; // 먼저 높이를 초기화하여 내용에 따라 자동으로 조절되도록 합니다.
    textarea.style.height = textarea.scrollHeight + 'px'; // 스크롤 높이를 설정하여 크기를 조절합니다.
});



// 페이지 로드 시 초기 상태 설정
textarea.style.height = textarea.scrollHeight + 'px';
// 페이지 들어가면 자동으로 댓글 로드
function loadComments() {
    const savedComments = videoComments[videoId] || [];
    commentsAdd(savedComments);
}

document.addEventListener("DOMContentLoaded", function () {
    loadComments();
});

// 댓글 추가 함수
function submit() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();

    // 댓글 입력 없이 확인 누를 시 얼럿 출력
    if (commentInput.value === '') {
        alert("댓글을 입력해주세요.");
        return;
    } else {
        commentInput.value = '';
    }

    if (commentText !== '') {
        // 현재 비디오에 대한 댓글 배열을 가져옵니다.
        const videoCommentsArr = videoComments[videoId] || [];
        // 댓글이 비어있지 않으면 배열에 추가하고 입력창 초기화
        videoCommentsArr.push(commentText);

        // 해당 비디오의 댓글 배열을 다시 저장
        videoComments[videoId] = videoCommentsArr;

        // 변경된 댓글을 localStorage에 저장
        saveCommentsToLocalStorage();
    }

    // 현재 비디오에 해당하는 댓글만 보여주도록 업데이트
    loadComments();
}

// 댓글 추가 작성 함수
function commentsAdd(comments) {
    const box = document.getElementById("comment_add");

    // 기존의 댓글 요소를 모두 제거합니다.
    while (box.firstChild) {
        box.removeChild(box.firstChild);
    }

    const userName = "오르미";

    comments.forEach((comment, index) => {
        // \n을 <br>로 변경하여 줄바꿈 적용
        comment = comment.replace(/\n/g, '<br>');

        const commentsHTML = document.createElement("div"); // 각 댓글을 위해 새로운 div 생성
        commentsHTML.classList.add('comment_box')
        commentsHTML.innerHTML = `
            <div class="comment_profile">
                <span><img class="comment_profile_img" src="./Image/Channel/oreumi_profile.jpg"></span>
                <span>
                    <div class="comment_username">${userName}</div>
                    <div class="comment-output">${comment}</div>
                </span>
            </div>
            <div class="comment_btns">
                <div>
                    <button class="like_btn" onclick="likeComment(${index})"><img id="like_img_${index}" class="like_btn_img" src="./Image/etc/up.svg"></button>
                    <span id="count_${index}">0</span>
                    <button class="like_btn" onclick="unlikeComment(${index})"><img id="unlike_img_${index}" class="like_btn_img" src="./Image/etc/down.svg"></button>
                    <span id="count_${index}">0</span>
                </div>
                <div>
                    <button id="edit_btn" onclick="editComment(${index})">수정</button>
                    <button id="delete_btn" onclick="deleteComment(${index})">삭제</button>
                </div>
            </div>
        `;
        box.appendChild(commentsHTML);
    });
}
// localStorage에 댓글을 저장하는 함수
function saveCommentsToLocalStorage() {
    localStorage.setItem('videoComments', JSON.stringify(videoComments));
}

// 적던 댓글 초기화 및 저장소 초기화
function cancelComment() {
    localStorage.clear();
    commentInput.value = '';
}
//댓글 수정 부분
function editComment(index) {
    const commentTextElement = document.querySelectorAll(".comment-output")[index];
    const currentComment = videoComments[videoId][index];
    const editInput = document.createElement("textarea");
    const confirmButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    const buttonsContainer = document.createElement("div");

    buttonsContainer.classList.add("edit_buttons_container");
    editInput.classList.add('edit_input');
    confirmButton.classList.add('edit_confirm_btn');
    cancelButton.classList.add('edit_cancel_btn');

    editInput.type = "text";
    editInput.value = currentComment;
    // editInput.addEventListener("keydown", handleEnter);

    buttonsContainer.appendChild(cancelButton);
    buttonsContainer.appendChild(confirmButton);
    editInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    confirmButton.innerText = "확인";
    cancelButton.innerText = "취소";

    commentTextElement.innerHTML = ""; // 댓글 텍스트를 지우고
    commentTextElement.appendChild(editInput); // 수정할 수 있는 input 요소를 추가
    commentTextElement.appendChild(buttonsContainer);

    editInput.focus(); // 포커스를 주어서 바로 수정 가능하도록 함

    confirmButton.addEventListener("click", function () {
        const newComment = editInput.value.trim();
        if (newComment !== '') {
            videoComments[videoId][index] = newComment;
            saveCommentsToLocalStorage();
            loadComments();
        }
    });

    cancelButton.addEventListener("click", function () {
        loadComments();
    });
}




// 댓글 삭제 함수
function deleteComment(index) {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
        const videoCommentsArr = videoComments[videoId] || [];
        videoCommentsArr.splice(index, 1);
        videoComments[videoId] = videoCommentsArr;
        saveCommentsToLocalStorage(); // 댓글을 먼저 localStorage에 저장
        comments = videoCommentsArr; // comments 배열을 갱신
        loadComments(); // 삭제된 댓글 목록을 다시 로드하여 보여줍니다.
    }
}
let like = true;
let unlike = true;
function likeComment(index) {
    like = !like;
    let like_img = document.getElementById(`like_img_${index}`);
    let count = document.getElementById(`count_${index}`);
    if (like) {
        like_img.src = "./Image/etc/up.svg";
        count.innerText = 0;
    } else {
        like_img.src = "./Image/etc/upfull.png";
        count.innerText = 1;

    }
}
function unlikeComment(index) {
    unlike = !unlike;
    let unlike_img = document.getElementById(`unlike_img_${index}`);
    let uncount = document.getElementById(`uncount_${index}`);
    if (unlike) {
        unlike_img.src = "./Image/etc/down.svg";
        uncount.innerText = 0;
    } else {
        unlike_img.src = "./Image/etc/downfull.png";
        uncount.innerText = 1;
    }
}
function handleEnter(event) {
    if (event.key === "Enter") {
        if (!event.shiftKey) {
            event.preventDefault();
            const inputElement = event.target;
            const currentText = inputElement.value;
            inputElement.value = currentText + "\n";
        }
    }
}
