// Initial variables
const letterList = ['B', 'I', 'N', 'G', 'O'];
let numbersInPlay = [];

$( document ).ready(function() {
  console.log( "document loaded" );

  // Selecting display containers.
  const displayBoxes = document.querySelectorAll('.display-character span');

  // Main Raffle function.
  function raffle() {
    let [num, groupedNum] = randomNumVerification();
    changeDisplay(groupedNum);
    changeChosenStyle(num);
  }

  // Number functions.
  function randomNumVerification() {
    let num = getRandomChar('normal');
    let groupedNum = assignGroup(num);
    
    return [num, groupedNum];
  }

  function isNumberInPlay(num, numbersInPlay) {
    return numbersInPlay.includes(num);
  }

  function saveNumbers(num) {
    numbersInPlay.push(num);
    if (typeof localStorage.getItem('NumbersInPlay') === null) {
      localStorage.setItem('NumbersInPlay', JSON.stringify(numbersInPlay));
    } else {
      JSON.parse(localStorage.getItem('NumbersInPlay'));
      localStorage.setItem('NumbersInPlay', JSON.stringify(numbersInPlay));
    }
  }

  function getRandomChar(mode) {
    let num = 0
    if (mode == 'normal') {
      num = 1 + Math.floor(Math.random() * 75);
      if (isNumberInPlay(num, numbersInPlay)) {
        num = getRandomChar(mode);
      } else {
        // Push to localStorage and active array.
        saveNumbers(num);
      }
    } 
    
    if (mode == 'letter') {
      num = letterList[Math.floor(Math.random() * letterList.length)];
    }

    if (mode == 'firstNum') {
      num = Math.floor(Math.random() * 8);
    }

    if (mode == 'secondNum') {
      num = Math.floor(Math.random() * 10);
    }
    return num;
  }

  function assignGroup(num) {
    let row = $(`#table-${num}`).parent().attr('data-letter');
    if (num.toString().length == 1) {
      num = 0 + num.toString();
    }
    let groupedNum = row + num;

    return groupedNum;
  }

  // Change and animate display.
  function changeDisplay(num) {
    let separatedCharacters = splitNum(num)
    animateDisplay(separatedCharacters);
  }

  function splitNum(num) {
    let separatedCharacters = num.split('');
    return separatedCharacters;
  }

  function animateDisplay(threeCharacters = []) {
    const startTime = Date.now();
    const duration = 3000; // Animation duration in milliseconds

    function updateCharContainers() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration) {
        displayBoxes.forEach((box) => {
          // Depending on the container, roll for different values.
          if (box.id == 'display-letter') {
            box.innerText = getRandomChar('letter');
          } else if (box.id == 'display-number-one') {
            box.innerText = getRandomChar('firstNum');
          } else {
            box.innerText = getRandomChar('secondNum');
          }
        });
        requestAnimationFrame(updateCharContainers);
      } else {
        // Stop the animation after the specified duration
        displayBoxes.forEach((box, i) => {
          box.innerText = threeCharacters[i];
        });
      }
    }

    updateCharContainers();
  }

  // Change style of board.
  function changeChosenStyle(num, time = 3100) {
    setTimeout(function () {
      $(`#table-${num}`).toggleClass('is-active');
    }, time)
  }

  // Action buttons
  $('#btn-clear').dblclick(() => {
    localStorage.clear();
    numbersInPlay = [];
    $('.is-active').toggleClass('is-active');
  });

  $('#btn-raffle').click(() => {
    raffle();
  });

  // Fill numbers on page load.
  function fillCacheNums() {
    const localNumbers = JSON.parse(localStorage.getItem('NumbersInPlay'));
    numbersInPlay = localNumbers;
    localNumbers.forEach((num) => {
      changeChosenStyle(num, 0);
    })
  }
  if (typeof localStorage.getItem('NumbersInPlay') !== null) {
    fillCacheNums();
  }
});

$( window ).on( "load", function() {
  console.log( "window loaded" );
});
