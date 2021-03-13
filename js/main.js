'use strict';

{
  // 要素取得
  const question = document.getElementById('question');
  const answers = document.getElementById('answers');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('result > p');

  const quizSet = shuffle([
    {q: '世界で一番大きな湖は?', a: ['カスピ海', 'カリブ海', '琵琶湖']},
    {q: '２の８乗は？', a: ['256', '2', '1024']},
    {q: '次のうち最初にリリースされた言語は?', a: ['python', 'JavaScript', 'HTML']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;
  // question.textContent = quizSet[currentNum].q;
  // 回答をシャッフル
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      // let i = arr.length - 1;
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  // 正誤判定
  function checkAnswer(li) {
    // 正誤判定trueの場合回答できない
    // if(isAnswered === true){
    if(isAnswered){
      return;
    }
    isAnswered = true;
    if(li.textContent === quizSet[currentNum].a[0]) {
      // console.log('correct');
      li.classList.add('correct');
      score++;
    } else {
      // console.log('wrong')
      li.classList.add('wrong');
    }
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;
    // 回答した問題を消す
    while(answers.firstChild)
      answers.removeChild(answers.firstChild);

  // スプレッド演算子(選択肢がシャッフルされないようにする)
  const shuffledChoices =shuffle([...quizSet[currentNum].a]);

  // console.log(shuffledChoices)
  shuffledChoices.forEach(answer => {
    const li = document.createElement('li');
    li.textContent = answer;
    li.addEventListener('click', () => {
      checkAnswer(li);
    });
    answers.appendChild(li); 
  });
  // 最後の問題の時にshow score
  if (currentNum === quizSet.length -1){
    btn.textContent = 'Show Score';
  }

  }
  setQuiz();
  btn.addEventListener('click', () => {
    // 回答せずdiabledクラスがあれば処理しない
    if(btn.classList.contains('disabled')){
      return;
    }
    // 次の問題へ移動したら灰色にする
    btn.classList.add('disabled');
    if(currentNum === quizSet.length - 1){
      // console.log(`Score: ${score} /${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score} /${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  })
}
