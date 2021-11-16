/********** 入力値の保存 ************/

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
