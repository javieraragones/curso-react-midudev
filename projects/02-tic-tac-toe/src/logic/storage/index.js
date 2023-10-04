export const saveGameStorage = ({ board, turn }) => {
    //guardar aquí partida
    window.localStorage.setItem("board", JSON.stringify(board)); // localStorage solo guarda strings IMPORTANTE
    window.localStorage.setItem("turn", turn);
}


export const resetGameStorage = () => {
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
}