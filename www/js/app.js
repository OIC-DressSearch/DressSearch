

/*$("#content1").click(function(){
      $('.display_1').css('display','block'); 
      $('.display_2').css('display','none');
    });
$("#content2").click(function(){
      $('.display_1').css('display','none'); 
      $('.display_2').css('display','block');
<<<<<<< HEAD
    });*/
$("#content3").click(function(){
      $('.display_1').css('display','none'); 
      $('.display_3').css('display','block');
    });
/*ここまで検索画面のjs*/

var apikey    = "7672355577f11839b1a72bce66af03d2a68e6f119b00178a4ecc8bc08daaaf68";
var clientkey = "a35cc47c9dc52261c4590dae8f7d466eb3cdf83aa729c0443933ae8cb1d95b13";

var ncmb = new NCMB(apikey, clientkey);
var Test = ncmb.DataStore("test"); // データベース指定
var test = new Test();
//test.set("name","test").set("path","heart.png").save(); //データの挿入

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