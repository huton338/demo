//クラス変数
var address_obj={};

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
    //現在地情報取得
    let datestr = getnow();
    let userid =$("#username").val();
    console.log(userid);
    firebase.database().ref(`room1/talk/${datestr}`).set({
        username: userid,
        text: $("#text").val(),
        date: datestr,
        addressinfo: address_obj
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
        var name_style='style="font-size:13px; margin-bottom:20px; border-bottom:dotted 1.5px #F0F0F0;"';
        var date_style='style="font-size:13px; margin-top:20px"';
        var adress_style='style="font-size:13px; margin-bottom:10px;"';
        if(v.addressinfo==null){
            var str = `<dl id=${k}><dt>${v.username}</dt><dd>${v.text}</dd><dd>${v.date}</dd></dl>`;
        }else{
            var map_url =`https://www.google.co.jp/maps?q=${v.addressinfo.latitude},${v.addressinfo.longitude}`;
            var str = `<dl id=${k}><dt ${name_style}>${v.username}</dt><div>${v.text}</div><div ${date_style}>${v.date}</div><div><a href=${map_url} target="_blank" ${adress_style}>${v.addressinfo.address}</a></div></dl>`;
        }
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



init();
//GoogleMapsAPIのURLパラメータにコールバック関数としてinitMap()を実行
//Main:位置情報を取得する処理 //getCurrentPosition :or: watchPosition
function init() {
    navigator.geolocation.watchPosition(mapsInit, mapsError, set);
}

//1．位置情報の取得に成功した時の処理
function mapsInit(position) {
    //lat=緯度、lon=経度 を取得
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    //http://www.delta-ss.com/labo/a002-2.html
    //緯度・経度をLatLngクラスに変換します。
    var latLngInput = new google.maps.LatLng(lat, lon);

    //Google Maps APIのジオコーダを使います。
    var geocoder = new google.maps.Geocoder();

    //ジオコーダのgeocodeを実行します。
    //第１引数のリクエストパラメータにlatLngプロパティを設定します。
    //第２引数はコールバック関数です。取得結果を処理します。
    geocoder.geocode({latLng: latLngInput},function(results, status) {
        var address = "";

        if (status == google.maps.GeocoderStatus.OK) {
        //取得が成功した場合

          //住所を取得します。
        address = results[0].formatted_address;

        } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
          alert("住所が見つかりませんでした。");
        } else if (status == google.maps.GeocoderStatus.ERROR) {
          alert("サーバ接続に失敗しました。");
        } else if (status == google.maps.GeocoderStatus.INVALID_REQUEST) {
          alert("リクエストが無効でした。");
        } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
          alert("リクエストの制限回数を超えました。しばらくたってからお試しください。");
        } else if (status == google.maps.GeocoderStatus.REQUEST_DENIED) {
          alert("サービスが使えない状態でした。しばらくたってからお試しください。");
        } else if (status == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
          alert("原因不明のエラーが発生しました。再度試してみてください。");
        } else {
          alert("想定外のエラー：status=" + status);
        }

        //住所の結果表示をします。
        address_obj={};
        address_obj={address:address,latitude:lat,longitude:lon};
        console.log(address_obj);
      });

};

//2． 位置情報の取得に失敗した場合の処理
function mapsError(error) {
    var e = "";
    if (error.code == 1) { //1＝位置情報取得が許可されてない（ブラウザの設定）
        e = "位置情報が許可されてません";
    }
    if (error.code == 2) { //2＝現在地を特定できない
        e = "現在位置を特定できません";
    }
    if (error.code == 3) { //3＝位置情報を取得する前にタイムアウトになった場合
        e = "位置情報を取得する前にタイムアウトになりました";
    }
    alert("エラー：" + e);
};

//3.位置情報取得オプション
var set = {
    enableHighAccuracy: true, //より高精度な位置を求める
    maximumAge: 20000, //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
    timeout: 10000 //10秒以内に現在地情報を取得できなければ、処理を終了
};

