/**********変数 ************/
var apikey="7672355577f11839b1a72bce66af03d2a68e6f119b00178a4ecc8bc08daaaf68";
var clientkey="a35cc47c9dc52261c4590dae8f7d466eb3cdf83aa729c0443933ae8cb1d95b13";
var ncmb = new NCMB(apikey, clientkey);
var path=[];  //画像ファイルを取得するファイル名を入れる配列
var dress_id=[]; // ドレスIDを格納する配列
var text=""; // 検索画面で選択した項目を反映させる変数
var img_f=[]; // 検索画面のポップアップ画面の画像が閉じているか開いているか 
var deteil=["詳しく","閉じる"]; 
var index=999; // 検索画面のポップアップ画面のインデックス
var item_count=0; // 一覧画面、いいね画面の画像を表示するためのインデックス。また、二つの画面における件数をカウントするための変数
var search_box=["#dress","#line","#neck_line","#sleeve","#waist_line","#skirt","#skirt_length","#trane","#bodice"]; 
var check_box=[".check_1:checked",".check_2:checked",".check_3:checked",".check_4:checked",".check_5:checked",".check_6:checked",".check_7:checked",".check_8:checked",".check_9:checked"];
var flag=[]; // いいね判定フラグ
var where_texts=[];  // テスト中
var j=0; // いいねフラグ格納インデックス
var where=[]; // データを取得する際の条件を格納するテキスト
var img_index=0;
var favorite_tab="";
var favorite_check=[];
var favorite_index=0;

/********ここまで変数部 *****/
 
/***共通部分*****************************************************/
   window.onload = function () { // htmlが読み込まれたとき
     var current_file=location.pathname; // 現在のhtmlファイル取得
     if(current_file==="/list.html"){
       file_search();
       search_sum();
     }
     else if(current_file==="/favorite.html"){
       favorite_search();
     }
     else if(current_file==="/search.html"){
       new_imgf();
     }
   };
$(".back").click(function(){
 window.location.href = "my-page.html";
});
$("#ok-button").click(function(){
 window.location.href = "my-page.html";
})
 
/***ここまで共通部分*****************************************************/
 
/***新規作成画面*****************************************************/
 
$("#next_page_1").click(function(){
 $("#page_1").css("display","none");
 $("#page_2").css("display","block");
});
$("#next_page_2").click(function(){
 $("#page_2").css("display","none");
 $("#page_3").css("display","block");
});
$("#back_page_2").click(function(){
 $("#page_2").css("display","none");
 $("#page_1").css("display","block");
});
$("#back_page_3").click(function(){
 $("#page_3").css("display","none");
 $("#page_2").css("display","block");
});
 
/***ここまで新規作成画面*****************************************************/
 
/***検索画面*****************************************************/
 
   $('#dress').click(function() {
    $('#popup_1').addClass('js_active'); // popup_1にjs_activeクラスを追加(このクラスの追加でポップアップが表示される)
    index=0;
   });
   $('#line').click(function() {
    $('#popup_2').addClass('js_active');
    index=1;
   });
   $('#neck_line').click(function() {
    $('#popup_3').addClass('js_active');
    index=2;
   });
   $('#sleeve').click(function() {
    $('#popup_4').addClass('js_active');
    index=3;
   });
   $('#waist_line').click(function() {
    $('#popup_5').addClass('js_active');
    index=4;
   });
   $('#skirt').click(function() {
    $('#popup_6').addClass('js_active');
    index=5;
   });
   $('#skirt_length').click(function() {
    $('#popup_7').addClass('js_active');
    index=6;
   });
   $('#trane').click(function() {
    $('#popup_8').addClass('js_active');
    index=7;
   });
   $('#bodice').click(function() {
    $('#popup_9').addClass('js_active');
    index=8;
   });
  
  $(".back_search").click(function(){
    text="";
    var i=0;
    $(check_box[index]).each(function() { //チェックされているチェックボックスを全て探索
        if(i===0){ //一番初めの時はコンマを付けない
          text += $(this).val();     
        }
        else{
          text += ","+$(this).val();
        }
        i++;
    });
    if(i===0){ // なにも選択されていない場合
      $(search_box[index]).text("ーーー");
    }
    else{
      $(search_box[index]).text(text); // ボックスの中にテキストを格納
    }    
        $('.popup').removeClass('js_active'); // ポップアップを閉じる(js_activeクラスを削除)
  });
  

 /**ここからポップアップ中身(未完成) ****/

   $(".deteil_text").click(function(){ //詳しく一行目
   img_index++;
   var test_1=$(this).attr("name");

     if(img_f[test_1]!=1){ //閉じている時
       $("#image_"+test_1).slideDown("slow", function() { // 画像を開くアニメーション."slow"部分はスピード
         $("#deteil_text"+test_1).text(deteil[1]);  // 画像を開いているとき「詳しく」を「閉じる」に変更
       });
       img_f[test_1]=1;
     }
     else{//開いている時
       $("#image_"+test_1).slideUp("slow", function() {
         $("#deteil_text"+test_1).text(deteil[0]);
           img_f[test_1]=0;
       });
     }
   });
   
   /***ここからポップアップ中身 *****/




    $("#search_button").click(function(){
      where_texts[0]=$('[name=rental_shop] option:selected').text();
      where_texts[1]=$('[name=dress_store] option:selected').text();
      where_texts[2]=$("#dress").text();
      where_texts[3]=$('[name=dress_color] option:selected').text();
      where_texts[4]=$('[name=dress_image] option:selected').text();
      where_texts[5]=$("#line").text();
      where_texts[6]=$("#neck_line").text();
      where_texts[7]=$("#sleeve").text();
      where_texts[8]=$("#waist_line").text();
      where_texts[9]=$("#skirt").text();
      where_texts[10]=$("#skirt_length").text();
      where_texts[11]=$("#trane").text();
      where_texts[12]=$("#bodice").text();
      where_texts[13]=$('[name=dress_size] option:selected').text();

      var Test = ncmb.DataStore("test_table");
      Test .equalTo("id", "1").fetchAll().then(function(objects){
        var object = objects[0];
        object.set("rental_shop",where_texts[0]).set("dress_store",where_texts[1]).set("dress",where_texts[2]).set("dress_color",where_texts[3]).set("dress_image",where_texts[4]).set("line",where_texts[5]).set("neck_line",where_texts[6]).set("sleeve",where_texts[7]).set("waist_line",where_texts[8]).set("skirt",where_texts[9]).set("skirt_length",where_texts[10]).set("trane",where_texts[11]).set("bodice",where_texts[12]).set("dress_size",where_texts[13]); //条件を格納
        object.update();
      }).catch(function(err) {
        alert(err);
      })
      setTimeout(function(){
        window.location.href = "list.html"; 
      },500);
    });

    function new_imgf(){
      for(var i=0;i<100;i++){
        img_f[i]=0;
      }
    }
 
/***ここまで検索画面*****************************************************/
 
/***一覧画面*****************************************************/
 
//件数表示
 
function search_sum(){

  //listの子要素のカウントしたかったやつ
  /*var scnt = document.getElementsByClassName("list").childElementCount;*/
  var ssum = $(".item").length;//liの数をカウント

 
 var sumresult = String(item_count);
 $("#search_sum").text(sumresult + "件");
}

  var reader = new FileReader(); //リーダークラス作成
  reader.onload = function(e) { //リーダーが読み込んだ時のイベント
  var add_text="";
  item_count++;
  var dataUrl = reader.result; //リーダークラスが取得した結果を変数に格納
    if(flag[item_count-1]){
      add_text='<li class="item"><img src="'+dataUrl+'"><div class="heart" id="heart_'+item_count+'" name="'+path[item_count-1]+','+dress_id[item_count-1]+'"></div></li>';
    }else{
      add_text='<li class="item"><img src="'+dataUrl+'"><div class="heart_enp" id="heart_'+item_count+'" name="'+path[item_count-1]+','+dress_id[item_count-1]+'"></div></li>';
    }
    $("#result_list").append(add_text);
    $("#search_sum").text(item_count + "件");
    }  

  function file_search(){
    for(var i=0;i<100;i++){ //いいねフラグ初期化
      flag[i]=false;
    }
    j=0; // いいねフラグindex
    get_path();
  }

  function get_path(){
    var get_where = ncmb.DataStore("test_table"); 
    get_where.fetchAll() .then(function(objects){ // 条件を取得
      var object = objects[0];         
      where[0]=object.get("rental_shop");
      where[1]=object.get("dress_store");
      where[2]=object.get("dress"); 
      where[3]=object.get("dress_color");
      where[4]=object.get("dress_image");
      where[5]=object.get("line");
      where[6]=object.get("neck_line");
      where[7]=object.get("sleeve");
      where[8]=object.get("waist_line"); 
      where[9]=object.get("skirt");
      where[10]=object.get("skirt_length");
      where[11]=object.get("trane");
      where[12]=object.get("bodice");
      where[13]=object.get("dress_size");
      var get_data = ncmb.DataStore("test");
      
      if(where_check(where)){
          get_data.fetchAll().then(function(results){  // ドレスの画像取得
          for(var i=0;i<results.length;i++){
            var a=results[i]; 
            path[i]=a.get("path");    
            dress_id[i]=a.get("dress_id");
            var saveData_2 = ncmb.DataStore("favorite");
            saveData_2.equalTo("dress_id", dress_id[i]).fetchAll().then(function(results){ // いいね判定
              var res=results[0];
              if(res.dress_id!=" "){ // idが存在するかどうか
                flag[j]=true;
                j++;
              }
            })
            .catch(function(error){
              //alert(error);
              j++;
            });
            
            ncmb.File.download(path[i], "blob")
            .then(function(blob) {
              reader.readAsDataURL(blob);
            })
            .catch(function(err) {
              alert(err);
            })
          }              
        })
        .catch(function(error){
          alert(error);
        });    
      }

      else{ 
        var subquery1 = get_data.equalTo("rental_shop", where[0]);
        var subquery2 = get_data.equalTo("dress_store", where[1]);
        var subquery3 = get_data.equalTo("dress", where[2]);
        var subquery4 = get_data.equalTo("dress_color", where[3]);
        var subquery5 = get_data.equalTo("dress_image", where[4]);
        var subquery6 = get_data.equalTo("line", where[5]);
        var subquery7 = get_data.equalTo("neck_line", where[6]);
        var subquery8 = get_data.equalTo("sleeve", where[7]);
        var subquery9 = get_data.equalTo("waist_line", where[8]);
        var subquery10 = get_data.equalTo("skirt", where[9]);
        var subquery11 = get_data.equalTo("skirt_length", where[10]);
        var subquery12 = get_data.equalTo("trane", where[11]);
        var subquery13 = get_data.equalTo("bodice", where[12]);
        var subquery14 = get_data.equalTo("dress_size", where[13]);

        get_data.or([subquery1, subquery2,subquery3,subquery4, subquery5,subquery6,subquery7, subquery8,subquery9,subquery10, subquery11,subquery12,subquery13,subquery14]).fetchAll() .then(function(results){  // ドレスの画像取得
          for(var i=0;i<results.length;i++){
            var a=results[i]; 
            path[i]=a.get("path");    
            dress_id[i]=a.get("dress_id");
            var saveData_2 = ncmb.DataStore("favorite");
            saveData_2.equalTo("dress_id", dress_id[i]).fetchAll().then(function(results){ // いいね判定
              var res=results[0];
              if(res.dress_id!=" "){ // idが存在するかどうか
                flag[j]=true;
                j++;
              }
            })
            .catch(function(error){
              //alert(error);
              j++;
            });
            
            ncmb.File.download(path[i], "blob")
            .then(function(blob) {
              reader.readAsDataURL(blob);
            })
            .catch(function(err) {
              alert(err);
            })
          }              
        })
        .catch(function(error){
          alert(error);
        });
      }
    })
    .catch(function(error){
      alert(error);
    }); 

      
    function where_check(where){
      var enp=0;
      for(var i=0;i<where.length;i++){
        where[i]=where[i].trim();
        if(where[i]==="ーーー"){
          enp++;
        }
      }
      if(enp===where.length){
        return true;
      }
      else{
        return false;
      }
    }
}


/***ここまで一覧画面*****************************************************/
 
/***いいね画面*****************************************************/
 
 //いいね
   $("body").on('click','.heart_enp',function(){
     var element_id=$(this).attr('id'); // いいねを押した要素のidを取得
     $("#"+element_id).removeClass('heart_enp');
     $("#"+element_id).addClass('heart');
     var item_name=$(this).attr('name'); 
     var item_name_sprite = item_name.split(',');

     var Favorite = ncmb.DataStore("favorite");
     var favorite = new Favorite();
      favorite.set("user_id","test").set("path",item_name_sprite[0]).set("dress_id",item_name_sprite[1]).save();

   });
 
 //いいね取消し
   $("body").on('click','.heart',function(){
     var element_id=$(this).attr('id');
     $("#"+element_id).removeClass('heart');
     $("#"+element_id).addClass('heart_enp');
    var item_name=$(this).attr('name');
    var item_name_sprite = item_name.split(',');
     var Favorite = ncmb.DataStore("favorite");
            Favorite.equalTo("dress_id", item_name_sprite[1]) 
            .fetchAll() 
            .then(function(results){
              var object=results[0];
              object.delete()             
            })
            .catch(function(error){
              alert(error);
            });
  
     
   });
function favorite_search(){
  var favorite_path=[];

var reader = new FileReader(); //リーダークラス作成
    reader.onload = function(e) { //リーダーが読み込んだ時のイベント
      item_count++;
      var dataUrl = reader.result; //リーダークラスが取得した結果を変数に格納
      var add_text='<li class="item"><img src="'+dataUrl+'"><div class="heart" id="heart_'+item_count+'" name="'+path[item_count-1]+','+dress_id[item_count-1]+'"></div></li>';
      $("#result_list").append(add_text);
      $("#search_sum").text(item_count + "件");
    }  


         var favorite_test = ncmb.DataStore("favorite");
      favorite_test
            .equalTo("user_id", "test")
            .fetchAll() 
            .then(function(results){
                for(var i=0;i<results.length;i++){
                var a=results[i];
                favorite_path[i]=a.path;
                if(favorite_check(a.doress_store)){
                  alert(favorite_check(a.path))
                //favorite_tab+='<td id="list">'+a.dress_store+'</td>';
                }

                var fileName=favorite_path[i];
                ncmb.File.download(fileName, "blob")
                .then(function(blob) {
                  // ファイルリーダーにデータを渡す
                  reader.readAsDataURL(blob);
                })
                .catch(function(err) {
                    console.error(err);
                })
                }
            })
            .catch(function(error){
              alert(error);
            });
        function favorite_check(text){
            favorite_check[favorite_index]=text;
            for(var i=0;i<favorite_check.length;i++){
              if(text===favorite_check[i]){
                favorite_index++;
                return true;
              }
            }
            favorite_index++;
            return false;
        }
}

  //ショップリストの折り返し　配列にショップの名前を入れてから正規表現する
/*   var count_6 = $("#nice_list").match(/.{1,6}/g);
   for( let n = 0; n <= count_6.length; n++ ) {
   console.log( count_6[n] );
   }*/
 
/***ここまでいいね画面*****************************************************/
 
/***マイページ*****************************************************/
 
 //遷移
  
 
 
/***ここまでマイページ*****************************************************/
 
/***会員情報変更画面*****************************************************/
 
 $("#login_info").click(function(){
   $(".display_login").css("display","none");
   $(".display_info1").css("display","block");
 });
 $("#info_button").click(function(){
   $(".display_info1").css("display","none");
   $(".display_info2").css("display","block");
 });
 
 
/***ここまで会員情報変更画面*****************************************************/
 
/***パスワード変更画面*****************************************************/
 $("#login_pass").click(function(){
   $(".display_login").css("display","none");
   $(".display_pass1").css("display","block");
 });
 $("#pass_button").click(function(){
   $(".display_pass1").css("display","none");
   $(".display_pass2").css("display","block");
 });
 
/***ここまでパスワード変更画面*****************************************************/
 
/***身長/BWH変更画面*****************************************************/
 
 $("#login_higth").click(function(){
   $(".display_login").css("display","none");
   $(".display_higth1").css("display","block");
 });
 /*保存ボタン遷移*/
 $("#higth_button").click(function(){
   $(".display_higth1").css("display","none");
   $(".display_higth2").css("display","block");
 });
 /***ここまで身長/BWH変更画面*****************************************************/
 
 
/***メールアドレス画面*****************************************************/
$("#login_mail").click(function(){
 $(".display_login").css("display","none");
 $(".display_mail1").css("display","block");
});
$("#mail_update").click(function(){
 $(".display_mail1").css("display","none");
 $(".display_mail2").css("display","block");
});
 
/*パスワード認証*/
$("#mail-button").click(function(){
 var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  var address = $("#new_address").val();
  var address_check= $("#check_address").val();
  if(address!=address_check){
    alert("再入力されたアドレスが違います");
  }
  else{
   if(reg.test(address)){
     $("#mail-button").click(function(){
   $(".change").css("display","none");
 $(".ok").css("display","block");
});
   }
   else{
     alert("入力されたメールアドレスが正しくないです");
   }
 }
});
 
/***ここまでメールアドレス画面*************************************/
 
/***logout画面*****************************************************/
$("#logout-button1").click(function(){
 $(".display_logout1").css("display","none");
 $(".display_logout2").css("display","block");
});
 
 
/***ここまでlogout画面*****************************************************/
 
 
/***退会画面*****************************************************/
$("#withdrawal-button1").click(function(){
 $(".display_withdrawal1").css("display","none");
 $(".display_withlogin").css("display","block");
});
$("#login_with").click(function(){
 $(".display_withlogin").css("display","none");
 $(".display_withdrawal2").css("display","block");
});
 
/***ここまで退会画面*****************************************************/
 
 
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
 
 
/*************ファイル読み込み処理テスト*********/





   /* var reader = new FileReader(); //リーダークラス作成
    reader.onload = function(e) { //リーダーが読み込んだ時のイベント
      var dataUrl = reader.result; //リーダークラスが取得した結果を変数に格納
      document.getElementById("tes").src = dataUrl;
    }

        $("#test").click(function(){
      // ファイル名からファイルを取得
      var fileName = "icon.png";

      // ダウンロード（データ形式をblobを指定）
      ncmb.File.download(fileName, "blob")
           .then(function(blob) {
           // ファイルリーダーにデータを渡す
           reader.readAsDataURL(blob);
           })
           .catch(function(err) {
              console.error(err);
           })
    
    });
*/



    /*************ここまでテスト**********/

    /*************画像読み込みテスト*********/

 
   /*************ここまでテスト**********/

