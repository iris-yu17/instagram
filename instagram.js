let fetchCount = 1; // 一次取12筆資料，共取四次，到約39筆的時候跳出登入畫面
let endCurser = ""; // 下一頁代碼
let url =
  "https://www.instagram.com/graphql/query/?query_id=17888483320059182&id=33487574834&first=12&after=" +
  endCurser;

$.ajax({
  url: "https://www.instagram.com/bravo_artofwar/?__a=1",
  // url: "./temp_api.json",
}).done(function (result) {
  // 代入profile資訊
  $("#post_count").text(result.graphql.user.edge_owner_to_timeline_media.count);
  $("#follower_count").text(result.graphql.user.edge_followed_by.count);
  $("#following_count").text(result.graphql.user.edge_follow.count);
  $("#fullname").text(result.graphql.user.full_name);
  $("#biography").text(result.graphql.user.biography);
  // 代入mobile pofile資訊
  $("#post_count_m").text(
    result.graphql.user.edge_owner_to_timeline_media.count
  );
  $("#follower_count_m").text(result.graphql.user.edge_followed_by.count);
  $("#following_count_m").text(result.graphql.user.edge_follow.count);
  $("#fullname_m").text(result.graphql.user.full_name);
  $("#biography_m").text(result.graphql.user.biography);
});

const getPosts = () => {
  $.ajax({
    url: "./temp_api.json",
    // url:
    //   "https://www.instagram.com/graphql/query/?query_id=17888483320059182&id=33487574834&first=12",
  }).done(function (result) {
    // 顯示圖片
    const postArray = result.data.user.edge_owner_to_timeline_media.edges;
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
        postContent.innerHTML += `<div class="square">
        <img
        class="post_img"
        src="${postArray[i].node.display_url}"
        alt=""/>
        <div class="square_hover">
          <img class="view_icon" src="./img/heart.svg">
          <div class="view_count">${postArray[i].node.edge_media_preview_like.count}
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
      let dimensions = postArray[i].node.dimensions;

      // let typeName = postArray[i].node.product_type;
      // if (typeName === "igtv") {

      // 影片類型
      if (typeName === "GraphVideo") {
        // 一般影片
        if (dimensions.height === dimensions.width) {
          square[
            i
          ].innerHTML += `<img class="post_igtv_icon" src="./img/video.png"/>`;
        } else {
          // igtv
          square[
            i
          ].innerHTML += `<img class="post_igtv_icon" src="https://img.icons8.com/material-sharp/24/ffffff/igtv.png"/>`;
        }
        // 多張圖片
      } else if (typeName === "GraphSidecar") {
        square[
          i
        ].innerHTML += `<img class="post_igtv_icon" src="./img/multipage.png"/>`;
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

    endCurser =
      result.data.user.edge_owner_to_timeline_media.page_info.end_cursor;

    console.log(endCurser);
  });
};

getPosts();

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

// window.addEventListener("scroll", function (e) {
//   if (
//     (window.innerHeight + window.scrollY) /
//       document.documentElement.offsetHeight >=
//     0.999
//     // Math.ceil(window.innerHeight + window.scrollY) ==
//     // document.documentElement.offsetHeight
//   ) {
//     getPosts();
//   }
// });

$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    console.log("near bottom!");
  }
});

// fetch("https://www.instagram.com/bravo_artofwar/?__a=1")
//   .then((r) => r.json())
//   .then((result) => {
//     console.log("result", result.data.user.edge_followed_by.count);
//   });
