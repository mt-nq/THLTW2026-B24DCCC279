import { useState } from "react";
import type { Choice, GameResult } from "./types";
import { getRandomChoice, getResult } from "./utils";

export default function App() {
const [history, setHistory] = useState<GameResult[]>([]);

const playGame = (playerChoice: Choice) => {
const computerChoice = getRandomChoice();
const result = getResult(playerChoice, computerChoice);

const newGame: GameResult = {
    player: playerChoice,
    computer: computerChoice,
    result,
};

setHistory([newGame, ...history]);
};

return (
<div style={{ padding: 20 }}>
    <h1>Trò chơi Oẳn Tù Tì</h1>

    <div>
    <button onClick={() => playGame("kéo")}>Kéo </button>
    <button onClick={() => playGame("búa")}>Búa </button>
    <button onClick={() => playGame("bao")}>Bao </button>
    </div>

    <h2>Lịch sử trận đấu</h2>

    <ul>
    {history.map((game, index) => (
        <li key={index}>
        Bạn: {game.player} | Máy: {game.computer} → {game.result}
        </li>
    ))}
    </ul>
</div>
);
}