/********** 入力値の保存 ************/
/*
function onClicked(){
  var mondai = document.getElementById('input_mondai').value.length;//テキストボックスの文字列を取得
  var kaitou = document.getElementById('input_kaitou').value;//テキストボックスの文字列を取得
  if(mondai.trim() !== '' || kaitou.trim() !== ''){
    alert('エラーメッセージ');
    return;
  }
  else{
    abcd(mondai,kaitou)
    // save処理を受け取っているので、then/catchで処理を継続する
    .then(function(res) {
      myNavigator.pushPage('page2.html');  // 保存処理が成功すればpushpage
    })
    .catch(function(err) {
      // エラー処理
      alert('エラーメッセージ');
    });
  }
}

// APIキーの設定とSDK初期化 mBaaS設定

  var ncmb = new NCMB("key","key"); 

//ncmbのデータストアに保存する
  function abcd(mondai,kaitou){
  var Vocablary = ncmb.DataStore("Vocablary");
  var vocablary = new Vocablary();
  return vocablary
           .set('mondai', mondai)
           .set('kaitou', kaitou)    //単語入力 値を送る
           .save();                  //save
}
*/

// This is a JavaScript file
//mobile backendのAPIキーを設定
var ncmb = new NCMB("7672355577f11839b1a72bce66af03d2a68e6f119b00178a4ecc8bc08daaaf68","a35cc47c9dc52261c4590dae8f7d466eb3cdf83aa729c0443933ae8cb1d95b13");


//データをmobile backendに保存するメソッド
function saveData(){
    //クラス名を指定して新規クラスを作成
    var Data = ncmb.DataStore("Data");

    //Dataクラスのインスタンスを作成
    var data = new Data();

    //作成したインスタンスのaisatsuというフィールドに文字データを設定
    data.set("aisatsu", "hello, world!");

    //設定したデータをmobile backendに保存
    data.save()
        .then(function(object) {
              //成功する時の処理
              alert('保存に成功しました');
              //$("#message").html("<p>データ保存に成功!</p>");
          })
        .catch(function(error) {
              //エラーが発生する時の処理
              alert('保存に失敗しました');
              //$("#message").html("error:" + error.message);
          });
}

//mobile backendへの会員登録を行うメソッド
function login (){
    //テキストボックスからユーザー名とパスワードを取得
    var userName = $("#user_name").val();
    var password = $("#password").val();

    //ユーザークラスのインスタンスを作成
    var user = new ncmb.User();

    //インスタンスにユーザー名とパスワードを設定
    user.set("userName", userName)
        .set("password", password);

    //会員登録を行うsignUpByAccountメソッドを実行
    user.signUpByAccount()
        .then(function (object){
            //成功する時の処理
            ncmb.User.login(userName, password)
                     .then(function(data){
                        // ログイン後処理
                        getCurrentUser();              
                     })
                     .catch(function(err){
                        // エラー処理
                        console.log("error:" + error.message);
                     });
        })
        .catch(function (error){
            //エラーが発生する時の処理
            console.log("error:" + error.message);
        });
}

//ログイン中のユーザー名を取得して画面に表示する
function getCurrentUser(){
    //ログイン中の会員を取得
    var user = ncmb.User.getCurrentUser();

    //取得した会員のユーザー名を表示する
    $("#current_user").text("ログイン中のユーザー名："　+ user.get("userName"));
}