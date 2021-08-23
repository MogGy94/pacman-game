export interface Point {
    x: number;
    y: number;
}

export interface Velocity {
    dx: number;
    dy: number;
}

export interface Shape {
    size?: number;
    color?: string;
}

export interface BoardPosition {
    colum?: number;
    row?: number;
}
export const colorArray = [
    "#B3372E",
    "#D6D9BA",
    "#FFA49E",
    "#6A9BCC",
    "#3072B3",
]
