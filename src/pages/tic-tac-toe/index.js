let activePlayer = "x";
let winner = undefined;
let draw = false;
const nodes = [
  { value: 1, takenBy: undefined },
  { value: 2, takenBy: undefined },
  { value: 3, takenBy: undefined },
  { value: 4, takenBy: undefined },
  { value: 5, takenBy: undefined },
  { value: 6, takenBy: undefined },
  { value: 7, takenBy: undefined },
  { value: 8, takenBy: undefined },
  { value: 9, takenBy: undefined },
];
const graph = {
  1: [
    [nodes[1], nodes[2]],
    [nodes[3], nodes[6]],
    [nodes[4], nodes[8]],
  ],
  2: [
    [nodes[4], nodes[7]],
    [nodes[0], nodes[2]],
  ],
  3: [
    [nodes[4], nodes[6]],
    [nodes[5], nodes[8]],
    [nodes[1], nodes[0]],
  ],
  4: [
    [nodes[4], nodes[5]],
    [nodes[0], nodes[6]],
  ],
  5: [
    [nodes[3], nodes[5]],
    [nodes[1], nodes[nodes[6]]],
    [nodes[2], nodes[6]],
    [nodes[0], nodes[8]],
  ],
  6: [
    [nodes[3], nodes[4]],
    [nodes[2], nodes[8]],
  ],
  7: [
    [nodes[7], nodes[8]],
    [nodes[0], nodes[3]],
    [nodes[4], nodes[2]],
  ],
  8: [
    [nodes[6], nodes[8]],
    [nodes[1], nodes[4]],
  ],
  9: [
    [nodes[2], nodes[5]],
    [nodes[6], nodes[7]],
    [nodes[0], nodes[4]],
  ],
};
const takenSpots = {
  x: [],
  o: [],
};
let plays = 0;
const changeActivePlayer = (currentPlayer) =>
  currentPlayer === "o" ? "x" : "o";

const checkIfPlayerWins = (currentPlayer, takenSpot) => {
  let playerWins = false;
  if (plays > 4) {
    const connectionsToCheck = graph[takenSpot];
    for (const connections of connectionsToCheck) {
      if (connections[0].takenBy === currentPlayer) {
        const hasOtherThanCurrentPlayer = connections.some(
          (node) => node.takenBy !== currentPlayer,
        );
        if (!hasOtherThanCurrentPlayer) {
          playerWins = true;
        }
      }
    }
  }
  return playerWins;
};

const handlePlay = (id) => {
  const nodeIndex = parseInt(id, 10) - 1;
  if (!winner) {
    if (!nodes[nodeIndex].takenBy) {
      plays++;
      nodes[nodeIndex].takenBy = activePlayer;
      const selectedSpot = document.getElementById(id);
      selectedSpot.classList.remove("available");
      selectedSpot.classList.add("taken");
      const flag = document.createElement("h1");
      flag.innerHTML = activePlayer;
      selectedSpot.appendChild(flag);
      const currentPlayerWins = checkIfPlayerWins(
        activePlayer,
        parseInt(id, 10),
      );
      console.log("player", activePlayer, id, currentPlayerWins, nodes);
      if (!currentPlayerWins) {
        activePlayer = changeActivePlayer(activePlayer);
      } else {
        winner = activePlayer
        window.alert(`${activePlayer} Wins`);
        const board = document.getElementById("board");
        board.classList.add("disabled");
      }
    } else {
      console.log("taken spot");
    }
  }
};

const root = document.getElementById("canvas");

const grid = document.createElement("div");
grid.setAttribute("class", "grid-container");
grid.setAttribute("id", "board");
let itemId = 1;
for (let xAxis = 0; xAxis < 3; xAxis++) {
  const gridRow = document.createElement("div");
  gridRow.setAttribute("class", "grid-row");
  for (let yAxis = 0; yAxis < 3; yAxis++) {
    const gridItem = document.createElement("div");
    gridItem.setAttribute("class", "grid-item available");
    gridItem.setAttribute("onclick", `handlePlay(${itemId})`);
    gridItem.setAttribute("id", `${itemId}`);
    gridRow.appendChild(gridItem);
    itemId++;
  }
  grid.appendChild(gridRow);
}
root.appendChild(grid);
