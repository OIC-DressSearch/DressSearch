/**********変数 ************/
var apikey="7672355577f11839b1a72bce66af03d2a68e6f119b00178a4ecc8bc08daaaf68";var clientkey="a35cc47c9dc52261c4590dae8f7d466eb3cdf83aa729c0443933ae8cb1d95b13";
var text="";
var img_f=[0,0,0];
var deteil=["詳しく","閉じる"]
var index=999;
var item_count=1;
var search_box=["#dress","#line","#neck_line","#sleeve","#waist_line","#skirt","#skirt_length","#trane","#bodice"];
var check_box=[".check_1:checked",".check_2:checked",".check_3:checked",".check_4:checked",".check_5:checked",".check_6:checked",".check_7:checked",".check_8:checked",".check_9:checked"];

var te="a";

/********ここまで変数部 *****/

/***共通部分*****************************************************/
    window.onload = function () {
      var current_file=location.pathname;
      if(current_file==="/list.html"){
        file_search();
        search_sum();
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

    /*$('#dress').click(function() {
        $('.popup').addClass('js_active'); //popupクラスにjs_activeクラスを追加する
    });*/
    $('#dress').click(function() {
     $('#popup_1').addClass('js_active');
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
      if(i===0){
        $(search_box[index]).text("ーーー"); 
      }
      else{
        $(search_box[index]).text(text); // ボックスの中にテキストを格納
      }     
           $('.popup').removeClass('js_active'); // ポップアップを閉じる(js_activeクラスを削除)
    });

    $("#deteil_1").click(function(){ //詳しく一行目
      if(img_f[0]!=1){ //一行目の開閉判判定
        $("#image_1").slideDown("slow", function() { // 画像を開くアニメーション."slow"部分はスピード
          $("#deteil_1").text(deteil[1]);  // 画像を開いているとき「詳しく」を「閉じる」に変更
        });
        img_f[0]=1;
      }
      else{
        $("#image_1").slideUp("slow", function() {
          $("#deteil_1").text(deteil[0]);
            img_f[0]=0;
        });
      }
    });

    $("#deteil_2").click(function(){
      if(img_f[1]!=1){
        $("#image_2").slideDown("slow", function() {
        $("#deteil_2").text(deteil[1]);
       });
      img_f[1]=1;
      }
      else{
         $("#image_2").slideUp("slow", function() {
           $("#deteil_2").text(deteil[0]);
          img_f[1]=0;
         });
      }
    });

    $("#search_button").click(function(){
        te=$("#dress").text();
        var ncmb = new NCMB(apikey, clientkey);
        var Test = ncmb.DataStore("test_table"); // データベース指定

        //データの挿入
        var test = new Test();
        test.set("dress",te).save(); 
          window.location.href = "list.html"; 
        
    });

/***ここまで検索画面*****************************************************/

/***一覧画面*****************************************************/

//件数表示
function search_sum(){
$(function($){
  //listの子要素のカウントしたかったやつ
  /*var scnt = document.getElementsByClassName("list").childElementCount;*/
  var ssum = $(".item").length;//liの数をカウント
    alert(ssum);
  document.getElementById("search_sum").textContent = scnt;//ここで指定したIDに数字を入れて出力したい
});
}


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




    var reader = new FileReader(); //リーダークラス作成
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




    /*************ここまでテスト**********/

    /*************画像読み込みテスト*********/
    var reader = new FileReader(); //リーダークラス作成
    reader.onload = function(e) { //リーダーが読み込んだ時のイベント
      item_count++;
      var dataUrl = reader.result; //リーダークラスが取得した結果を変数に格納
      var add_text='<li class="item"><img src="'+dataUrl+'"><div class="heart_enp" id="heart_'+item_count+'"></div></li>';
      $("#result_list").append(add_text);
    }  

    function file_search(){
  // ファイル名からファイルを取得
       get_path();
    }

function get_path(){
      var path=[];
      var ncmb = new NCMB(apikey, clientkey);
      var test_data = ncmb.DataStore("test");
      // データの条件検索取得（完全一致）
      test_data.equalTo("test_id", "1") // 一行名に検索するフィールド名、二行目にそのフィールド内で検索する具体的なデータ
            .fetchAll() // データベース内の条件に合うデータを全て検索
            .then(function(results){
              for(var i=0;i<2;i++){
                // 検索成功
                var a=results[i]; // 検索結果の配列指定
                path[i]=a.get("path"); // どのテーブル内からどのフィールドのデータを取得するか指定               
                // ダウンロード（データ形式をblobを指定）
                ncmb.File.download(path[i], "blob")
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
            //alert(path);
            //return path;
}

    /*************ここまでテスト**********/