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





/* ニフクラメモ

var apikey    = "7672355577f11839b1a72bce66af03d2a68e6f119b00178a4ecc8bc08daaaf68";
var clientkey = "a35cc47c9dc52261c4590dae8f7d466eb3cdf83aa729c0443933ae8cb1d95b13";

var ncmb = new NCMB(apikey, clientkey);
var Test = ncmb.DataStore("test"); // データベース指定

//データの挿入
var test = new Test();
//test.set("name","test").set("path","heart.png").save(); 

$(".test").click(function(){

    var Test = ncmb.DataStore("test");
        Test.fetchAll() // データベース内を全て検索
       .then(function(objects){
          var object = objects[0]; //データベース内のN番目のレコードを指定          
          var path= object.get("path"); //pathフィールドからデータを取得
          path='<img src="image/'+path+'">';
          $('.te').append(path);
       });
});

<<<<<<< HEAD
=======
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
});*/

