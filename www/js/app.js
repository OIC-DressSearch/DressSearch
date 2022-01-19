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
var img_path_pc="/image/";
var img_path_phon="/www/image/";
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
var reserve_shop=[];
var reserve_index=0;
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
  else if(current_file==="/www/recommend.html" || current_file==="/recommend.html"){
    recommend();
  }
  else if(current_file==="/www/info.html" || current_file==="/info.html"){
    info();
  }
  else if(current_file==="/www/user_list.html" || current_file==="/user_list.html"){
    user_list();
  }
  else if(current_file==="/www/user_dress.html" || current_file==="/user_dress.html"){
    user_dress();
  }
  else if(current_file==="/www/dress_list.html" || current_file==="/dress_list.html"){
    dress_list();
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
    var img_text=mobile_check();
    var ele_text='<div class="modal_con"><img src="'+img_text+src+'" class="modal_img"><div>名前:'+item_set[0]+'<br>式場:'+item_set[1]+'<br>ドレス:'+item_set[2]+'</div><div class="js-modal-close_2">閉じる</div></div>';
            
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
      case "/mail-address.html":
        $('#my-page_footer').css('background-color','#68c3c5');
        break;
      case "/pass.html":
        $('#my-page_footer').css('background-color','#68c3c5');
        break;
      case "/higth.html":
        $('#my-page_footer').css('background-color','#68c3c5');
        break;
      case "/info.html":
        $('#my-page_footer').css('background-color','#68c3c5');
        break;
      case "/logout.html":
        $('#my-page_footer').css('background-color','#68c3c5');
        break;
      case "/withdrawal.html":
        $('#my-page_footer').css('background-color','#68c3c5');
        break;

    }
  }

/***ここまで共通部分*****************************************************/

/***新規作成画面******************************************/

  //画面遷移  


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
    var currentLoginUser = ncmb.User.getCurrentUser();
    var img_text=mobile_check();
    var get_data = ncmb.DataStore("test");
    var saveData_2 = ncmb.DataStore("favorite");
    get_data.order('dress_id',false).fetchAll().then(function(results){  // ドレスの画像取得
      saveData_2.equalTo('user_id',currentLoginUser.userName).fetchAll().then(function(results_2){ 
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
    for(var i=0;i<14;i++){
      where[i]=[];
    }
    j=0; // いいねフラグindex
    get_path();
  }

  function get_path(){
    var img_text=mobile_check();
    var currentLoginUser = ncmb.User.getCurrentUser();
    var get_where = ncmb.DataStore("test_table"); 
    var arr = [];
    get_where.fetchAll() .then(function(objects){ // 条件を取得
      var object = objects[0];         
      where[0][0]=object.get("rental_shop"); // 検索条件取得
      arr[0]=object.get("rental_shop");
      where[1][0]=object.get("dress_store");
      arr[1]=object.get("dress_store");
      where_split(2,object.get("dress"));
      arr[2]=object.get("dress");
      where[3][0]=object.get("dress_color");
      arr[3]=object.get("dress_color");
      where[4][0]=object.get("dress_image");
      arr[4]=object.get("dress_image");
      where_split(5,object.get("line"));
      arr[5]=object.get("line");
      where_split(6,object.get("neck_line"));
      arr[6]=object.get("neck_line");
      where_split(7,object.get("sleeve"));
      arr[7]=object.get("sleeve");
      where_split(8,object.get("waist_line"));
      arr[8]=object.get("waist_line"); 
      where_split(9,object.get("skirt"));
      arr[9]=object.get("skirt");
      where_split(10,object.get("skirt_length"));
      arr[10]=object.get("skirt_length");
      where_split(11,object.get("trane"));
      arr[11]=object.get("trane");
      where_split(12,object.get("bodice"));
      arr[12]=object.get("bodice");
      where[13][0]=object.get("dress_size");
      arr[13]=object.get("dress_size");

      var get_data = ncmb.DataStore("test");
      if(where_check(where)){ // 検索条件が選択されているかどうか
          get_data.order('dress_id',false).fetchAll().then(function(results){  // ドレスの画像取得
          for(var i=0;i<results.length;i++){
            var a=results[i]; 
            path[i]=a.get("path");    // 画像ファイル名取得
            dress_id[i]=a.get("dress_id"); // ドレスＩＤ取得
            var saveData_2 = ncmb.DataStore("favorite"); // いいねを判定するためにいいねデータベースを開く
            saveData_2.equalTo('user_id',currentLoginUser.userName).fetchAll().then(function(results_2){ 
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
        var subquery1 = get_data.equalTo("rental_shop", where[0][0]);
        var subquery2 = get_data.equalTo("dress_store", where[1][0]);
        var subquery3 =set_subquery(3);
        for(var i=0;i<where[2].length;i++){
          subquery3[i]=get_data.equalTo("dress", where[2][i]);
        } 
        var subquery4 = get_data.equalTo("dress_color", where[3][0]);
        var subquery5 = get_data.equalTo("dress_image", where[4][0]);
        var subquery6 = set_subquery(6);
        for(var i=0;i<where[5].length;i++){
          subquery6[i]=get_data.equalTo("line", where[5][i]);
        }
        var subquery7 = set_subquery(7);
        for(var i=0;i<where[6].length;i++){
          subquery7[i]=get_data.equalTo("neck_line", where[6][i]);
        }
        var subquery8 = set_subquery(8);
        for(var i=0;i<where[7].length;i++){
          subquery8[i]=get_data.equalTo("sleeve", where[7][i]);
        }
        var subquery9 = set_subquery(9);
        for(var i=0;i<where[8].length;i++){
          subquery9[i]=get_data.equalTo("waist_line", where[8][i]);
        }
        var subquery10 = set_subquery(10);
        for(var i=0;i<where[9].length;i++){
          subquery10[i]=get_data.equalTo("skirt", where[9][i]);
        }
        var subquery11 = set_subquery(11);
        for(var i=0;i<where[10].length;i++){
          subquery11[i]=get_data.equalTo("skirt_length", where[10][i]);
        }
        var subquery12 = set_subquery(12);
        for(var i=0;i<where[11].length;i++){
          subquery12[i]=get_data.equalTo("trane", where[11][i]);
        }
        var subquery13 = set_subquery(13);
        for(var i=0;i<where[12].length;i++){
          subquery13[i]=get_data.equalTo("bodice", where[12][i]);
        }
        var subquery14 = get_data.equalTo("dress_size", where[13][0]);


        get_data.or([subquery1, subquery2,subquery3[0],subquery3[1],subquery3[2],subquery4, subquery5,subquery6[0],subquery6[1],subquery6[2],subquery6[3],subquery6[4],subquery6[5],subquery7[0],subquery7[1],subquery7[2],subquery7[3],subquery7[4],subquery7[5],subquery7[6],subquery7[7],subquery7[8],subquery7[9],subquery7[10],subquery7[11],subquery7[12],subquery7[13],subquery7[14],subquery8[0],subquery8[1],subquery8[2],subquery8[3],subquery8[4],subquery8[5],subquery8[6],subquery8[7],subquery8[8],subquery8[9],subquery8[10],subquery8[11],subquery8[12],subquery8[13],subquery8[14],subquery9[0],subquery9[1],subquery9[2],subquery9[3],subquery9[4],subquery9[5],subquery9[6],subquery9[7],subquery9[8],subquery9[9],subquery10[0],subquery10[1],subquery10[2],subquery10[3],subquery10[4],subquery10[5],subquery10[6],subquery10[7],subquery10[8],subquery10[9],subquery11[0],subquery11[1],subquery11[2],subquery11[3],subquery11[4],subquery11[5],subquery11[6],subquery11[7],subquery11[8],subquery12[0],subquery12[1],subquery12[2],subquery12[3],subquery12[4],subquery12[5],subquery12[6],subquery12[7],subquery13[0],subquery13[1],subquery13[2],subquery13[3],subquery13[4],subquery14]).fetchAll() .then(function(results){     // ドレスの画像取得
          for(var i=0;i<results.length;i++){ // ここからの処理は上に同じ
            var a=results[i]; 
            path[i]=a.get("path");    
            dress_id[i]=a.get("dress_id");
            var saveData_2 = ncmb.DataStore("favorite");
            saveData_2.equalTo('user_id',currentLoginUser.userName).fetchAll().then(function(results_2){ // いいね判定
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

    function where_check(arr){ // 入力された条件check
      var enp=0;
      for(var i=0;i<arr.length;i++){
        arr[i][0]=arr[i][0].trim(); // 空白削除
        if(arr[i][0]==="ーーー"){
          enp++; // 検索条件が選択されてない場合にカウント
        }
      }
      if(enp===arr.length){
        return true;
      }
      else{
        return false;
      }
    }
  }

  function where_split(index,obj){
    var text=obj.split(",");
    for(var i=0;i<text.length;i++){
      where[index][i]=text[i];
    }
  }

  function set_subquery(index){
    var get_data = ncmb.DataStore("test");
    var query=[];
    switch(index){
      case 3:
        for(var i=0;i<3;i++){
          query[i]=get_data.equalTo("dress", "---");
        }
        break;
      case 6:
        for(var i=0;i<6;i++){
          query[i]=get_data.equalTo("line", "---");
        }
        break;
      case 7:
        for(var i=0;i<15;i++){
          query[i]=get_data.equalTo("neck_line", "---");
        }
        break;
      case 8:
        for(var i=0;i<15;i++){
          query[i]=get_data.equalTo("sleeve", "---");
        }
        break;
      case 9:
        for(var i=0;i<10;i++){
          query[i]=get_data.equalTo("waist_line", "---");
        }
        break;
      case 10:
        for(var i=0;i<14;i++){
          query[i]=get_data.equalTo("skirt", "---");
        }
        break;
      case 11:
        for(var i=0;i<9;i++){
          query[i]=get_data.equalTo("skirt_length", "---");
        }
        break;
      case 12:
        for(var i=0;i<8;i++){
          query[i]=get_data.equalTo("bodice", "---");
        }
        break;
      case 13:
        for(var i=0;i<6;i++){
          query[i]=get_data.equalTo("dress_size", "---");
        }
        break;
    }
    return query;
  }


/***ここまで一覧画面*****************************************************/
 
/***いいね画面*****************************************************/
 
  //いいね
  $("body").on('click','.heart_enp',function(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var element_id=$(this).attr('id'); // いいねを押した要素のidを取得
    $("#"+element_id).removeClass('heart_enp'); 
    $("#"+element_id).addClass('heart');
    var item_name=$(this).attr('name'); 
    var item_name_sprite = item_name.split(',');//nameからとってきたテクストを，で分断。[0]は画像ファイル名、[1]はドレスID
    var int_id=parseInt(item_name_sprite[1]); //ドレスIDをintに変換
    var Favorite = ncmb.DataStore("favorite");
    var favorite = new Favorite();
    favorite.set("user_id",currentLoginUser.userName).set("path",item_name_sprite[0]).set("dress_id",int_id).save();
  });
 
  //いいね取消し
  $("body").on('click','.heart',function(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var element_id=$(this).attr('id');
    $("#"+element_id).removeClass('heart');
    $("#"+element_id).addClass('heart_enp');
    var item_name=$(this).attr('name');
    var item_name_sprite = item_name.split(',');
    var int_id=parseInt(item_name_sprite[1]);
    var Favorite = ncmb.DataStore("favorite");
    var subquery1 = Favorite.equalTo("user_id", currentLoginUser.userName);
    var subquery2 = Favorite.equalTo("dress_id", int_id);
    Favorite.or([subquery1,subquery2]) 
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
    var currentLoginUser = ncmb.User.getCurrentUser();
    var favorite_path=[];
    var img_text=mobile_check();
    var favorite_test = ncmb.DataStore("favorite");
    var fdress_store = ncmb.DataStore("test");
    var reserve = ncmb.DataStore("Reserve");
    reserve.equalTo("user_name",currentLoginUser.userName).fetchAll().then(function(results){
      $("#none").text("1");
    }).catch(function(err) {
      $("#none").text("0");
    })
    if(menu_flag){
     $('#dress_store_tab').attr('id', 'dress_store_n');
     tab_name="favorite_tab_0_n";
    }
    else{
      tab_name="favorite_tab_o_n";
    }
    favorite_test
    .equalTo("user_id", currentLoginUser.userName)
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

    var currentLoginUser = ncmb.User.getCurrentUser();
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
        .equalTo("user_id", currentLoginUser.userName)
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
        .equalTo("user_id", currentLoginUser.userName)
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

  $("#push").click(function(){
    if($("#none").text()!=1){
      $(".content_1").css("display","block");
      $(".content_2").css("display","none");
      reserve_index=0;
      if($('#favorite_tab_1_n').text()){
        reserve_shop[reserve_index++]=$('#favorite_tab_1_n').text();
      }
      if($('#favorite_tab_2_n').text()){
        reserve_shop[reserve_index++]=$('#favorite_tab_2_n').text();
      }
      if($('#favorite_tab_3_n').text()){
        reserve_shop[reserve_index++]=$('#favorite_tab_3_n').text();
      }
      if($('#favorite_tab_4_n').text()){
        reserve_shop[reserve_index++]=$('#favorite_tab_4_n').text();
      }
      if($('#favorite_tab_5_n').text()){
        reserve_shop[reserve_index++]=$('#favorite_tab_5_n').text();
      }
      if($('#favorite_tab_a_n').text()){
        reserve_shop[reserve_index++]=$('#favorite_tab_a_n').text();
      }
      if($('#favorite_tab_b_n').text()){
        reserve_shop[reserve_index++]=$('#favorite_tab_b_n').text();
      }
      if($('#favorite_tab_c_n').text()){
        reserve_shop[reserve_index++]=$('#favorite_tab_c_n').text();
      }
      $(".rem_select").remove();
      var add_text='<select name="reserve_shop" class="rem_select">';
      for(var i=0;i<reserve_shop.length;i++){
        add_text+='<option>'+reserve_shop[i]+'</option>';
      }  
      add_text+='</select>';
      $("#re_shop_select").append(add_text);
    }
    else{
      $(".content_1").css("display","none");
      $(".content_2").css("display","block");  
      var currentLoginUser = ncmb.User.getCurrentUser();
      var reserve = ncmb.DataStore("Reserve");
      reserve.equalTo("user_name",currentLoginUser.userName).fetchAll().then(function(results){
        var obj = results[0];
        $("#reserve_name_a").text(obj.name);
        $("#reserve_tel_a").text(obj.tel);
        $("#re_shop_con").text(obj.store);
        $("#con_day_1").text(obj.day_1);
        $("#con_day_2").text(obj.day_2);
        $("#con_day_3").text(obj.day_3);
      }).catch(function(err) {
        alert(err);
      })
    }
    $('.modal_reserve').fadeIn();
  });
  $(".reserve_close").click(function(){
    $('.modal_reserve').fadeOut();
  });
  $("#reserve_button").click(function(){
    var re_name = $("#reserve_name").val();
    var re_tel = $("#reserve_name").val();
    var re_shop_name=$('[name=reserve_shop] option:selected').text();
    var re_day_1=$('#reserve_day_1').val();
    var re_day_2=$('#reserve_day_2').val();
    var re_day_3=$('#reserve_day_3').val();
    var currentLoginUser = ncmb.User.getCurrentUser();
    if(confirm("この内容で予約しますか？")){
      var reserve = ncmb.DataStore("Reserve");
      reserve.equalTo("user_name",currentLoginUser.userName).fetchAll().then(function(results){
      var Reserve = results[0];
      Reserve.set("user_name",currentLoginUser.userName).set("store",re_shop_name).set("day_1",re_day_1).set("day_2",re_day_2).set("day_3",re_day_3).set("name",re_name).set("tel",re_tel);
      Reserve.update();
      $('.modal_reserve').fadeOut();
      }).catch(function(err) {
        var Reserve = new reserve();
        Reserve.set("user_name",currentLoginUser.userName).set("store",re_shop_name).set("day_1",re_day_1).set("day_2",re_day_2).set("day_3",re_day_3).set("name",re_name).set("tel",re_tel).save();
        $('.modal_reserve').fadeOut();
        })
    }
  });
  $("#reserve_change").click(function(){
    $(".content_1").css("display","block");
    $(".content_2").css("display","none");
  });

  $("#change_push").click(function(){
    if(menu_flag){
      $("#"+tab_name+"_color").attr("id",tab_name);
      tab_name="favorite_tab_o_n";
      $("#"+tab_name).attr("id",tab_name+"_color");
      $("#change_push").text("式場を表示");
      $('#dress_store_n').attr('id', 'dress_store_tab');
      $('#rental_shop_tab').attr('id', 'rental_shop_n');
      all_favorite();
      menu_flag=false;
    }
    else{
      $("#"+tab_name+"_color").attr("id",tab_name);
      tab_name="favorite_tab_0_n";
      $("#"+tab_name).attr("id",tab_name+"_color");
      $("#change_push").text("レンタルを表示");
      $('#dress_store_tab').attr('id', 'dress_store_n');
      $('#rental_shop_n').attr('id', 'rental_shop_tab');
      all_favorite();
      menu_flag=true;
    }
  });

  function all_favorite(){
    $('.item').remove();
    var currentLoginUser = ncmb.User.getCurrentUser();
    var img_text=mobile_check();
    var favorite_path=[];
    item_count=0;
    var favorite_test = ncmb.DataStore("favorite");
    favorite_test
    .equalTo("user_id", currentLoginUser.userName)
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
    var currentLoginUser = ncmb.User.getCurrentUser();
    var login_name=$("#info_login_name").val();
    var login_pass=$("#info_login_pass").val();
    if(currentLoginUser.userName===login_name && currentLoginUser.password===login_pass){
      $(".display_login").css("display","none");
      $(".display_info1").css("display","block");
      $(".display_login").css("display","none");
      $(".display_admin_info1").css("display","block");
            $(".display_login").css("display","none");
      $(".display_admin_emp1").css("display","block");
    }
    else{
      alert("入力されたアドレスまたはパスワードが違います");
    }
  });
  $("#info_button").click(function(){
    var update_address=$("#update_address").val();
    var update_address_2=$("#update_address_2").val();
    var update_pass=$("#update_pass").val();
    var update_pass_2=$("#update_pass_2").val();
    var update_higth=$("#my_higthbox").val();
    var update_b=$("#bmw_b").val();
    var update_w=$("#bmw_w").val();
    var update_h=$("#bmw_h").val();
    var check_1=address_check(update_address,update_address_2);
    var check_2=pass_check(update_pass,update_pass_2);
    var check_3=input_check(update_higth,1);
    var check_4=input_check(update_b,2);
    var check_5=input_check(update_w,2);
    var check_6=input_check(update_h,2);
    if(check_1 && check_2 && check_3 && check_4 && check_5 && check_6 ){

      $(".display_info1").css("display","none");
      $(".display_info2").css("display","block");
    }
  });

  function info(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var pass=currentLoginUser.password;
    var address=currentLoginUser.mailAddress;
    var pass_rep=replace(pass,true);
    var address_rep=replace(address,false);

    $("#my_name").text(currentLoginUser.userName);
    $("#my_higth").text(currentLoginUser.higth);
    $("#my_bust").text(currentLoginUser.bust);
    $("#my_waist").text(currentLoginUser.waist);
    $("#my_hip").text(currentLoginUser.hips);
    $("#my_pass").text(pass_rep);
    $("#my_mailaddress").text(address_rep);
  }
  $("#info-update").click(function(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var update_name=$("#update_name").val();
    var update_address=$("#update_address").val();
    var update_pass=$("#update_pass").val();
    var update_higth=$("#update_higth").val();
    var update_b=$("#update_b").val();
    var update_w=$("#update_w").val();
    var update_h=$("#update_h").val();

    currentLoginUser
    .set("userName", update_name)
    .set("mailAddress",update_address )
    .set("password", update_pass)
    .set("higth",update_higth)
    .set("bust",update_b)
    .set("waist", update_w)
    .set("hips",update_h)
    .update()
    .then(function(obj) {
        // 更新成功時
      alert("更新成功");
    })
    .catch(function(error) {
        // 更新失敗時
        alert("更新失敗" + error);
    });
    setTimeout(function(){
        window.location.href = "my-page.html"; 
      },500);
  });

  function address_check(str_1,str_2){ // メールアドレスチェック
    var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if(str_1!=str_2){
      alert("再入力されたアドレスが違います");
    }
    else{
      if(reg.test(str_1)){
        return true;
      }
      else{
        alert("入力されたメールアドレスが正しくないです");
      }
    }
  }
  function pass_check(str_1,str_2){ // パスワードcheck
    var reg =/^[a-z\d]{8,100}$/i;
    if(str_1!=str_2){
      alert("再入力されたパスワードが違います");
    }
    else{
      if(reg.test(str_1)){
        return true;
      }
      else{
        alert("入力されたパスワードが正しくないです");
      }
    }
  }

  function input_check(input,f){
    if(isNaN(input)){
      alert("身長、BWHは数字で入力してください");
    }
    if(f===1){
      if(input>300){
        alert("身長の数値が正しくありません");
      }
      else{
        return true;
      }
    }
    else{
      if(input>200){
        alert("BWHの数値が正しくありません");
      }
      else{
        return true;
      }
    
          
    }
  }

  function replace(str,f){  // パスワードとメールアドレスを＊に置き換え
    var rep="";
    if(f){
      for(var i=0;i<str.length;i++){
        rep+="*";
      }
      return rep;
    }
    else{
      var address_2=str.split(/[@.]/);
      for(var i=0;i<address_2.length;i++){
        for(var j=0;j<address_2[i].length;j++){
          rep+="*"
        }
        if(i===0){
          rep+="@";
        }
        else if(i===1){
          rep+="."
        }
      }
      return rep;
    }
  }
 
/***ここまで会員情報変更画面*****************************************************/
 
/***パスワード変更画面*****************************************************/
 
  //画面遷移
  $("#login_pass").click(function(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var login_name=$("#info_login_name").val();
    var login_pass=$("#info_login_pass").val();
    var pass=currentLoginUser.password;
    var pass_rep=replace(pass,true);
    if(currentLoginUser.userName===login_name && currentLoginUser.password===login_pass){
      $("#my_pass").text(pass_rep);
      $(".display_login").css("display","none");
      $(".display_pass1").css("display","block");
    }
    else{
      alert("入力されたアドレスまたはパスワードが違います");
    }
  });
  $("#pass_button").click(function(){
    var update_pass=$("#update_pass").val();
    var update_pass_2=$("#update_pass_2").val();
    var check_2=pass_check(update_pass,update_pass_2);
    if(check_2){
      var currentLoginUser = ncmb.User.getCurrentUser();
    var update_pass=$("#update_pass").val();
    currentLoginUser
    .set("password", update_pass)
    .update()
    .then(function(obj) {
      // 更新成功時
      $(".display_pass1").css("display","none");
      $(".display_pass2").css("display","block");
    })
    .catch(function(error) {
        // 更新失敗時
        alert("更新失敗" + error);
    });
    }
  });
 
/***ここまでパスワード変更画面*****************************************************/
 
/***身長/BWH変更画面*****************************************************/
 
  //画面遷移
  $("#login_higth").click(function(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var login_name=$("#info_login_name").val();
    var login_pass=$("#info_login_pass").val();
    if(currentLoginUser.userName===login_name && currentLoginUser.password===login_pass){
      $("#my_higth").text(currentLoginUser.higth);
      $("#my_bust").text(currentLoginUser.bust);
      $("#my_waist").text(currentLoginUser.waist);
      $("#my_hip").text(currentLoginUser.hips);
      $(".display_login").css("display","none");
      $(".display_higth1").css("display","block");
    }
    else{
      alert("入力されたアドレスまたはパスワードが違います");
    }
  });

  /*保存ボタン遷移*/
  $("#higth_button").click(function(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var update_higth=$("#update_higth").val();
    var update_b=$("#update_b").val();
    var update_w=$("#update_w").val();
    var update_h=$("#update_h").val();
    var check_3=input_check(update_higth,1);
    var check_4=input_check(update_b,2);
    var check_5=input_check(update_w,2);
    var check_6=input_check(update_h,2);
    if(check_3 && check_4 && check_5 && check_6){
      currentLoginUser
      .set("higth",update_higth)
      .set("bust",update_b)
      .set("waist", update_w)
      .set("hips",update_h)
      .update()
      .then(function(obj) {
        // 更新成功時
        $(".display_higth1").css("display","none");
        $(".display_higth2").css("display","block");
      })
      .catch(function(error) {
          // 更新失敗時
          alert("更新失敗" + error);
      });
    }
  });

 /***ここまで身長/BWH変更画面******************************************/
 
 
/***メールアドレス画面************************************************/

  //画面遷移
  $("#login_mail").click(function(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var login_name=$("#info_login_name").val();
    var login_pass=$("#info_login_pass").val();
    var address=currentLoginUser.mailAddress;
    var address_rep=replace(address,false);
    if(currentLoginUser.userName===login_name && currentLoginUser.password===login_pass){
      $("#my_mailaddress").text(address_rep);
      $(".display_login").css("display","none");
      $(".display_mail1").css("display","block");
    }
    else{
      alert("入力されたアドレスまたはパスワードが違います");
    }
  });

 
  /*パスワード認証*/
  $("#mail-button").click(function(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var update_address=$("#new_mail").val();
    var update_address_2=$("#check_mail").val();
    var check_1=address_check(update_address,update_address_2);
    if(check_1){
      currentLoginUser
      .set("mailAddress",update_address )
      .update()
      .then(function(obj) {
        // 更新成功時
        $(".display_mail1").css("display","none");
        $(".display_mail2").css("display","block");
      })
      .catch(function(error) {
          // 更新失敗時
        alert("更新失敗" + error);
      });
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
  $("#login_withdra").click(function(){
     var currentLoginUser = ncmb.User.getCurrentUser();
     var login_name=$("#user_login").val();
     var login_pass=$("#pass_login").val();
     if(currentLoginUser.userName===login_name && currentLoginUser.password===login_pass){
      $(".display_withlogin").css("display","none");
      $(".display_withdrawal2").css("display","block");
     }
     else{
       alert("入力されたアドレスまたはパスワードが違います");
     }

  });

  $("#withdrawal-button3").click(function(){
    var user = ncmb.User.getCurrentUser();
    user.delete();
    setTimeout(function(){
        window.location.href = "login.html"; 
    },500);
  });

/***ここまで退会画面*****************************************************/

/**********************予約管理*****************/
function user_list(){
  var currentLoginUser = ncmb.User.getCurrentUser();
  var reserve = ncmb.DataStore("Reserve");
  reserve.equalTo("store",currentLoginUser.userName) .fetchAll() 
    .then(function(results){
      for(var i=0;i<results.length;i++){
        var user_inf=results[i];
        var add_text='<tr class="td"><td>'+user_inf.name+'</td><td>'+user_inf.tel+'</td><td>'+user_inf.day_1+'</td><td>'+user_inf.day_2+'</td><td>'+user_inf.day_3+'</td><td><button class="re_dress_button" name="'+user_inf.user_name+'">詳細</button></td></tr>';
        $("#participant_table").append(add_text);
      }
    })
    $("body").on('click','.re_dress_button',function(){
      var re_user_name=$(this).attr("name");
      var user_save = ncmb.DataStore("user_save");
      user_save.equalTo("id", "1").fetchAll().then(function(objects){
        var object = objects[0];
        object.set("user_name",re_user_name).set("store",currentLoginUser.userName);
        object.update();
      }).catch(function(err) {
        alert(err);
      })
      setTimeout(function(){
        window.location.href = "user_dress.html"; 
      },500);
    });

}

/**********************ここまで予約管理*****************/
 /**********************ここから予約ドレス画面*****************/
 function user_dress(){
    var img_text=mobile_check();
   var save_data = ncmb.DataStore("user_save");
  var favorite = ncmb.DataStore("favorite");
  var dress = ncmb.DataStore("test");
  save_data.fetchAll().then(function(results){
    var a=results[0];
    favorite
      .equalTo("user_id", a.user_name)
      .fetchAll() 
      .then(function(results_2){
        for(var i=0;i<results_2.length;i++){
          var b=results_2[i];
        dress
        .equalTo("dress_id", b.dress_id)
        .fetchAll() 
        .then(function(results_3){
          var c=results_3[0];
          if(c.dress_store===a.store){
              var add_text='<li class="item"><img src="'+img_text+c.path+'" id="item_'+item_count+'" class="item_img"><br><div class="dress_num">'+c.name+' </div></li>';
              $("#result_list").append(add_text);

          }
        })
          }
      })
  })
 }

  /**********************ここまで予約ドレス画面*****************/
    /**********************ここからドレス一覧画面*****************/

  function dress_list(){
    var img_text=mobile_check();
    var get_data = ncmb.DataStore("test");
    get_data.order('dress_id',false).fetchAll().then(function(results){  
        for(var i=0;i<results.length;i++){
          var a=results[i]; 
          path[i]=a.get("path");    // 画像ファイル名取得
          dress_id[i]=a.get("dress_id"); // ドレスＩＤ取得
        }
        for(var i=0;i<results.length;i++){
          //if(i%2===0){
          var add_text="";
          //}
          if(i===0){
              add_text='<img src="'+img_text+path[item_count]+'" id="item_'+item_count+'" class="re_img_1">';
            item_count++;
            $("#top-img").append(add_text);  
            var add_text="";
          }

            add_text+='<th class="re_td"><img src="'+img_text+path[item_count]+'" id="item_'+item_count+'" class="re_img_2"></th>';
          
          item_count++;
 
            var tr_id=parseInt(i/2);
            $("#tr_"+tr_id).append(add_text);
          
        }
      })
      .catch(function(error){
          alert(error);
      });            

  }
  /**********************ここまでドレス一覧画面*****************/


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
$("#login_with").click(function(){
  //入力フォームの取得
  var user_name = $("#my_userbox").val();
  var password = $("#my_passbox").val();
  ncmb.User.login(user_name,password)
      .then(function(user){
        alert("ログイン成功");
        currentLoginUser = ncmb.User.getCurrentUser();
        if(currentLoginUser.user_flag!=1){
         window.location.href = "recommend.html"; 
        }
        else{
          window.location.href = "user_list.html"; 
        }
    })
    .catch(function(error) {
        alert("ログイン失敗！次のエラー発生: " + error);
      })
});


/*******ログアウト******/

function logout(){
  ncmb.User.logout();
  alert('ログアウト成功');
  currentLoginUser = null;
  window.location.href = "login.html";
}
/**********************新規登録画面*****************/

  /**/var currentLoginUser; //現在ログイン中ユーザー

  function finalcheckBtn()
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
    $(".usernameSet").text(username);
    $(".mailaddSet").text(mailaddress);
    $(".passwordSet").text(password);
    $(".higthSet").text(higth);
    $(".bmw_bSet").text(bmw_B);
    $(".bmw_wSet").text(bmw_W);
    $(".bmw_hSet").text(bmw_H);
  }

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
  let user = new ncmb.User();
  // 新規登録
  user.set("userName", username)
      .set("mailAddress", mailaddress)
      .set("password", password)
      .set("higth", higth)
      .set("bust", bmw_B)
      .set("hips", bmw_W)
      .set("waist", bmw_H)
      .set("user_flag", "0")
        .signUpByAccount()
        .then(function(user) {
            /* 処理成功 */
            alert("新規登録に成功しました");
            // [NCMB] userインスタンスでログイン
            ncmb.User.login(user)
                     .then(function(user) {
                         /* 処理成功 */
                         // [NCMB] ログイン中の会員情報の取得
                         currentLoginUser = ncmb.User.getCurrentUser();
                         // フィールドを空に
                         $("#new_username").val("");
                         $("#new_mailadd").val("");
                         $("#new_password").val("");

                         // 詳細ページへ移動
                        //  $.mobile.changePage('#DetailPage');
                        //新規登録後おすすめに遷移
                        location.href='recommend.html';
                     })

                     .catch(function(error) {
                         /* 処理失敗 */
                         alert("ログインに失敗しました: " + error);
                         alert("ログインに失敗しました: " + error);
                         // フィールドを空に
                          $("#new_username").val("");
                          $("#new_mailadd").val("");
                          $("#new_password").val("");
                        //  // loading の表示
                        //  $.mobile.loading('hide');
                     });
        })
        .catch(function(error) {
            /* 処理失敗 */
            alert("新規登録に失敗しました：" + error);
            // フィールドを空に
            $("#new_username").val("");
            $("#new_mailadd").val("");
            $("#new_password").val("");
            // // loading の表示
            // $.mobile.loading('hide');
        });
}

//画面遷移　必須項目が入力されているか・一致するか・メルアドが正しいか
$("#next_page_1").click(function(){
  var name = $("#new_username").val();
  var mail = $("#new_mailadd").val();
  var mailconfirm = $("#new_mailadd_test").val();
  var pass = $("#new_password").val();
  var passconfirm = $("#new_password_test").val();
  var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;

  if(name=="" || mail=="" || mailconfirm=="" || pass=="" || passconfirm==""){
    alert("必須項目が入力されていません");
  }else if(!reg.test(mail) || !reg.test(mailconfirm)){
    alert("メールアドレスを正しく入力してください");
  }else if(pass != passconfirm){
    alert("入力したパスワードが一致していません");
  }else if(mail != mailconfirm){
    alert("入力したメールアドレスが一致していません");
  }else if(mail == mailconfirm && pass == passconfirm){
    alert("遷移成功");
    $("#page_1").css("display","none");
    $("#page_2").css("display","block");
  }
});
//管理者画面の
$("#next_page_1_staff").click(function(){
  var name = $("#new_companynamew_username").val();
  var code = $("#new_companycode").val();
  var mail = $("#new_staff_mailadd").val();
  var mailconfirm = $("#new_staff_mailadd_test").val();
  var pass = $("#new_staff_password").val();
  var passconfirm = $("#new_staff_password_test").val();
  var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;

  if(name=="" || code=="" || mail=="" || mailconfirm=="" || pass=="" || passconfirm==""){
    alert("必須項目が入力されていません");
  }else if(!reg.test(mail) || !reg.test(mailconfirm)){
    alert("メールアドレスを正しく入力してください");
  }else if(pass != passconfirm){
    alert("入力したパスワードが一致していません");
  }else if(mail != mailconfirm){
    alert("入力したメールアドレスが一致していません");
  }else if(mail == mailconfirm && pass == passconfirm){
    alert("遷移成功");
    $("#page_1").css("display","none");
    $("#page_2").css("display","block");
  }
});


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

    $( "#new_mailadd")//新規登録メルアド一回目
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

    $( "#new_mailadd_test")//新規登録メルアド二回目
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

    $( "#new_staff_mailadd")//管理者新規登録メルアド一回目
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

    $( "#new_staff_mailadd_test")//管理者新規登録メルアド二回目
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


/**********************管理者用新規登録画面*****************/

  /**/var staffCurrentLoginUser; //現在ログイン中ユーザー

  $("#next_page_2").click(function()
  {
    //個人情報１の入力フォームの取得
    var companyname = $('[name=dress_store_name] option:selected').text();//店舗名
    var companyCode = $("#new_companycode").val();  //店舗コード
    var staff_mailaddress = $("#new_staff_mailadd").val();
    var staff_password = $("#new_staff_password").val();
    //個人情報２の入力フォームの取得
    var staff_name = $("#new_staffname").val();
alert(companyname);
    $(".companynameSet").text(companyname);
    $(".companycodeSet").text(companyCode);
    $(".staffmailaddSet").text(staff_mailaddress);
    $(".staffpasswordSet").text(staff_password);
    $(".staff_nameSet").text(staff_name);

  });

//会員登録


$("#next_page_3").click(function()
{
  //個人情報１の入力フォームの取得
  var companyname = $('[name=dress_store_name] option:selected').text();
  var companycode = $("#new_companycode").val();
  var mail = $("#new_staff_mailadd").val();
  var pass = $("#new_staff_password").val();
  //個人情報２の入力フォームの取得
  var staffname = $("#new_staffname").val();
  let user = new ncmb.User();
  // 新規登録
  user.set("userName", companyname)
      .set("companyCode", companycode)
      .set("mailAddress", mail)
      .set("password", pass)
      .set("staffName", staffname)
      .set("user_flag", "1")
        .signUpByAccount()
        .then(function(user) {
            /* 処理成功 */
            alert("新規登録に成功しました");//ここは残す
            // [NCMB] userインスタンスでログイン
            ncmb.User.login(user)
                     .then(function(user) {
                         /* 処理成功 */
                         // [NCMB] ログイン中の会員情報の取得
                         staffCurrentLoginUser = ncmb.User.getCurrentUser();
                         // フィールドを空に
                         $("#new_companyname").val("");
                         $("#new_companycode").val("");
                         $("#new_staff_mailadd").val("");
                         $("#new_staff_password").val("");
                         $("#new_staffname").val("");

                         // 詳細ページへ移動
                        //  $.mobile.changePage('#DetailPage');
                        //新規登録後予約管理に遷移
                        location.href='user_list.html';
                     })

                     .catch(function(error) {
                         /* 処理失敗 */
                         alert("ログインに失敗しました: " + error);
                         alert("ログインに失敗しました: " + error);
                         // フィールドを空に
                          $("#new_companyname").val("");
                          $("#new_companycode").val("");
                          $("#new_staff_mailadd").val("");
                          $("#new_staff_password").val("");
                          $("#new_staffname").val("");
                        //  // loading の表示
                        //  $.mobile.loading('hide');
                     });
        })
        .catch(function(error) {
            /* 処理失敗 */
            alert("新規登録に失敗しました：" + error);
            // フィールドを空に
                         $("#new_companyname").val("");
                         $("#new_companycode").val("");
                         $("#new_staff_mailadd").val("");
                         $("#new_staff_password").val("");
                         $("#new_staffname").val("");
            // // loading の表示
            // $.mobile.loading('hide');
        });

});


/***ここまで管理者用新規登録画面*****************************************************/



/***管理者情報変更画面*****************************************************/
 
  //画面遷移
  $("#login_admin_info").click(function(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var login_name=$("#info_login_name").val();
    var login_pass=$("#info_login_pass").val();
    if(currentLoginUser.userName===login_name && currentLoginUser.password===login_pass){
    var pass=currentLoginUser.password;
    var address=currentLoginUser.mailAddress;
    var pass_rep=replace(pass,true);
    var address_rep=replace(address,false)
      $(".display_login").css("display","none");
      $(".display_info1").css("display","block");
      $(".display_login").css("display","none");
      $(".display_admin_info1").css("display","block");
      $("#my_admin_name").text(currentLoginUser.userName);
      $("#my_admin_mailaddress").text(address_rep);
      $("#my_admin_pass").text(pass_rep);
    }
    else{
      alert("入力されたアドレスまたはパスワードが違います");
    }
  });
  $("#info_admin_button").click(function(){
    var update_address=$("#update_admin_address").val();
    var update_address_2=$("#update_admin_address_2").val();
    var update_pass=$("#update_admin_pass").val();
    var update_pass_2=$("#update_admin_pass_2").val();
    var check_1=address_check(update_address,update_address_2);
    var check_2=pass_check(update_pass,update_pass_2);

    if(check_1 && check_2){
      $(".display_admin_info1").css("display","none");
      $(".display_admin_info2").css("display","block");
    }
  });


  $("#info-admin_update").click(function(){
    var currentLoginUser = ncmb.User.getCurrentUser();
    var update_name=$("#update_admin_name").val();
    var update_address=$("#update_admin_address").val();
    var update_pass=$("#update_admin_pass").val();

    currentLoginUser
    .set("userName", update_name)
    .set("mailAddress",update_address )
    .set("password", update_pass)
    .update()
    .then(function(obj) {
        // 更新成功時
      alert("更新成功");
    })
    .catch(function(error) {
        // 更新失敗時
        alert("更新失敗" + error);
    });
    setTimeout(function(){
        window.location.href = "admin_my-page.html"; 
      },1000);
  });

  function address_check(str_1,str_2){ // メールアドレスチェック
    var reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if(str_1!=str_2){
      alert("再入力されたアドレスが違います");
    }
    else{
      if(reg.test(str_1)){
        return true;
      }
      else{
        alert("入力されたメールアドレスが正しくないです");
      }
    }
  }
  function pass_check(str_1,str_2){ // パスワードcheck
    var reg =/^[a-z\d]{8,100}$/i;
    if(str_1!=str_2){
      alert("再入力されたパスワードが違います");
    }
    else{
      if(reg.test(str_1)){
        return true;
      }
      else{
        alert("入力されたパスワードが正しくないです");
      }
    }
  }

  function input_check(input,f){
    if(isNaN(input)){
      alert("身長、BWHは数字で入力してください");
    }
    if(f===1){
      if(input>300){
        alert("身長の数値が正しくありません");
      }
      else{
        return true;
      }
    }
    else{
      if(input>200){
        alert("BWHの数値が正しくありません");
      }
      else{
        return true;
      }
    
          
    }
  }

  function replace(str,f){  // パスワードとメールアドレスを＊に置き換え
    var rep="";
    if(f){
      for(var i=0;i<str.length;i++){
        rep+="*";
      }
      return rep;
    }
    else{
      var address_2=str.split(/[@.]/);
      for(var i=0;i<address_2.length;i++){
        for(var j=0;j<address_2[i].length;j++){
          rep+="*"
        }
        if(i===0){
          rep+="@";
        }
        else if(i===1){
          rep+="."
        }
      }
      return rep;
    }
  }
 
/***ここまで管理者情報変更画面*****************************************************/