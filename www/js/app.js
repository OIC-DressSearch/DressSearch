 document.addEventListener("init", function(event) {
    $("#list_1").click(function(){
      $('.display').css('display','none'); 
      $('#test_page').css('display','block');
    });
 });

document.addEventListener('prechange', function(event) {
  document.querySelector('ons-toolbar .center')
    .innerHTML = event.tabItem.getAttribute('label');
});
/*ここまで検索画面のjs*/