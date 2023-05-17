'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// // function declaration
// function calcAge(birthYear) {
//   // age is accessible everywhere in calcAge() function and inner scopes
//   const age = 2030 - birthYear;
//   // // variable lookup process
//   // console.log(firstName);
//   function printAge() {
//     // can take the variable from parent scope
//     let output = `${firstName}, you are the ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var milenial = true;
//       // because js looks for the variable in the current scope, if it exists then there is no variable lookup process, const firstName = 'amir';
//       // CONST, LET anf function are block scoped --- not available outside of "if" block
//       const str = `oh, and you are a millenial ${firstName}, because you are ${age} years old, born in ${birthYear}`;
//       console.log(str);
//       console.log(milenial);

//       function add(a, b) {
//         return a + b;
//       }
//       // const output = 'neew output';
//       add(1, 1);
//     }
//     console.log(output);
//     // only available in block scope (this is only for strict mode) === console.log(add(10, 10));
//     // available in block scope + also available in parent scope === console.log(milenial);
//     // console.log(str);
//   }
//   printAge();
//   return age;
// }

// const firstName = 'husein';
// calcAge(1990);

// hoisting with variables
// console.log(me);
// // console.log(job);
// // console.log(year);

// var me = 'husein';
// let job = 'student';
// const year = 2000;

// // functions

// console.log(example(2, 2));
// // console.log(exampleExpression(2, 2));
// // console.log(exampleExpression);
// // console.log(exampleArrow(2, 2));

// function example(a, b) {
//   return a + b;
// }

// // trying to call undefined and then we get an error
// var exampleExpression = function (a, b) {
//   return a + b;
// };

// const exampleArrow = (a, b) => {
//   a + b;
// };

// // example
// // undefined is a falsy value
// if (!numProducts) {
//   deleteCart();
// }

// var numProducts = 10;

// function deleteCart() {
//   console.log('all products deleted');
// }

// var x = 1;
// let y = 2;
// const z = 3;
// console.log(x, y, z);

// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2020 - birthYear);
//   console.log(this);
// };

// calcAge(2000);

// // this refers to the parent === in this term it is a window object
// const calcAgeArrow = birthYear => {
//   console.log(2020 - birthYear);
//   console.log(this);
// };

// calcAgeArrow(2000);

// const husein = {
//   year: 2000,
//   calcAge: function () {
//     console.log(2050 - this.year);
//   },
// };
// husein.calcAge();

// const kemal = {
//   year: 2030,
// };

// // method borrowing
// kemal.calcAge = husein.calcAge;
// kemal.calcAge();

// // function is just a value
// const f = husein.calcAge;

// f();

// var firstName = 'kemal';

// const husein = {
//   firstName: 'husein',
//   year: 2000,
//   calcAge: function () {
//     console.log(2015 - this.year);

//     // because "this" is husein object
//     // const self = this;
//     // console.log(self);
//     // const isMilenial = function () {
//     //   // it is undefined because this is just a regular function call
//     //   console.log(self);
//     //   console.log(self.year >= 1981 && self.year <= 1996);
//     // };
//     // isMilenial();

//     console.log(self);
//     const isMilenial = () => {
//       // it is undefined because this is just a regular function call
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996);
//     };
//     isMilenial();
//   },

//   greet: () => {
//     // this keyword is window
//     console.log(`hey ${this.firstName}`);
//     console.log(this);
//   },
// };
// husein.calcAge();
// husein.greet();

// // regular function, function expression
// const addExpr = function (a, b) {
//   console.log(this);
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 2);
// addExpr(2, 5, 6, 7);
// console.log(addExpr(2, 5, 6, 7));

// // arguemnts keyword doesnot exist in arrow function
// const addExpr2 = (a, b) => {
//   console.log(this);
//   // console.log(arguments);

//   return a + b;
// };
// addExpr2(20, 20);

// let age = 30;
// let oldAge = age;
// age = 31;

// console.log(age);
// console.log(oldAge);

// const me = {
//   name: 'husein',
//   age: 30,
// };

// const friend = me;

// friend.age = 27;

// console.log(friend);
// console.log(me);

// let lastName = 'softic';
// let oldLastName = lastName;
// lastName = 'ceho';

// console.log(lastName, oldLastName);

// const jessica = {
//   firstName: 'jessica',
//   lastName: 'williams',
//   age: 27,
// };

// const marriedJessica = jessica;

// marriedJessica.lastName = 'davis';

// console.log('before marraige', jessica);
// console.log('after marraige', marriedJessica);

// const jessica2 = {
//   firstName: 'jessica',
//   lastName: 'williams',
//   age: 27,
//   family: ['belmin', 'adi'],
// };

// // Object.assign({}, jessica2) === creates only shallow copy but we need a deep clone
// const jessicaCopy = Object.assign({}, jessica2);
// jessicaCopy.lastName = 'davis';
// jessicaCopy.family.push('denin', 'mirza');
// console.log(jessica2);
// console.log(jessicaCopy);

// // Object.assign({}, jessica2) === doesnot work on deeply nested objects
