$.ajax({
  // url: "https://www.instagram.com/bravo_artofwar/?__a=1",
  url: "./api.json",
}).done(function (result) {
  // 代入profile資訊
  $("#post_count").text(result.graphql.user.edge_owner_to_timeline_media.count);
  $("#follower_count").text(result.graphql.user.edge_followed_by.count);
  $("#following_count").text(result.graphql.user.edge_follow.count);
  $("#fullname").text(result.graphql.user.full_name);
  $("#biography").text(result.graphql.user.biography);

  // 顯示圖片
  const postArray = result.graphql.user.edge_owner_to_timeline_media.edges;
  console.log(postArray);
  for (i = 0; i < postArray.length; i++) {
    // 貼文是影片
    if (postArray[i].node.video_view_count) {
      postContent.innerHTML += `<div class="square co1-4">
      <img
      class="post_img"
      src="${postArray[i].node.display_url}"
      alt=""/>
      <div class="square_hover">
        <img class="view_icon" src="./img/play-button.svg">
        <div class="view_count">${postArray[i].node.video_view_count}
        </div>
        <img class="comment_icon" src="./img/chat-bubble.svg">
        <div class="comment_count">${postArray[i].node.edge_media_to_comment.count}
        </div>
      </div>`;
    }
    // 貼文是圖片
    else {
      postContent.innerHTML += `<div class="square co1-4">
        <img
        class="post_img"
        src="${postArray[i].node.display_url}"
        alt=""/>
        <div class="square_hover">
          <img class="view_icon" src="./img/heart.svg">
          <div class="view_count">${postArray[i].node.edge_liked_by.count}
          </div>
          <img class="comment_icon" src="./img/chat-bubble.svg">
          <div class="comment_count">${postArray[i].node.edge_media_to_comment.count}
          </div>
        </div>`;
    }
  }

  // 顯示圖片右上的小icon
  const square = document.querySelectorAll(".square");
  for (i = 0; i < postArray.length; i++) {
    // 看 api typename是甚麼，決定用甚麼icon
    let typeName = postArray[i].node.__typename;

    if (typeName === "GraphVideo") {
      square[
        i
      ].innerHTML += `<img class="post_igtv_icon" src="https://img.icons8.com/material-sharp/24/ffffff/igtv.png"/>`;
    } else if (typeName === "GraphSidecar") {
      // GraphSidecar
    } else {
      // GraphImage
    }
  }

  // 貼文hover效果
  for (i = 0; i < postArray.length; i++) {
    $(".square").on({
      mouseenter: function () {
        $(this).children().css("display", "flex");
      },
      mouseleave: function () {
        $(".square_hover").css("display", "none");
      },
    });
  }

  // 相關帳號
  const accountArea = document.querySelector(".accounts_wrapper");
  const relatedAccountArray = result.graphql.user.edge_related_profiles.edges;
  console.log(relatedAccountArray);

  for (i = 0; i < relatedAccountArray.length; i++) {
    accountArea.innerHTML += `
    <div class="account_box">
      <i class="fas fa-times"></i>
      <div class="pic">
        <img src="${relatedAccountArray[i].node.profile_pic_url}">
      </div>
      <div class="name">
      ${relatedAccountArray[i].node.username}</div>
      <div class="intro">
      ${relatedAccountArray[i].node.full_name}</div>
      <div class="account_btn">追蹤</div>
    </div>`;
  }

  // 相關帳號 點擊叉叉按掉
  const fa_times = document.querySelectorAll(".fa-times");
  const accounts_wrapper = document.querySelector(".accounts_wrapper");
  let initial_position = 0;

  $(".fa-times").click(function () {
    $(this).parent().css("opacity", "0");

    new_position = initial_position -= 201;
    accounts_wrapper.style.left = new_position + "px";
  });
});

// 為了排版，若一行的貼文數不是三的話補上隱形div
const postContent = document.querySelector(".post_content");
let nodesSameClass = document.querySelectorAll(".square");

if (nodesSameClass.length % 3 === 2) {
  postContent.innerHTML += `<div class="hidden_square co1-4"></div>`;
} else if (nodesSameClass.length % 3 === 1) {
  postContent.innerHTML += `<div class="hidden_square co1-4">1</div>
  <div class="hidden_square co1-4">2</div>`;
} else {
  console.log("ok");
}

// console.log(postArray);

// fetch("https://www.instagram.com/bravo_artofwar/?__a=1")
//   .then((r) => r.json())
//   .then((result) => {
//     console.log("result", result.graphql.user.edge_followed_by.count);
//   });
