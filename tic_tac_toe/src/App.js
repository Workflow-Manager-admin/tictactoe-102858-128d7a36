import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the main container for the TicTacToe game.
   * Implements a 3x3 grid, two-player mode, win/draw detection, and restart.
   */
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('');
  const winner = calculateWinner(board);

  // PUBLIC_INTERFACE
  function handleClick(index) {
    // If cell is filled or there is a winner, ignore click
    if (board[index] || winner || status === "Draw") return;

    const nextBoard = board.slice();
    nextBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);

    if (calculateWinner(nextBoard)) {
      setStatus(`Winner: ${xIsNext ? 'X' : 'O'}`);
    } else if (nextBoard.every(cell => cell)) {
      setStatus('Draw');
    } else {
      setXIsNext(!xIsNext);
    }
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setStatus('');
  }

  function renderCell(i) {
    return (
      <button
        className="ttt-cell"
        onClick={() => handleClick(i)}
        key={i}
        aria-label={`Cell ${i+1}`}
        tabIndex={0}
      >
        {board[i]}
      </button>
    );
  }

  // PUBLIC_INTERFACE
  function calculateWinner(squares) {
    /**
     * Detects if there is a winning combination.
     * Returns 'X', 'O', or null.
     */
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // UI: minimalist and centered
  return (
    <div className="app" style={{ background: "#fff", minHeight: "100vh" }}>
      <nav className="navbar" style={{ background: "#fff", color: "#000"}}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ color: "#2196f3" }}>
              <span className="logo-symbol" style={{ color: "#2196f3" }}>#</span> TicTacToe
            </div>
            {/* Optional: minimalist branding */}
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div 
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              minHeight: "80vh"
            }}>
            <h1 className="title" style={{ color: "#000", marginBottom: 8 }}>Tic Tac Toe</h1>
            <div style={{ marginBottom: 8, fontWeight: 500, fontSize: "1.1rem", color: "#2196f3" }}>
              {status ? (
                status
              ) : (
                <>Next Turn: <span style={{fontWeight: 700}}>{xIsNext ? 'X' : 'O'}</span></>
              )}
            </div>

            {/* 3x3 Grid */}
            <div
              className="ttt-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 64px)",
                gridTemplateRows: "repeat(3, 64px)",
                gap: "6px",
                background: "#f3f3f3",
                borderRadius: "12px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.03)",
                marginTop: 24,
                marginBottom: 18
              }}
            >
              {Array.from({ length: 9 }, (_, i) => renderCell(i))}
            </div>
            {/* Reset Button */}
            <button
              className="btn btn-large"
              style={{
                background: "#2196f3",
                color: "#fff",
                minWidth: 120,
                marginTop: 12,
                fontWeight: "bold"
              }}
              onClick={handleReset}
            >
              Restart Game
            </button>
          </div>
        </div>
      </main>
      {/* Minimal CSS for game grid and cells */}
      <style>
        {`
          .ttt-grid { user-select: none; }
          .ttt-cell {
            width: 64px;
            height: 64px;
            font-size: 2rem;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 6px;
            cursor: pointer;
            color: #000;
            font-family: inherit;
            font-weight: 600;
            outline: none;
            transition: background 0.2s;
          }
          .ttt-cell:focus,
          .ttt-cell:hover {
            background: #e3f2fd;
            border: 1.3px solid #2196f3;
          }
          .ttt-cell[disabled] {
            background: #eee;
            color: #bbb;
            cursor: not-allowed;
          }
        `}
      </style>
    </div>
  );
}

export default App;