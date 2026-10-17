
let points = 0;

const display = document.getElementById("pointDisplay");
const button = document.getElementById("addButton");
const stampArea = document.getElementById("stampArea");

// スタンプを表示する関数
function updateStamps() {
  stampArea.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const stamp = document.createElement("div");

    stamp.classList.add("stamp");
    stamp.textContent = "★";

    if (i < points) {
      stamp.classList.add("active");
    }

    stampArea.appendChild(stamp);
  }

  display.textContent = "現在のポイント：" + points;
}

// ボタンを押したとき
button.addEventListener("click", function() {
  if (points >= 10) {
    alert("10ポイント達成！おめでとう！");
    return;
  }

  points = points + 1;
  updateStamps();
});

// 最初の画面を表示
updateStamps();
