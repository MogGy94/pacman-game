import React from 'react';
import Scene from 'classes/Scene'

import GameScene ,{
  Score,
  LvViewer,
  GameStats,
  Jum
} from 'components';


import './App.css';

const scene = new Scene(500);

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
