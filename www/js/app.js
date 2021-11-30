/**********変数 ************/
var apikey="7672355577f11839b1a72bce66af03d2a68e6f119b00178a4ecc8bc08daaaf68";
var clientkey="a35cc47c9dc52261c4590dae8f7d466eb3cdf83aa729c0443933ae8cb1d95b13";
var ncmb = new NCMB(apikey, clientkey);
var path=[];  //画像ファイルを取得するファイル名を入れる配列
var dress_id=[]; // ドレスIDを格納する配列
var fdress_id=[];
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
var username = $("#new_username").val();
  var mailaddress = null;
  var mailaddress_test = null;
  var password = null;
  var password_test = null;
  var higth = null;
  var bmw_B = null;
  var bmw_W = null;
  var bmw_H = null;
var img_path_pc="/image/";  //PC時の画像パス
var img_path_phon="/www/image/";  //スマートフォン時の画像パス
var menu_flag=true; // レンタル、式場の切り替えフラグ
var tab_name; // (いいね画面の)現在の選択中のタブを格納する
/********ここまで変数部 *****/
 
/***共通部分*****************************************************/
$(document).ready(function(){
  var current_file=location.pathname; // 現在のhtmlファイル取得
  current_footer(current_file);
  if(current_file==="/www/list.html" || current_file==="/list.html"){
    file_search();
    search_sum();
  }
  else if(current_file==="/www/favorite.html" || current_file==="/favorite.html"){
    favorite_search();
  }
  else if(current_file==="/www/search.html" || current_file==="/search.html"){
    new_imgf();
  }
  else if(current_file==="/www/recommend.html" || "/recommnd"){
    recommend();
  }
});

  $(".back").click(function(){
  window.location.href = "my-page.html";
  });
  $("#ok-button").click(function(){
  window.location.href = "my-page.html";
  })

  function mobile_check(){  // 使っている端末を確認
      const ua = navigator.userAgent;
      if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {
          // スマートフォン
          return img_path_phon;
      } else if (ua.indexOf('iPad') > -1 || ua.indexOf('Android') > -1) {
          // タブレット
          return img_path_phon;
      } else {
          // PC
          return img_path_pc;
      }
    }

    $("body").on('click','.item_img',function(){
      var element_id=$(this).attr('id'); // いいねを押した要素のidを取得
      modal_create(element_id);
    });
    $("body").on('click','.re_img_1',function(){
      var element_id=$(this).attr('id'); 
      modal_create(element_id);
    });
    $("body").on('click','.re_img_2',function(){
      var element_id=$(this).attr('id'); 
      modal_create(element_id);
    });

    $("body").on('click','.js-modal-close',function(){
      $('.js-modal').fadeOut();
      return false;
    });
    $("body").on('click','.js-modal-close_2',function(){
      $('.js-modal').fadeOut();
      return false;
    });

  function modal_create(element_id){
      var item_name=$("#"+element_id).nextAll("div");
      item_name=item_name.attr("name")
      var item_name_sprite = item_name.split(',');
        //nameからとってきたテクストを，で分断。[0]は画像ファイル名、[1]はドレスID
      var int_id=parseInt(item_name_sprite[1]); //ドレスIDをintに変換

      var dress_item = ncmb.DataStore("test");
      dress_item.equalTo("dress_id",int_id).fetchAll().then(function(results){
          var item=results[0];
          var item_set=[];
          item_set[0]=item.name;
          item_set[1]=item.dress_store;
          item_set[2]=item.dress;
          create_html(item_name_sprite[0],item_set);
        });
      $('.js-modal').fadeIn();
      return false;
  }

  function create_html(src,item_set){
    $(".modal_con").remove();
    var ele_text='<div class="modal_con"><img src="/image/'+src+'" class="modal_img"><div>名前:'+item_set[0]+'<br>式場:'+item_set[1]+'<br>ドレス:'+item_set[2]+'</div><div class="js-modal-close_2">閉じる</div></div>';
            
    $(".modal__content").append(ele_text);
  }

  function current_footer(current_name){
    switch(current_name){
      case "/www/recommend.html":
        $('#recommend_footer').css('background-color','#68c3c5');
        break;
      case "/recommend.html":
          $('#recommend_footer').css('background-color','#68c3c5');
        break;
      case "/www/search.html":
        $('#search_footer').css('background-color','#68c3c5');
        break;
      case "/search.html":
          $('#search_footer').css('background-color','#68c3c5');
        break;
        case "/www/list.html":
        $('#search_footer').css('background-color','#68c3c5');
        break;
      case "/list.html":
          $('#search_footer').css('background-color','#68c3c5');
        break;
      case "/www/favorite.html":
        $('#favorite_footer').css('background-color','#68c3c5');
        break;
      case "/favorite.html":
        $('#favorite_footer').css('background-color','#68c3c5');
        break;
      case "/www/my-page.html":
        $('#my-page_footer').css('background-color','#68c3c5');
        break;
      case "/my-page.html":
        $('#my-page_footer').css('background-color','#68c3c5');
        break;

    }
  }

/***ここまで共通部分*****************************************************/

/***新規作成画面******************************************/

  //画面遷移 
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
 
/***ここまで新規作成画面***********************************/
 
/***おすすめ**********************************************/
 
  function recommend(){
    for(var i=0;i<7;i++){ //いいねフラグ初期化
      flag[i]=false;
    }
    item_count=0;
    var img_text=mobile_check();
    var get_data = ncmb.DataStore("test");
    var saveData_2 = ncmb.DataStore("favorite");
    get_data.order('dress_id',false).fetchAll().then(function(results){  // ドレスの画像取得
      saveData_2.fetchAll().then(function(results_2){ 
        for(var i=0;i<results.length;i++){
          var a=results[i]; 
          path[i]=a.get("path");    // 画像ファイル名取得
          dress_id[i]=a.get("dress_id"); // ドレスＩＤ取得
          for(var z=0;z<results_2.length;z++){
            var res=results_2[z];
            if(dress_id[i]===res.dress_id){  // 同じIDならいいね判定をつける           
              flag[i]=true;
            }
          }
        }
        sort(dress_id,path,flag);
        for(var i=0;i<6;i++){
          if(i%2===0){
          var add_text="";
          }
          if(i===0){
            if(flag[item_count]){///いいねがあるかどうか
              add_text='<img src="'+img_text+path[item_count]+'" id="item_'+item_count+'" class="re_img_1"><div class="heart" id="heart_'+item_count+'" name="'+path[item_count]+','+dress_id[item_count]+'"></div>';
            }else{
              add_text='<img src="'+img_text+path[item_count]+'" id="item_'+item_count+'" class="re_img_1"><div class="heart_enp" id="heart_'+item_count+'" name="'+path[item_count]+','+dress_id[item_count]+'"></div>';
            }
            item_count++;
            $("#top-img").append(add_text);  
            var add_text="";
          }
          if(flag[item_count]){///いいねがあるかどうか
            add_text+='<th class="re_td"><img src="'+img_text+path[item_count]+'" id="item_'+item_count+'" class="re_img_2"><div class="heart" id="heart_'+item_count+'" name="'+path[item_count]+','+dress_id[item_count]+'"></div></th>';
          }else{
            add_text+='<th class="re_td"><img src="'+img_text+path[item_count]+'" id="item_'+item_count+'" class="re_img_2"><div class="heart_enp" id="heart_'+item_count+'" name="'+path[item_count]+','+dress_id[item_count]+'"></div></th>';
          }
          item_count++;
          if((i+1)%2===0){  
            var tr_id=parseInt(i/2);
            $("#tr_"+tr_id).append(add_text);
          }
        }
      })
      .catch(function(error){
          alert(error);
      });            
    })
    .catch(function(error){
      alert(error);
    });
  }

function sort(array_1,array_2,array_3){
  for(var i = (array_1.length - 1); 0 < i; i--){
    // 0〜(i+1)の範囲で値を取得
    var r = Math.floor(Math.random() * (i + 1));
    // 要素の並び替えを実行
    var tmp_1 = array_1[i];
    array_1[i] = array_1[r];
    array_1[r] = tmp_1;
    var tmp_2 = array_2[i];
    array_2[i] = array_2[r];
    array_2[r] = tmp_2;
    var tmp_3 = array_3[i];
    array_3[i] = array_3[r];
    array_3[r] = tmp_3;
  }
}

/***ここまでおすすめ***********************************/

/***検索画面******************************************/
 
  //ポップアップ開く
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
  
  //ポップアップ閉じる
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
  
  //ポップアップ中身
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
  
  //検索ボタンを押した時の検索条件保持
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

  function new_imgf(){ // imgフラグ初期化
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


  function file_search(){
    for(var i=0;i<100;i++){ //いいねフラグ初期化
      flag[i]=false;
    }
    j=0; // いいねフラグindex
    get_path();
  }

  function get_path(){
    var img_text=mobile_check();
    var get_where = ncmb.DataStore("test_table"); 
    get_where.fetchAll() .then(function(objects){ // 条件を取得
      var object = objects[0];         
      where[0]=object.get("rental_shop"); // 検索条件取得
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

      if(where_check(where)){ // 検索条件が選択されているかどうか
          get_data.order('dress_id',false).fetchAll().then(function(results){  // ドレスの画像取得
          for(var i=0;i<results.length;i++){
            var a=results[i]; 
            path[i]=a.get("path");    // 画像ファイル名取得
            dress_id[i]=a.get("dress_id"); // ドレスＩＤ取得
            var saveData_2 = ncmb.DataStore("favorite"); // いいねを判定するためにいいねデータベースを開く
            saveData_2.fetchAll().then(function(results_2){ 
              for(var i=0;i<results.length;i++){
                for(var z=0;z<results_2.length;z++){
                  var res=results_2[z];
                  if(dress_id[i]===res.dress_id){  // 同じIDならいいね判定をつける           
                    flag[i]=true;
                  }
                }
              }
              var add_text="";
              item_count++;
              if(flag[item_count-1]){///いいねがあるかどうか
                add_text='<li class="item"><img src="'+img_text+path[item_count-1]+'" id="item_'+item_count+'" class="item_img"><div class="heart" id="heart_'+item_count+'" name="'+path[item_count-1]+','+dress_id[item_count-1]+'"></div></li>';
              }else{
                add_text='<li class="item"><img src="'+img_text+path[item_count-1]+'" id="item_'+item_count+'" class="item_img"><div class="heart_enp" id="heart_'+item_count+'" name="'+path[item_count-1]+','+dress_id[item_count-1]+'"></div></li>';
              }
              $("#result_list").append(add_text);
              $("#search_sum").text(item_count + "件");
              })
            .catch(function(error){
              //alert(error);
              //j++;
            });
          }
                  
        })
        .catch(function(error){
          alert(error);
        });    
      }

      else{  // 条件がある場合
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

        get_data.or([subquery1, subquery2,subquery3,subquery4, subquery5,subquery6,subquery7, subquery8,subquery9,subquery10, subquery11,subquery12,subquery13,subquery14]).fetchAll() .then(function(results){     // ドレスの画像取得
          for(var i=0;i<results.length;i++){ // ここからの処理は上に同じ
            var a=results[i]; 
            path[i]=a.get("path");    
            dress_id[i]=a.get("dress_id");
            var saveData_2 = ncmb.DataStore("favorite");
            saveData_2.fetchAll().then(function(results_2){ // いいね判定
              for(var i=0;i<results.length;i++){
                for(var z=0;z<results_2.length;z++){
                  var res=results_2[z];
                  if(dress_id[i]===res.dress_id){               
                    flag[i]=true;
                  }
                }
              }
              var add_text="";
              item_count++;
              if(flag[item_count-1]){
                add_text='<li class="item"><img src="'+img_text+path[item_count-1]+'" id="item_'+item_count+'" class="item_img"><div class="heart" id="heart_'+item_count+'" name="'+path[item_count-1]+','+dress_id[item_count-1]+'"></div></li>';
              }else{
                add_text='<li class="item"><img src="'+img_text+path[item_count-1]+'" id="item_'+item_count+'" class="item_img"><div class="heart_enp" id="heart_'+item_count+'" name="'+path[item_count-1]+','+dress_id[item_count-1]+'"></div></li>';
              }
              $("#result_list").append(add_text);
              $("#search_sum").text(item_count + "件");
              })
            .catch(function(error){
              //alert(error);
              //j++;
            });
          }             
        })
      }
    })
    .catch(function(error){
      alert(error);
    }); 

    function where_check(where){ // 入力された条件check
      var enp=0;
      for(var i=0;i<where.length;i++){
        where[i]=where[i].trim(); // 空白削除
        if(where[i]==="ーーー"){
          enp++; // 検索条件が選択されてない場合にカウント
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
    var item_name_sprite = item_name.split(',');//nameからとってきたテクストを，で分断。[0]は画像ファイル名、[1]はドレスID
    var int_id=parseInt(item_name_sprite[1]); //ドレスIDをintに変換
    var Favorite = ncmb.DataStore("favorite");
    var favorite = new Favorite();
    favorite.set("user_id","test").set("path",item_name_sprite[0]).set("dress_id",int_id).save();
  });
 
  //いいね取消し
  $("body").on('click','.heart',function(){
    var element_id=$(this).attr('id');
    $("#"+element_id).removeClass('heart');
    $("#"+element_id).addClass('heart_enp');
    var item_name=$(this).attr('name');
    var item_name_sprite = item_name.split(',');
    var int_id=parseInt(item_name_sprite[1]);
    var Favorite = ncmb.DataStore("favorite");
    Favorite.equalTo("dress_id", int_id) 
    .fetchAll() 
    .then(function(results){
      var object=results[0];
      //alert(object);
      object.delete();   // いいねデータ削除          
    })
    .catch(function(error){
      alert(error);
    });
  });

  function favorite_search(){
    var favorite_path=[];
    var img_text=mobile_check();
    var favorite_test = ncmb.DataStore("favorite");
    var fdress_store = ncmb.DataStore("test");

    if(menu_flag){
     $('#dress_store_tab').attr('id', 'dress_store_n');
     tab_name="favorite_tab_0_n";
    }
    else{
      tab_name="favorite_tab_o_n";
    }
    favorite_test
    .equalTo("user_id", "test")
    .fetchAll() 
    .then(function(results){
      for(var i=0;i<results.length;i++){
        var a=results[i];
        fdress_id[i]=a.dress_id;
        favorite_path[i]=a.path;
            item_count++;
            var add_text='<li class="item"><img src="'+img_text+favorite_path[item_count-1]+'" id="item_'+item_count+'" class="item_img"><div class="heart" id="heart_'+item_count+'" name="'+favorite_path[item_count-1]+','+fdress_id[item_count-1]+'"></div></li>';
            $("#result_list").append(add_text);
            $("#search_sum").text(item_count + "件");
        }

      fdress_store.fetchAll() .then(function(results){ //タブバーの表示
        for(var i=0;i<fdress_id.length;i++){
          for(var j=0;j<results.length;j++){
            var aa=results[j];
            if(fdress_id[i]===aa.dress_id){
              switch(aa.dress_store){
                case "ラヴィール岡山":
                  $('#favorite_tab_1').attr('id', 'favorite_tab_1_n');
                  break;
                case "クラブハウスセフィロト":
                  $('#favorite_tab_2').attr('id', 'favorite_tab_2_n');
                  break;
                case "ANAクラウンプラザホテル岡山":
                  $('#favorite_tab_3').attr('id', 'favorite_tab_3_n');
                  break;
                case "THE MAGRITTE":
                  $('#favorite_tab_4').attr('id', 'favorite_tab_4_n');
                  break;
                case "THE STYLE":
                  $('#favorite_tab_5').attr('id', 'favorite_tab_5_n');
                  break;
              }
            }
            if(fdress_id[i]===aa.dress_id){
              switch(aa.rental_shop){
                case "ブライダル三松岡山店":
                  $('#favorite_tab_a').attr('id', 'favorite_tab_a_n');
                  break;
                case "ブライダルサロンNISHIKIYA":
                  $('#favorite_tab_b').attr('id', 'favorite_tab_b_n');
                  break;
                case "チュチュ岡山":
                  $('#favorite_tab_c').attr('id', 'favorite_tab_c_n');
                  break;
              }
            }
          }
        }
      })
      .catch(function(err) {
        alert(err);
      })
    })
    .catch(function(err) {
      alert(err);
    })
              

  }

  $(".tab_list").click(function(){
    $("#"+tab_name+"_color").attr("id",tab_name);
    tab_name=$(this).attr("id");
    $("#"+tab_name).attr("id",tab_name+"_color");

    var img_text=mobile_check();
    var tab_text=$(this).text();
    $('.item').remove();
    item_count=0;

    if(tab_text==="全て"){
      favorite_search();
    }else{
      var favorite_test = ncmb.DataStore("favorite");
      var fdress_store = ncmb.DataStore("test");

      if(menu_flag){
        favorite_test
        .equalTo("user_id", "test")
        .fetchAll() 
        .then(function(results){
          var store=[];
          var store_id=[];
          var idx=0;
            fdress_store.equalTo("dress_store",tab_text).fetchAll() .then(function(results_2){
              for(var i=0;i<results.length;i++){
                var item=results[i];
                for(var z=0;z<results_2.length;z++){
                  var item_2=results_2[z];
                  if(item.dress_id===item_2.dress_id){
                    store[idx]=item_2.path;
                    store_id[idx++]=item_2.dress_id;
                  }
                }
              }
            for(var i=0;i<store.length;i++){
                  item_count++;
                  var add_text='<li class="item"><img src="'+img_text+store[item_count-1]+'" id="item_'+item_count+'" class="item_img"><div class="heart" id="heart_'+item_count+'" name="'+store[item_count-1]+','+store_id[item_count-1]+'"></div></li>';
                  $("#result_list").append(add_text);
                  $("#search_sum").text(item_count + "件");
            }
            
            }).catch(function(err) {
            alert(err);
          })
        });
      }
      else{
        favorite_test
        .equalTo("user_id", "test")
        .fetchAll() 
        .then(function(results){
          var store=[];
          var store_id=[];
          var idx=0;
            fdress_store.equalTo("rental_shop",tab_text).fetchAll() .then(function(results_2){
              for(var i=0;i<results.length;i++){
                var item=results[i];
                for(var z=0;z<results_2.length;z++){
                  var item_2=results_2[z];
                  if(item.dress_id===item_2.dress_id){
                    store[idx]=item_2.path;
                    store_id[idx++]=item_2.dress_id;
                  }
                }
              }
            for(var i=0;i<store.length;i++){
                  item_count++;
                  var add_text='<li class="item"><img src="'+img_text+store[item_count-1]+'" id="item_'+item_count+'" class="item_img"><div class="heart" id="heart_'+item_count+'" name="'+store[item_count-1]+','+store_id[item_count-1]+'"></div></li>';
                  $("#result_list").append(add_text);
                  $("#search_sum").text(item_count + "件");
            }
            
            
            }).catch(function(err) {
            alert(err);
          })
        });
      }
    }
  });

  $("#change_push").click(function(){
    if(menu_flag){
      $("#"+tab_name+"_color").attr("id",tab_name);
      tab_name="favorite_tab_o_n";
      $("#"+tab_name).attr("id",tab_name+"_color");
      $("#change_push").text("式場");
      $('#dress_store_n').attr('id', 'dress_store_tab');
      $('#rental_shop_tab').attr('id', 'rental_shop_n');
      all_favorite();
      menu_flag=false;
    }
    else{
      $("#"+tab_name+"_color").attr("id",tab_name);
      tab_name="favorite_tab_0_n";
      $("#"+tab_name).attr("id",tab_name+"_color");
      $("#change_push").text("レンタル");
      $('#dress_store_tab').attr('id', 'dress_store_n');
      $('#rental_shop_n').attr('id', 'rental_shop_tab');
      all_favorite();
      menu_flag=true;
    }
  });

  function all_favorite(){
    $('.item').remove();
    var img_text=mobile_check();
    var favorite_path=[];
    item_count=0;
    var favorite_test = ncmb.DataStore("favorite");
    favorite_test
    .equalTo("user_id", "test")
    .fetchAll() 
    .then(function(results){
      for(var i=0;i<results.length;i++){
        var a=results[i];
        fdress_id[i]=a.dress_id;
        favorite_path[i]=a.path;
            item_count++;
            var add_text='<li class="item"><img src="'+img_text+favorite_path[item_count-1]+'" id="item_'+item_count+'" class="item_img"><div class="heart" id="heart_'+item_count+'" name="'+favorite_path[item_count-1]+','+fdress_id[item_count-1]+'"></div></li>';
            $("#result_list").append(add_text);
            $("#search_sum").text(item_count + "件");
        }
    });
  }

/***ここまでいいね画面*****************************************************/
 
/***マイページ*****************************************************/
 
 
  
 
 
/***ここまでマイページ*****************************************************/
 
/***会員情報変更画面*****************************************************/
 
  //画面遷移
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
 
  //画面遷移
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
 
  //画面遷移
  $("#login_higth").click(function(){
    $(".display_login").css("display","none");
    $(".display_higth1").css("display","block");
  });

  /*保存ボタン遷移*/
  $("#higth_button").click(function(){
    $(".display_higth1").css("display","none");
    $(".display_higth2").css("display","block");
  });

 /***ここまで身長/BWH変更画面******************************************/
 
 
/***メールアドレス画面************************************************/

  //画面遷移
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

  //画面遷移
  $("#logout-button1").click(function(){
  $(".display_logout1").css("display","none");
  $(".display_logout2").css("display","block");
  });
 
/***ここまでlogout画面*****************************************************/
 
/***退会画面*****************************************************/

  //画面遷移
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

/***************ログイン画面************************/

/*function login_user(){
  //入力フォームの取得
  var mailAddress = $("#new_mailadd").val();
  var password = $("#new_password").val();

  ncmb.User.login(mailAddress,password)
      .then(function(user){
        alert("ログイン成功");
        currentLoginUser = ncmb.User.getCurrentUser();
        $.mobile.changePage('#DetailPage');
    })
    .catch(function(error) {
        alert("ログイン失敗！次のエラー発生: " + error);
      })
}

/*******ログアウト******/

/*function logout(){
  ncmb.User.logout();
  alert('ログアウト成功');
  currentLoginUser = null;
  $.mobile.changePage('#LoginPage');
}


/**********************新規登録画面*****************/

  /**/var currentLoginUser; //現在ログイン中ユーザー

//会員登録
function onRegisterBtn()
{
  //個人情報１の入力フォームの取得
  var username = $("#new_username").val();
  var mailaddress = $("#new_mailadd").val();
  var password = $("#new_password").val();
  //個人情報２の入力フォームの取得
  var higth = $("#my_higthbox").val();
  var bmw_B = $("#bmw_b").val();
  var bmw_W = $("#bmw_w").val();
  var bmw_H = $("#bmw_h").val();

  var user = new ncmb.User();
  // 新規登録
  user.set("userName", username)
      .set("mailAddress", mailaddress)
      .set("password", password)
      .set("higth", higth)
      .set("bust", bmw_b)
      .set("hips", bmw_w)
      .set("waist", bmw_h);

  user.signUpByAccount()
      .then(function(user){
          alert("新規登録に成功");
          currentLoginUser = ncmb.User.getCurrentUser();
          $.mobile.changePage('#DetailPage');
      })
      .catch(function(error) {
          alert("新規登録に失敗！次のエラー発生：" + error);
      })
}

//メールアドレスの正規表現
$("#login_with").click(function(){
  var address = $("#my_mailbox").val();
  var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;
  if (!reg.test(address)) {
    alert("メールアドレスを正しく入力してください");
  } 
});

//再入力したものとの判定
function CheckMail() {
    var mail = document.getElementById("new_mialadd").value; //メールフォームの値を取得
    var mailConfirm = document.getElementById("new_mialadd_test").value; //メール確認用フォームの値を取得
    // パスワードの一致確認
    if (mail != mailConfirm){
      alert("入力したメールアドレスが一致していません"); // 一致していなかったら、エラーメッセージを表示する
    }
}

//メールアドレスのサジェスト機能
$(function() {
    var availableTags = [
        "yahoo.co.jp",
        "gmail.com",
        "icloud.com",
        "ezweb.ne.jp",
        "softbank.ne.jp",
        "i.softbank.jp",
        "outlook.jp",
        "outlook.com",
        "docomo.ne.jp"
    ];
    function extractLast( val ) {
        if (val.indexOf("@")!=-1){
            var tmp=val.split("@");
            console.log(tmp[tmp.length-1]);
            return tmp[tmp.length-1];
        }
        console.log("returning empty");
        return "";
    }

    $( ".domain-autocomplete" )
        // don't navigate away from the field on tab when selecting an item
        .bind( "keydown", function( event ) {
            if ( event.keyCode === $.ui.keyCode.TAB &&
                    $( this ).data( "autocomplete" ).menu.active ) {
                event.preventDefault();
            }
        })
        .autocomplete({
            minLength: 1,
            source: function( request, response ) {
                        var mail = extractLast(request.term);
                        if(mail.length<1){return;}
                        var matcher = new RegExp( "^" + mail, "i" );
                        response( $.grep( availableTags, function( item ){
                            return matcher.test( item );
                        }));
             },
            focus: function() {
                // prevent value inserted on focus
                return false;
            },

            select: function( event, ui ) {
    this.value = this.value.substring(0, this.value.indexOf('@') + 1) + ui.item.value;
    return false;
}
        });
});