// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_VtaX3M_U4kwp2VUIk0xl3--Fmo0wNNg",
    authDomain: "chatapp-8352f.firebaseapp.com",
    databaseURL: "https://chatapp-8352f.firebaseio.com",
    projectId: "chatapp-8352f",
    storageBucket: "",
    messagingSenderId: "863568010475"
};
firebase.initializeApp(config);

//auth
firebase.auth().getRedirectResult().then(function (result) {
    if (!result.credential) {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        return;
    }
    $("#user_view").html("login:" + result.user.email);
    $("#username").val(result.user.displayName);
    $("#loading_start").fadeOut(100);
    $("#loading_end").fadeIn(500);
}).catch(function (error) {
    console.log("Error:", error);
    $("#user_view").html("login: Error");

});


//ルート参照を変数化
const newPostRef = firebase.database().ref();

//チャット送信
$("#send").on("click", add);
$("#text").on("keydown", function (e) {
    if (e.keyCode == 13 && e.altKey) {
        add();
        return false;
    }
});

// //チャット送信ロジック
// function add() {
//     let datestr = getnow();
//     newPostRef.push({
//         username: $("#username").val(),
//         text: $("#text").val(),
//         date: datestr
//     });
//     $("#text").val("");
// }

//チャット送信ロジック
function add() {
    let datestr = getnow();
    let userid = "testuser";
    firebase.database().ref(`user/${userid}/${datestr}`).set({
        username: $("#username").val(),
        text: $("#text").val(),
        date: datestr
    });
    $("#text").val("");
}

//現在日時文字列取得
function getnow() {
    var now = new Date;
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var date_str = `${year}${month}${date} ${hour}:${min}:${sec}`;
    return date_str;
}

//DB参照
function ref() {
    let userid = "testuser";
    firebase.database().ref(`user/${userid}`).on("child_added", function (data) {
        var v = data.val();
        var k = data.key;
        var str = `<dl id=${k}><dt>${v.username}</dt><dd>${v.text}</dd><dd>${v.date}</dd></dl>`;
        $("#output").prepend(str);
    });
};
ref();