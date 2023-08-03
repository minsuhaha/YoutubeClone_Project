
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

    comments.forEach(function(comment,index){
        commentsHTML.innerHTML = `
                <div class="comment_box" id="del_comment_${index}">
                    <div><img class="comment_icon" src="/Image/Channel/oreumi_profile.jpg"></div>
                    <div class="comment_textbox">
                        <div class="comment_name">${userName}</div>
                        <div class="comment_text">${comment}</div>
                        <div>
                            <button class="comment_btn" onclick="likeComment(${index})"><img id="like_img_${index}" class="comment_img" src="/Image/etc/up.svg"></button>
                            <span id="count_${index}">0</span>
                            <button class="comment_btn" onclick="unlikeComment(${index})"><img id="unlike_img_${index}" class="comment_img" src="/Image/etc/down.svg"></button>
                            <span id="count_${index}">0</span>
                            <button id="delBtn_${index}" class="comment_del_btn" onclick="delComment(${index})">삭제</button>
                        </div>
                    </div>
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
let like = true;
let unlike = true;
function likeComment(index){
    like = !like;
    like_img = document.getElementById(`like_img_${index}`);
    if (like){
        like_img.src="/Image/etc/up.svg" ;
    } else{
        like_img.src="/Image/etc/upfull.png";
    }
}
function unlikeComment(index){
    unlike = !unlike;
    unlike_img = document.getElementById(`unlike_img_${index}`);
    if (unlike){
        unlike_img.src="/Image/etc/down.svg" ;
    } else{
        unlike_img.src="/Image/etc/downfull.png";
    }
}
function delComment(index){
    const delComment = document.getElementById(`del_comment_${index}`);
    delComment.remove();
}

```
일단 comment.js 수정한 부분들 공유드릴게요
<@373035394209415169> 님 보시고 추가해서 커밋부탁드려요. 저는 이파일 제외하고 커밋할게요
```