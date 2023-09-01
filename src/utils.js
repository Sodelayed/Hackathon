// Не думаю, что понадобится, но можете как рандомайзер использовать


export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}