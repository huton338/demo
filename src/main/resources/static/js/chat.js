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
    $("#view_email").html(result.user.email);
    $("#username").val(result.user.displayName);
    $("#view_name").html(result.user.displayName);
    $("#loading_start").fadeOut(100);
    $("#loading_end").fadeIn(500);
    $("#after_logout").hide();
    roomstatus("1");

}).catch(function (error) {
    console.log("Error:", error);
    $("#user_view").html("login: Error");

});

//databaseルート参照を変数化
const newPostRef = firebase.database().ref();

//ログアウト
$("#logout").on("click",function(){
    roomstatus("0");
    firebase.auth().signOut();
    $("#loading_end").fadeOut(500);
    $("#after_logout").fadeIn(100);
});


//ログイン
$("#login").on("click",function(){
    location.reload(true);
});

//チャット送信
$("#send").on("click", add);
$("#text").on("keydown", function (e) {
    if (e.keyCode == 13 && e.altKey) {
        add();
        return false;
    }
});

//textareaリセット
    $("#reset").on("click",function(){
        $("#text").val("");
    });

//チャット送信ロジック
function add() {
    let datestr = getnow();
    let userid =$("#username").val();
    console.log(userid);
    firebase.database().ref(`room1/talk/${datestr}`).set({
        username: userid,
        text: $("#text").val(),
        date: datestr
    });
    $("#text").val("");
}

//現在日時文字列取得
function getnow() {
    var now = new Date;
    var year = ("0000"+now.getFullYear()).slice(-4);
    var month = ("00"+now.getMonth() + 1).slice(-2);
    var date = ("00"+now.getDate()).slice(-2);
    var hour = ("00"+now.getHours()).slice(-2);
    var min = ("00"+now.getMinutes()).slice(-2);
    var sec = ("00"+now.getSeconds()).slice(-2);
    var date_str = `${year}年${month}月${date}日 ${hour}:${min}:${sec}`;
    return date_str;
}

//DB参照
function talk_ref() {
    firebase.database().ref(`room1/talk`).on("child_added", function (data) {
        var v = data.val();
        var k = data.key;
        var str = `<dl id=${k}><dt>${v.username}</dt><dd>${v.text}</dd><dd>${v.date}</dd></dl>`;
        $("#output").prepend(str);
    });
};
talk_ref();

//ユーザーステータス変更時の処理
function user_ref_chan() {
    firebase.database().ref(`room1/user`).on("child_changed", function (data) {
        $("#join_user").prepend();
        var v = data.val();
        var k = data.key;
        if(v.status==0){
            var str = `<li>${v.username}</li>`;
            var list =$("#join_user").html();
            list = list.replace(str,"");
            $("#join_user").html(list);
            console.log("chenge");
        }
        if(v.status==1){
            var str = `<li>${v.username}</li>`;
            var list =$("#join_user").html();
            list = list.replace(str,"");
            $("#join_user").html(list);
            //ここから上バグなくなったらいらない
            $("#join_user").prepend(str);
            console.log("chenge");
        }
    });
};
user_ref_chan();

//ユーザー初期読み込み
function user_ref_add() {
    firebase.database().ref (`room1/user`).on("child_added", function (data) {
        var v = data.val();
        var k = data.key;
        if(v.status==1){
        var str = `<li>${v.username}</li>`;
        $("#join_user").prepend(str);
        }
    });
};
user_ref_add();

//ユーザーのステータス変更
function roomstatus(status){
    let datestr = getnow();
    let userid =$("#username").val()
    firebase.database().ref(`room1/user/${userid}`).set({
        username: userid,
        status: status,
        date: datestr
    });
}

//function updatestatus(st){
//    let datestr = getnow();
//    let userid =$("#username").val()
//
//    var postdata={
//                    username: userid,
//                    status: st,
//                    date: datestr
//                  }
//    var updates = {};
//    updates[`room1/user/${userid}`] = postdata;
//    return firebase.database().ref().update(updates);
//}
