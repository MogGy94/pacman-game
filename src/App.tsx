import React from 'react';
import Scene,{SceneParams} from 'classes/Scene'

import GameScene ,{
  Score,
  LvViewer,
  GameStats,
  Jum
} from 'components';


import './App.css';

const params: SceneParams ={
  tileSize: 30,
  totCircles: 500
}
const scene = new Scene(params);

function App() {
  return (
    <div className="game-layout">
      <GameScene {...{scene}}></GameScene>
     
      <Score></Score>
      <LvViewer></LvViewer>
      <GameStats></GameStats>
      <Jum></Jum>
    </div>
  );
}

export default App;
