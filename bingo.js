$( document ).ready(function() {
  console.log( "document loaded" );

  // Initial variables
  const letterList = ['B', 'I', 'N', 'G', 'O'];
  const displayBoxes = document.querySelectorAll('.display-character span');
  console.log(displayBoxes);

  // Main Raffle function.
  function raffle() {
    let num = randomNumVerification();
    animateDisplay();
    changeDisplay(num);
    changeChosenStyle(num);
  }

  // Number functions.
  function getRandomChar(mode) {
    let num = 0
    if (mode == 'normal') {
      num = 1 + Math.floor(Math.random() * 75);
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

  function randomNumVerification() {
    let num = getRandomChar('normal');
    let groupNum = assignGroup(num);
    console.log(`${num} -> ${groupNum}`);
    
    return num;
  }

  function assignGroup(num) {
    let row = $(`#table-${num}`).parent().attr('data-letter');
    let groupNum = row + num;

    return groupNum;
  }

  // Change Frond End.
  function changeChosenStyle(num) {
    
  }

  function changeDisplay(num) {
    let separatedCharacters = splitNum(num)
    animateDisplay(separatedCharacters);
  }

  function splitNum(num) {
    let separatedCharacters = num.split('');
    return separatedCharacters;
  }

  function animateDisplay(threeCharacters) {
    const startTime = Date.now();
    const duration = 3000; // Animation duration in milliseconds

    function updateCharContainers() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration) {
        displayBoxes.forEach((box) => {
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

  // Action buttons
  $('#btn-clear').dblclick(() => {
    localStorage.clear();
  });

  $('#btn-raffle').click(() => {
    raffle();
  });

});

$( window ).on( "load", function() {
  console.log( "window loaded" );

  function fillCacheNums() {
    
  }
  fillCacheNums();
});












// const Bingobject = {
//   // Properties.
//   cache     : "",
//   currNum   : "",
//   lastNum   : "",

//   // RAFFLE TIME LET'SA GO ! ! !
//   RAFFLE    : function () {
    
//   },

//   // Cache functions.
//   getCache  : function () {
    
//   },
//   setCache  : function () {
    
//   },
// }

