$(function() {
  // jQueryオブジェクトを変数に代入
  const $yomi = $('#yomi');
  const $mondai = $('#mondai');
  const $finishPanel = $('#finish-panel');
  const $countSelect = $('#count-select');
  
  // 問題用の変数の初期化
  let char_index = 1;
  let max_length = 3; //TODO 最初の問題
  let question_number = 1;
  let question_limit = 3;
  let done_questions = {};
  
  // 問題
  const MONDAI_LIST = [
    {yomi:'ごはん', text:'gohan'},
    {yomi:'おすし', text:'osushi'},
    {yomi:'サイフ', text:'saifu'},
    {yomi:'バナナ', text:'banana'},
    {yomi:'くつした', text:'kutsushita'},
    {yomi:'なべ', text:'nabe'},
    {yomi:'あし', text:'ashi'},
    {yomi:'パソコン', text:'pasokon'},
    {yomi:'けいたい', text:'keitai'},
    {yomi:'ふとん', text:'futon'},
  ];
  
  changeQuestionWord(getQuestionNumber());
  
  $countSelect.on('change', function(e) {
    question_limit = Number($countSelect.val());
    done_questions = {};
    changeQuestionWord(getQuestionNumber());
  });

  $(document).on('keypress', function(e){
    // console.log('key:'+e.key);
    const $target = $('#char-'+char_index);
    const char = $target.text();
    if (e.key === char) { //入力文字と現在の位置の文字が一緒だったら
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
    }
    
    if (max_length < char_index) {
      question_number++;
      if (question_limit < question_number) {
         finish();
         return;
      }
      changeQuestionWord(getQuestionNumber());
      char_index = 1; //初期化
    }

  });
  
  function getQuestionNumber() {
    let random_number = Math.floor(Math.random() * 10);
    while (done_questions[random_number] !== undefined) {
      random_number = Math.floor(Math.random() * 10);
    }
    done_questions[random_number] = random_number;
    return random_number;
  }
  
  function finish() {
    $finishPanel.removeClass('hidden');
    $yomi.hide();
    $mondai.hide();
  }
  
  function changeQuestionWord(index) {
    const word = MONDAI_LIST[index]['text']; 
    max_length = word.length;
    let newHtml = '';
    for (var i = 0; i < max_length; i++) {
       newHtml += '<p id="char-'+(i+1)+'" class="text default">'+word[i]+'</p>';
    }
    $mondai.html(newHtml);
    $yomi.text(MONDAI_LIST[index]['yomi']);
  }
  
});