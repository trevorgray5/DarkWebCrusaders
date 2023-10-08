import React, { useState, useEffect} from 'react'
import Modal from './Modal';

let newTask = {'id': 0, 'title': "Simple Task New", 'desc': "simple description", 'dueDate': "1/1/1", "tags": ['test', 'test1'], "status": "incomplete"};

function TaskCards(props) {

    let [tasks, setTasks] = useState([{'id': 0, 'title': "Simple Task", 'desc': "simple description", 'dueDate': "1/1/1", "tags": ['test', 'test1'], "status": "incomplete"}]);
    const [isOpen, setIsOpen] = useState(false);

    function addTask(task){
        // Increase the tasks' id by one to make each task unique
        const newId = Math.max(...tasks.map((task) => task.id), 0) + 1;
        // add task with new id to task array
        const updatedTask = { ...newTask, id: newId };
        // update tasks
        setTasks((prevTasks) => prevTasks.concat(updatedTask));
    }
    TaskCards.addTask = addTask;

    function removeTask (taskId) {
        // removes task based on id
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
    TaskCards.removeTask = removeTask;

    /* 
    * function is almost complete but only takes one character of input
    */
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDueDate, setEditedDueDate] = useState('');
    const [editedDesc, setEditedDesc] = useState('');
    const [editedTags, setEditedTags] = useState('');

    function editTask(taskId) {
        const updatedData = {
            title: editedTitle,
            dueDate: editedDueDate,
            desc: editedDesc,
            tags: editedTags.split(',').map(tag => tag.trim()),
        };

        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, ...updatedData };
            }
            return task;
        });
        setTasks(updatedTasks);
        setEditingTaskId(null); // Clear editing state after saving changes
    }
    TaskCards.editTask = editTask;

    function completeTask (task) {

    }
    TaskCards.completeTask = completeTask;

    useEffect(() => {
    })

    return (
        <section class="cardContainer">
            {tasks.map(task => (
                <div key={task.id}>
                    {task.status == 'incomplete'? <div class="card">
                        {/* This is under modification, the check for editing, Nate (10/07/23)*/}
                        {editingTaskId === task.id ? ( // while status is incomplete, check for if a task is being edited or not
                            <div>
                                <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                                <input type="text" value={editedDueDate} onChange={(e) => setEditedDueDate(e.target.value)} />
                                <input type="text" value={editedDesc} onChange={(e) => setEditedDesc(e.target.value)}  />
                                <input type="text" value={editedTags} onChange={(e) => setEditedTags(e.target.value)} />

                                <button className="accentButton cardButton" onClick={() => editTask(task.id)} style={{ "margin-right": "0px" }} >Save</button>
                            </div>
                        ) : (
                            <button className="accentButton cardButton" onClick={() => {
                                setEditingTaskId(task.id);
                                // Populate the input fields with the current task data
                                setEditedTitle(task.title);
                                setEditedDueDate(task.dueDate);
                                setEditedDesc(task.desc);
                                setEditedTags(task.tags.join(', '));
                                
                            }} style={{ "margin-left": "30px" }} >Edit</button>
                        )}
                        {/* End of prototype code Nate (10/07/23)*/}
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

                        <button class="accentButton cardButton" style={{"margin-left": "auto"}}>Complete</button>

                        
                        <button class="accentButton cardButton" onClick={() => removeTask(task.id)} style={{"margin-right": "50px"}}>Delete</button>
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
                        <button class="accentButton cardButton" style={{"margin-right": "50px"}}>Delete</button>
                    </div>}
                    <div class="accentLine" />
                </div>
            ))}
        </section>
    );
}

export default TaskCards