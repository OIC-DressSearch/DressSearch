/***共通部分*****************************************************/



  

/***ここまで共通部分*****************************************************/

/***検索画面*****************************************************/




/***ここまで検索画面*****************************************************/

/***一覧画面*****************************************************/




/***ここまで一覧画面*****************************************************/

/***いいね画面*****************************************************/

  //いいね
    $("body").on('click','.heart_enp',function(){
      var element_id=$(this).attr('id');
      $("#"+element_id).removeClass('heart_enp');
      $("#"+element_id).addClass('heart');
    });

  //いいね取消し
    $("body").on('click','.heart',function(){
      var element_id=$(this).attr('id');
      $("#"+element_id).removeClass('heart');
      $("#"+element_id).addClass('heart_enp');
    });


/***ここまでいいね画面*****************************************************/

/***マイページ*****************************************************/

  //遷移
    


/***ここまでマイページ*****************************************************/




/* ここからいいね画面のJS */

//いいね
$("body").on('click','.heart_enp',function(){
  var element_id=$(this).attr('id');
  $("#"+element_id).removeClass('heart_enp');
  $("#"+element_id).addClass('heart');
});

//いいね取消し
$("body").on('click','.heart',function(){
  var element_id=$(this).attr('id');
  $("#"+element_id).removeClass('heart');
  $("#"+element_id).addClass('heart_enp');
});

/* メールアドレス画面JS */
$("#mail_update").click(function(){
  $("#mail_update_2").css("display","block");
});
$("#mail-button").click(function(){
  var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
   var address = $("#new_address").val();
   var address_check= $("#check_address").val();
   if(address!=address_check){
     alert("再入力されたアドレスが違います");
   }
   else{
    if(reg.test(address)){
    window.location.href = "my-page.html"; 
    }
    else{
      alert("入力されたメールアドレスが正しくないです");
    }
  }
});

/* ニフクラメモ

var apikey    = "7672355577f11839b1a72bce66af03d2a68e6f119b00178a4ecc8bc08daaaf68";
var clientkey = "a35cc47c9dc52261c4590dae8f7d466eb3cdf83aa729c0443933ae8cb1d95b13";

var ncmb = new NCMB(apikey, clientkey);
var Test = ncmb.DataStore("test"); // データベース指定

//データの挿入
var test = new Test();
//test.set("フィールド名","挿入したいデータ").set("フィールド名","挿入したデータ").save(); 

// データベース内の検索
    var Test = ncmb.DataStore("test"); // データベース内指定
        Test.fetchAll() // データベース内を全て検索
       .then(function(objects){
          var object = objects[0]; //データベース内のN番目のレコードを指定          
          var path= object.get("フィールド名"); //フィールド名のフィールドからデータを取得
       });*/

