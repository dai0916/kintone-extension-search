//変数宣言
var textform, kintone_search, utfen ;
var main_url, url;
var command, command0, command1, command2, command3, command4;
var detail1, detail2, detail3, detail4;

//検索関数
function str_move(){
  if (event.keyCode == 13){ //EnterKeyが押されたときに実行
    textform = document.forms.form1.elements.text1.value; //フォームから取得した値

    for (var i = 0; i < url.length; i++){  //
      if (textform.match(new RegExp("^" + command[i] +" ")) && command[i] != "") { //
        //alert("一致");
        textform=textform.replace(command[i]+" ","");//コマンド文字を消す
        utfen= encodeURI(textform);//入力された文字をエンコードする
        url[i] = url[i].replace(new RegExp("xxxx","g"),textform); //URLのxxxx部分を検索文字に置換
        kintone_search=url[i];
      break;
      };

      if (i == url.length-1){ //コマンドと一致しない場合
        //alert("不一致");
        utfen= encodeURI(textform);
        main_url = main_url.replace(new RegExp("xxxx","g"),textform);
        kintone_search=main_url;
        break ;
      }
    }
  window.open(kintone_search, '_blank'); // 新しいタブを開き、ページを表示
  }
}

window.document.onkeydown = str_move; //キーが押されたら実行

function restore_options() {

  
  
  
  
  chrome.storage.sync.get({
    url0    : '', //基本検索URL
    
    command1: '', //コマンド
    detail1 : '', //説明
    url1    : '', //コマンド利用時のURL1
    
    command2: '',
    detail2 : '',
    url2    : '',
    
    command3: '',
    detail3 : '',
    url3    : '',
    
    command4: '',
    detail4 : '',
    url4    : ''
    
  }, function(items) {
    main_url = items.url0 ;
    url = [ items.url1 , items.url2 , items.url3 , items.url4 ];
    command = [ items.command1 , items.command2 , items.command3 ,items.command4 ];
    detail  = [ items.detail1 , items.detail2 , items.detail3 , items.detail4 ];
    
    //検索フォームにコマンドを表示
    for (var i= 0; i < 4;i++){
      $('.rounded-list').append('<li><a href="#">' + command[i] + ' : ' + detail[i] + '</a></li>');
    }

    var buttons = document.querySelectorAll("li");
    //console.log(buttons);
    for (var i = 0, len = buttons.length; i < len; ++i) {
      buttons[i].dataset.num = i;
      buttons[i].addEventListener("click", onButtonClick);
    }
    
    function onButtonClick () {
      document.form1.text1.value = command[this.dataset.num] + " ";
      document.form1.text1.focus();
    }
    
  });
}

document.addEventListener('DOMContentLoaded', restore_options); //htmlが読み込み終わったら実行
