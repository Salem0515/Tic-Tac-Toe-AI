import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

export const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLocks] = useState(false);
  let [clickedBoxes, setClickedBoxes] = useState(Array(9).fill(false)); // Track clicked boxes
  let titleRef = useRef(null);



  const aiMove = () => {
    const emptyBoxes = [];
    for (let i = 0; i < 9; i++) {
      if (data[i] === "") {
        emptyBoxes.push(i);
      }
    }
    if (emptyBoxes.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
      const index = emptyBoxes[randomIndex];
      data[index] = "o";
      const box = document.querySelector(`.boxes[data-index="${index}"]`);
      box.innerHTML = `<img src='${circle_icon}'>`;
      setCount(count + 1);
      checkwin();
    }
  }


  const toggle = (e) => {
    if (lock) {
      return;
    }
    const index = e.target.getAttribute('data-index');
    if (data[index] !== "") {
      return; // Box already filled
    }
    e.target.innerHTML = `<img src='${cross_icon}'>`
    data[index] = "x";
    setCount(count + 1);
    checkwin();
    if (!lock && count < 8) {
      aiMove();
    }
  }

  const checkwin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    }
    else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    }
    else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    }
    else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    }
    else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    }
    else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
  }

  const won = (winner) => {
    setLocks(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `congratulation: <img src="${cross_icon}"> wins`
    }

    else {
      titleRef.current.innerHTML = `congratulation: <img src="${circle_icon}"> wins`

    }
  }

  const reset = () => {
    setLocks(false);
    setCount(0);
    setClickedBoxes(Array(9).fill(false));
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = 'Tic Tac Toe in <span>React</span>';
    document.querySelectorAll('.boxes').forEach(box => (box.innerHTML = ''));
  };


  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac toe <span>React</span></h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" data-index="0" onClick={toggle}></div>
          <div className="boxes" data-index="1" onClick={toggle}></div>
          <div className="boxes" data-index="2" onClick={toggle}></div>
        </div>
        <div className="row2">
          <div className="boxes" data-index="3" onClick={toggle}></div>
          <div className="boxes" data-index="4" onClick={toggle}></div>
          <div className="boxes" data-index="5" onClick={toggle}></div>
        </div>
        <div className="row3">
          <div className="boxes" data-index="6" onClick={toggle}></div>
          <div className="boxes" data-index="7" onClick={toggle}></div>
          <div className="boxes" data-index="8" onClick={toggle}></div>
        </div>
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  )
}