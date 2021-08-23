import Pacman from "./Pacman";
import Phantom from "./Phantom";
import Tile from "./Tile";
import { BoardPosition } from "interfaces";


export interface GameBoardParams {
    //el tamaño del Tablero es una tupla de columna con fila
    tileSize: number,
    boardSize: BoardPosition,
}

class GameBoard {
    private tiles: Tile[];
    private tileSize: number;
    private boardSize: any;
    // private lv : object; 
    // private pacman: Pacman;
    // private phantoms: Phantom[];

    constructor(params: GameBoardParams){
        const { 
            boardSize,
            tileSize
            // lv , 
            // pacman, 
            // phantoms
        } = params;
        this.boardSize = boardSize || {colum:10, row:10} ;
        this.tileSize = tileSize ||30;
        //this.lv = lv || 2;
        //this.pacman = pacman;
        //this.phantoms = phantoms;
        this.tiles = [];
        this.buildTiles();
    }

    private buildTiles(){
        const {row, colum} = this.boardSize;
        const rowsIterable = Array.from(Array(row).keys());
        const columnIterable = Array.from(Array(colum).keys());
        
        columnIterable.forEach((colum)=>{
            rowsIterable.forEach((row)=>{
                const pos: BoardPosition = {colum ,row}
                this.tiles.push( Tile.getNewTile(this.tileSize, pos))
            })
        })
    }

    draw(context: any){
        this.tiles.forEach(( tile ) =>{
            tile.draw(context);
        });
    }

    update(){

    }


}

class lv {

}

export default GameBoard;
