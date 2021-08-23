import { getPositionOfLineAndCharacter, NewLineKind } from "typescript";
import { BoardPosition } from "interfaces";

export interface TileParams  {
    position: BoardPosition;
    size: number
}

class Tile {
    private pos: BoardPosition;
    private size : number;

    constructor(tileParams: TileParams){
        const { size, position} = tileParams
        this.pos = position;
        this.size = size;
    }

    draw(context: any){
        this.drawRectangle(context);
        //this.drawLine(context);
    }

    drawRectangle(context: any){
        const { colum = 10, row = 10 } = this.pos;
        context.lineWidth = "1";
        context.strokeStyle = "white";
        context.beginPath();
        context.rect(colum * this.size, row * this.size, this.size, this.size);
        context.stroke();
    }

    drawLine(context:any){
        const { colum = 10, row = 10 } =  this.pos;
        context.lineWidth = "1";
        context.strokeStyle = "blue";
        context.beginPath();
        context.moveTo(colum * this.size, row * this.size);
        context.lineTo(colum * this.size+1, row * this.size+1);
        context.stroke();
    }

    static getNewTile = (tileSize: number, tilePosition: BoardPosition) => {
        const size = tileSize || 100;
        const position: BoardPosition = tilePosition|| {row:0, colum:0 }
        const tileParams : TileParams = {
            position ,
            size
        }
        const newTile = new Tile(tileParams);
        return newTile;
    }
}

//export const 

export default Tile;