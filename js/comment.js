const commentBtn = document.getElementById("comment_btn")
const commentAdd = document.querySelectorAll("comment_add")

// 강사님 코드

// 댓글을 저장할 배열 (localStorage 사용)
let comments = JSON.parse(localStorage.getItem('comments')) || [];

// 댓글 추가 함수
function submit() {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim(); // 댓글 입력값에서 공백 제거
    

    // 댓글 입력 없이 확인 누를시 얼럿 출력
    if(commentInput.value===''){
        alert("댓글을 입력해주세요.");
        return;
    } else{
        commentInput.value = '';
    }
    if (commentText !== '') {
    // 댓글이 비어있지 않으면 배열에 추가하고 입력창 초기화
    comments.push(commentText);
    commentInput.value = '';
    saveCommentsTolocalStorage(); // 변경된 댓글을 localStorage에 저장
    }
    commentsAdd(comments);
    
}
// 댓글 html 생성 함수
function commentsAdd(comments){
    const commentsHTML = document.createElement("comment_addbox")
    const box = document.getElementById("comment_add")
    const userName = "오르미"

    comments.forEach(comment => {
        commentsHTML.innerHTML = `
                <div id="del">
                    <span><img src="/Image/Channel/oreumi_profile.jpg"></span>
                    <span>${userName}</span>
                    <div>${comment}</div>
                </div>
                `;
        box.appendChild(commentsHTML);
    });
}

// localStorage에 댓글을 저장하는 함수
function saveCommentsTolocalStorage() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

// 적던 댓글 초기화 및 저장소 초기화
function cancelComment() {
    localStorage.clear();
    commentInput.value = '';
}




