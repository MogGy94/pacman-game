import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Scene  from 'classes/Scene';
//import Scene from './Scene';

import './Slide_2.css'
//const iterable = Array.from(Array(n).keys());

//console.log(scene.getCircles());3.

//this scehe should be global
//const scene = new Scene(500);

const mouse = {
    clientX: 300,
    clientY: 500
}
const GameScene = (props:any) => {
    const {scene} = props;
    const requestRef:any = useRef();
    const previousTimeRef:any = useRef();
    const canvas_ref:any = useRef();
    const gameArea_ref: any = useRef();

    // const [canvasW, setCanvasW] = useState(300);
    // const [canvasH, setCanvasH] = useState(300);
    
    const [canvasW, setCanvasW] = useState(0);
    const [canvasH, setCanvasH] = useState(0);

    const [mousePosition, setMousePosition] = useState(mouse);

    const handleMouseMove = (e:any) => {
        const { current }: { current: any } = canvas_ref;
        const { clientX, clientY } = e;

        setMousePosition({ 
            clientX: clientX ,//- current.offsetLeft ,
            clientY: clientY //- current.offsetTop 
        });
    }

    const cleanCanvas = () => {
        const { current }: { current: any } = canvas_ref;
        const context = current.getContext('2d');
        context.fillStyle = "#00000022";
        context.globalCompositeOperation = "source-over";
        context.fillRect(0, 0, canvasW, canvasH);
    }
    
    useEffect(() => {
        if(canvas_ref.current !== undefined){
            console.log({ob:canvas_ref.current});
            const W = gameArea_ref.current.parentElement.clientWidth
            const H = gameArea_ref.current.parentElement.clientHeight
            setCanvasW(W);
            setCanvasH(H);
            scene.init();
            scene.buildSceneRules({width:W, height: H})
        }
       //se nita para inicializar el context 
    }, [])

    useEffect(() => {
        const handleRezice = () => {
            //console.log({ ob: canvas_ref.current });
            const W = gameArea_ref.current.parentElement.clientWidth
            const H = gameArea_ref.current.parentElement.clientHeight
            setCanvasW(W);
            setCanvasH(H);
            //setCanvasW(window.innerWidth);
            //setCanvasH(window.innerHeight);
            //scene.init();
            
            //cleanCanvas();
            //console.log({ innerWidth, innerHeight });
        }
        window.addEventListener('resize',handleRezice);
        return () => window.removeEventListener('resize', handleRezice);
    }, []);
     
    /*
        const render = (deltaTime: any) => {
        //console.log(deltaTime);
    } */

    const animate = (time:any) => {
        const paramas = {
            pointRange: 200,
            point: {
                x: mousePosition.clientX,
                y: mousePosition.clientY
            },
        }

        if (previousTimeRef.current !== undefined && canvas_ref.current) {
            const { current }: { current: any } = canvas_ref;
            const context = current.getContext('2d');
            const deltaTime = time - previousTimeRef.current;
            cleanCanvas();
            scene.sceneLoop(context,paramas);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }

    //useAnimationFrame({ mousePosition, callback: render });

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [mousePosition]); // Make sure the effect runs only once

    return (
        <div className="game-layout__gameScene">
            <div 
                ref={gameArea_ref}
                className="game-area" 
                onMouseMove={handleMouseMove}
            >
                {/* <pre>
                    {
                        JSON.stringify(mousePosition, null, 2)
                    }
                </pre> */}
                <canvas
                    ref={canvas_ref}
                    id="game-canvas"
                    width={canvasW}
                    height={canvasH}
                />
                {/* <h1 className="game-layout__title">PACMAN</h1> */}
            </div>
        </div>
    )
}

export default GameScene;