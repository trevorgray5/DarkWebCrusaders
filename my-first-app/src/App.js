//import logo from './logo.svg';
import './styles.css';
import React from 'react';
import TaskCard from './taskCard'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap" rel="stylesheet"/>
        <title>Task Master</title>
      </header>
      <body>
        <section class="titleSection">
            <h1 class="appTitle">T a s k  M a s t e r</h1>
        </section>
        <section class="cardContainer">
            <TaskCard data={"test"}/>
            <div class="accentLine" />
        </section>
        <section class="createCard">
            <button class="accentButton">Add Task</button>
        </section>
    </body>
    </div>
  );
}

export default App;

// This is test code again