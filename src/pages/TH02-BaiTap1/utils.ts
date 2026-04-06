import type { Choice } from "./types";

export function getRandomChoice(): Choice {
const choices: Choice[] = ["kéo", "búa", "bao"];
const index = Math.floor(Math.random() * choices.length);
return choices[index];
}

export function getResult(player: Choice, computer: Choice): "Thắng" | "Thua" | "Hòa" {
if (player === computer) return "Hòa";

if (
(player === "kéo" && computer === "bao") ||
(player === "búa" && computer === "kéo") ||
(player === "bao" && computer === "búa")
) {
return "Thắng";
}

return "Thua";
}