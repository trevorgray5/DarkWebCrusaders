//import logo from './logo.svg';
import './styles.css';
//import React from 'react';
import TaskCards from './taskCard'
import Modal from './Modal.jsx';
import React, { useState } from "react";
import styles from "./App.module.css";
// This is the dictionary of task, ID should be unique on creation
// Card will render as complete if status = "complete"
// Card will render as incomplete if status = "incomplete"

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [tasks, setTasks] = useState([
    {'id': 0, 'title': "Simple Task", 'desc': "simple description", 'dueDate': "1/1/1", "tags": ['test', 'test1'], "status": "incomplete"}
  ])
  
  return (
    <div className="App">
      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap" rel="stylesheet"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
        <title>Task Master</title>
      </header>
      <div className="accentBackDrop"></div>
      <div className="bodyWorkAround">
        <section className="titleSection">
            <h1 className="appTitle">T a s k  M a s t e r</h1>
        </section>
        <TaskCards />

        <section className="createCard">
          
          <main>
            <button className={styles.accentButton} onClick={() => 
            {setIsOpen(true);}}>Add Task</button>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
          </main>
          
        </section>
      </div>
    </div>
  );
}


export default App;

// This is test code again