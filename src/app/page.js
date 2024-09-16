"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className={styles.square} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: ";
  } else {
    status = "Next player →";
  }

  const aux = status == "Winner: "
    ? <> {status} <code>{winner}</code> </>
    : <> {status} <code>{(xIsNext ? "X" : "O")}</code> </>

  return (
    <>
      <div className={styles.status}>{aux}</div>
      <div className={styles.row}>
        <Square value={squares[0]} onSquareClick={() =>handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() =>handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() =>handleClick(2)} />
      </div>
      <div className={styles.row}>
        <Square value={squares[3]} onSquareClick={() =>handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() =>handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() =>handleClick(5)} />
      </div>
      <div className={styles.row}>
        <Square value={squares[6]} onSquareClick={() =>handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() =>handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() =>handleClick(8)} />
      </div>
    </>
  );
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 == 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move';
    } else {
      description = 'Go to game start';
    }
    return <li key={move} onClick={() => jumpTo(move)}>{description} <code>#{move}</code></li>;
  });

  return (
    <div className={styles.game}>
      <div className={styles.board}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className={styles.history}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <Image
          className={styles.logo}
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol> */}

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Tic tac toe
          </a>
          {/* <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Give me a star on GitHub
          </a> */}
        </div>

        <Game />
        
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          GitHub
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          About
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to my website →
        </a>
      </footer>
    </div>
  );
}
