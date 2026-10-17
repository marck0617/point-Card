
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

// ① Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyA5yz82P5ItAkHuTFYz3nflznRIZThZJck",
  authDomain: "point-38bc0.firebaseapp.com",
  projectId: "point-38bc0",
  storageBucket: "point-38bc0.firebasestorage.app",
  messagingSenderId: "418964774544",
  appId: "1:418964774544:web:a4c4f9e1e8627e6cfb8215",
  measurementId: "G-7LDRQRJB2Q"
};

// ② Firebaseを起動
const firebaseApp = initializeApp(firebaseConfig);

// ③ 認証機能を準備
const auth = getAuth(firebaseApp);

// ④ データベースを準備
const db = getFirestore(firebaseApp);

// ⑤ ポイントを読み込む
async function loadPoints() {

  const status = document.getElementById("firebaseStatus");

  try {
    status.textContent = "Firebaseに接続中...";

    // 匿名ログイン
    const result = await signInAnonymously(auth);

    // FirebaseユーザーID
    const userId = result.user.uid;

    // 自分のデータを探す
    const userRef = doc(db, "users", userId);

    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {

      const data = snapshot.data();

      updateStamps(Number(data.points ?? 0));

      status.textContent = "ポイントを読み込みました";

    } else {

      updateStamps(0);

      status.textContent = "Firebase接続成功！データは未登録です";
    }

  } catch (error) {

    console.error(error);

    status.textContent = "エラー：" + error.message;
  }
}

// ⑥ ページを開いたら実行
loadPoints();
