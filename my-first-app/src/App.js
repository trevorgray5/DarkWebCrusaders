//import logo from './logo.svg';
import './styles.css';
import React from 'react';
import TaskCard from './taskCard'

// This is the dictionary of task, ID should be unique on creation
// Card will render as complete if status = "complete"
// Card will render as incomplete if status = "incomplete"
var tasks = [{id: 0, 'title': "Simple Task", 'desc': "simple description", 'dueDate': "1/1/1", "tags": ['test', 'test1'], "status": "incomplete"},
{id: 1, 'title': "Simple Task 2", 'desc': "simple description 2", 'dueDate': "1/1/1", "tags": ['test2', 'test3'], "status": "complete"}];


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap" rel="stylesheet"/>
        <title>Task Master</title>
      </header>
      <div class="accentBackDrop"></div>
      <div class="bodyWorkAround">
        <section class="titleSection">
            <h1 class="appTitle">T a s k  M a s t e r</h1>
        </section>
        <TaskCard tasks={tasks}/>
        <section class="createCard">
            <button class="accentButton">Add Task</button>
        </section>
      </div>
    </div>
  );
}

export default App;

// This is test code again