var latest_word_elm = document.getElementById('latest-word');

var color_01 = 'ក្រហម';
var color_02 = 'ខៀវ'; 
var color_03 = 'លឿង';
var color_04 = 'បៃតង';
var color_05 = 'ខ្មៅ' ;
var color_06 = 'ស';
var color_07 = 'ស្វាយ';

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'km-KH';
recognition.start();

var parse = function(str_in) {
  var out_str = '';
  var str = str_in.replace('ពណ៌', "");
  if (str.indexOf('ៅ') != -1){
    out_str = color_05;
  }
  else if (str.indexOf('ខ្ម') != -1){
    out_str = color_05;
  }
  else if (str.indexOf('3') != -1){
    out_str = color_04;
  }
  else if (str.indexOf('បី') != -1){
    out_str = color_04;
  }
  else{
    out_str = str;
  }
  return out_str
};

var check_color = function(str_in) {
  var str = parse(str_in);
  var out_str = '';
  switch (str){
    case color_01:
      out_str = 'red';     break;
    case color_02:
      out_str = 'blue';    break;
    case color_03:
      out_str = 'yellow';  break;
    case color_04:
      out_str = 'green';   break;
    case color_05:
      out_str = 'black';   break;
    case color_06:
      out_str = 'white';   break;
    case color_07:
      out_str = 'purple';  break;
    default: 
      out_str = 'gray';
  }
  console.log('check_color');
  return out_str;
};

recognition.onresult = function(event){
  var resultsLength = event.results.length -1 ;
  var ArrayLength = event.results[resultsLength].length -1;
  var saidWord = event.results[resultsLength][ArrayLength].transcript;
  //var checked_color = check_color(saidWord);
  latest_word_elm.innerHTML = '<p>' + saidWord + '</p>' + latest_word_elm.innerHTML;
  //document.body.classname = '';
  //document.body.classList.add('bg-' + checked_color);
}

recognition.onerror = function(event){
  console.log('error?');
  console.log(event);
}

function color_polling() {
  if (latest_word_elm.getElementsByTagName('p')[0]){
    console.log(latest_word_elm.getElementsByTagName('p')[0].innerHTML);
    var checked_color = check_color(latest_word_elm.getElementsByTagName('p')[0].innerHTML);
    document.body.removeAttribute("class");
    document.body.classList.add('bg-' + checked_color);
  }
  setTimeout(color_polling, 1000);
}
setTimeout(color_polling, 1000);

document.getElementById('btn-reset').onclick = function reload_page(){
  location.reload();
};
