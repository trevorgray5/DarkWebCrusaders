import React, { useState, useEffect} from 'react'


let newTask = {'id': 0, 'title': "Simple Task New", 'desc': "simple description", 'dueDate': "1/1/1", "tags": ['test', 'test1'], "status": "incomplete"};

function TaskCards(props) {

    let [tasks, setTasks] = useState([{'id': 0, 'title': "Simple Task", 'desc': "simple description", 'dueDate': "1/1/1", "tags": ['test', 'test1'], "status": "incomplete"}]);

    function addTask(task){
        // Increase the tasks' id by one to make each task unique
        const newId = Math.max(...tasks.map((task) => task.id), 0) + 1;
        // add task with new id to task array
        const updatedTask = { ...newTask, id: newId };
        // update tasks
        setTasks((prevTasks) => prevTasks.concat(updatedTask));
    }

    function removeTask (taskId) {
        // removes task based on id
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }

    function editTask(task) {

    }

    function completeTask (task) {

    }

    useEffect(() => {
    })

    return (
        <section class="cardContainer">
            {tasks.map(task => (
                <div>
                    {task.status == 'incomplete'? <div class="card">
                        <p class="cardDueDate">{task.dueDate}</p>
                        <div>
                            <h1 class="cardTitle">{task.title}</h1>
                            <p class="cardDescription">{task.desc}</p>
                            <div class="cardTags">
                                {task.tags.map((tag) => (
                                    <h2 class="tag">{tag}</h2>
                                ))}
                            </div>
                        </div>
                        {/* Add callback function to buttons below */}
                        <button class="accentButton cardButton" onClick={/*Just to test this will need changed*/() => addTask(newTask)}style={{"margin-left": "auto"}}>Complete</button>
                        <button class="accentButton cardButton" style={{"margin-right": "0px"}}>Edit</button>
                        <button class="accentButton cardButton" onClick={() => removeTask(task.id)}style={{"margin-right": "50px"}}>Delete</button>
                    </div>:  <div class="card">
                        <p class="cardDueDate" style={{"text-decoration": "line-through", "color": "gray"}}>{task.dueDate}</p>
                        <div>
                            <h1 class="cardTitle" style={{"text-decoration": "line-through", "color": "gray"}}>{task.title}</h1>
                            <p class="cardDescription" style={{"text-decoration": "line-through", "color": "gray"}}>{task.desc}</p>
                            <div class="cardTags">
                                {task.tags.map((tag) => (
                                    <h2 class="tag">{tag}</h2>
                                ))}
                            </div>
                        </div>
                        {/* Add callback function to buttons below */}
                        <button class="accentButton cardButton" style={{"margin-left": "auto"}}>Uncomplete</button>
                        <button class="accentButton cardButton" style={{"margin-right": "0px"}}>Edit</button>
                        <button class="accentButton cardButton" style={{"margin-right": "50px"}}>Delete</button>
                    </div>}
                    <div class="accentLine" />
                </div>
            ))}
        </section>
    );
}

export default TaskCards