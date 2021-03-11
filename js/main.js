'use strict';

{
  const question = document.getElementById('question');
  const answers = document.getElementById('answers');
  const btn = document.getElementById('btn');

  const quizSet = [
    {q: 'What is A?', a: ['A0', 'A1', 'A2']},
    {q: 'What is B?', a: ['B0', 'B1', 'B2']},
    {q: 'What is C?', a: ['C0', 'C1', 'C2']},
  ];
  let currentNum = 0;
  
  // question.textContent = quizSet[currentNum].q;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      // let i = arr.length - 1;
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if(li.textContent === quizSet[currentNum].a[0]) {
      // console.log('correct');
      li.classList.add('correct');
    } else {
      // console.log('wrong')
      li.classList.add('wrong');
    }
  }

  function setQuiz() {
    question.textContent = quizSet[currentNum].q;

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
  }
  setQuiz();
}
