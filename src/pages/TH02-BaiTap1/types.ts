export type Choice = "kéo" | "búa" | "bao";

export interface GameResult {
player: Choice;
computer: Choice;
result: "Thắng" | "Thua" | "Hòa";
}