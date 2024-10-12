import { useRef, useState } from "react";
import circle from "../assets/circle.png";
import cross from "../assets/cross.png";
// import '../styles/Tictactoe.css'

let initialData = ["", "", "", "", "", "", "", "", ""];

function Tictactoe() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(initialData);

  const titleRef = useRef(null);
  const boxRefs = Array.from({ length: 9 }, () => useRef(null));

  const toggle = (e, num) => {
    if (lock || data[num] !== "") return;

    const newData = [...data];
    const currentPlayer = count % 2 === 0 ? "x" : "o";
    newData[num] = currentPlayer;

    e.target.classList.add("placed");
    e.target.innerHTML = `<img class='m-10 animate-scale fade-in' src=${currentPlayer === "x" ? cross : circle} alt="${currentPlayer}" />`;
    setCount(count + 1);
    setData(newData);

    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]  // diagonals
    ];

    for (let [a, b, c] of winPatterns) {
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
        won(newData[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img class='ml-4 h-20 p-5' src=${winner === "x" ? cross : circle} alt="${winner}" /> wins`;
  };

  const reset = () => {
    setLock(false);
    setData(initialData);
    setCount(0);
    titleRef.current.innerHTML = `Tic Tac Toe game in <span class="text-teal-500">React</span>`;
    boxRefs.forEach(box => {
      box.current.classList.remove("placed");
      box.current.innerHTML = "";
    });
  };

  const renderBox = (num) => (
    <div
      ref={boxRefs[num]}
      onClick={(e) => toggle(e, num)}
      className="boxes flex h-44 w-44 bg-[#1f3540] cursor-pointer border-solid border-4 border-[#0f1b21] rounded-lg transition-all duration-300 ease-in-out"
    ></div>
  );

  return (
    <div className="text-center">
      <h1 ref={titleRef} className="text-white text-3xl font-bold my-14 flex justify-center items-center">
        Tic Tac Toe game in <span className="text-teal-500"> React</span>
      </h1>
      <div className="h-[495px] w-[564px] flex m-auto justify-center flex-wrap">
        {Array.from({ length: 9 }, (_, i) => renderBox(i))}
      </div>
      <button
        onClick={reset}
        className="text-teal-300 bg-[#00fff710] font-medium px-8 py-4 rounded-full my-16 transition-all duration-300 hover:bg-[#00fff7] hover:text-black"
      >
        Reset
      </button>
    </div>
  );
}

export default Tictactoe;
