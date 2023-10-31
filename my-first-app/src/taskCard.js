import React, { useState, useEffect} from 'react'
import App from './App.js'
import $ from 'jquery'

let newTask = {'id': 0, 'title': "Simple Task New", 'desc': "simple description", 'dueDate': "1/1/1", "tags": ['test', 'test1'], "status": "incomplete", 'completed' : false};

function TaskCards(props) {

    let [tasks, setTasks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currStyle, newStyle] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    let hackieFix = isOpen;
    if (hackieFix) {
        //nothing
    }
    const changeStyle = () => {
        newStyle(!currStyle);           
    }

    function addTask(task){
        // Increase the tasks' id by one to make each task unique
        const newId = Math.max(...tasks.map((task) => task._id), 0) + 1;
        // add task with new id to task array
        const updatedTask = { ...newTask, id: newId, 
                                          title: $('#boxTitleText').val(), 
                                          desc: $('#boxDescriptionText').val(), 
                                          dueDate : $('#boxDueDateText').val(),
                                          tags : $('#boxTagsText').val().split(',').map(tag => tag.trim()),
                                        };
        // update tasks
        setTasks((prevTasks) => prevTasks.concat(updatedTask));
    }
    TaskCards.addTask = addTask;

    function removeTask (taskId) {
        // removes task based on id
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
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
            if (task._id === taskId) {
                return { ...task, ...updatedData };
            }
            return task;
        });
        setTasks(updatedTasks);
        setEditingTaskId(null); // Clear editing state after saving changes
    }
    TaskCards.editTask = editTask;

    //Constants for card Completion button
    const [isCompleted, setIsCompleted] = useState(false);

        // Function to toggle completed status
        const toggleCompletion = (taskId) => {
            let newCompleted = null;
            console.log("completed")
             tasks.map((task) => {
                 console.log("completed")
                    if (task._id === taskId) {
                        newCompleted = !task.completed;
                        let newTaskData = {'title': task.title, 'desc': task.desc, 'dueDate': task.dueDate, "tags": task.tags, "status": task.status, 'completed' : newCompleted}
                        console.log(newTaskData);
                        fetch(App.baseAPI + "/api/v1/tasks/updateTaskByID/" + taskId, {
                            method: "PUT",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newTaskData)
                        })
                    }
             })
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId ? { ...task, completed: newCompleted } : task
                )
            );
        };

    useEffect(() => {
        if (initialLoad) {
            fetch(App.baseAPI + "/api/v1/tasks/getTasks", {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    if ( data.length != null) {
                        setTasks(data)
                        setInitialLoad(false);
                    } else {
                        //Do nothing grab probably failed due to pull limit due to using the free mongodb option
                        //This will essentially try again till the timeout is done
                    }
                });
        }
    })

    return (
        <section className="cardContainer">
            {tasks.map(task => (
                <div key={task._id} className={` ${task.completed ? 'completed completedBackground' : ''}`}>
                    {task.status == 'incomplete'?
                        <div className={`card ${isCompleted ? 'completed' : ''}`}>
                        {/* This is under modification, the check for editing, Nate (10/07/23)*/}
                        {editingTaskId === task._id ? ( // while status is incomplete, check for if a task is being edited or not
                            <div className="editView">
                                <button className="accentButton cardButton" onClick={() => editTask(task._id)} style={{"marginRight": "0px"}} >Save</button>
                                <div className="editFields">
                                    <input className="editInput" type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                                    <input className="editInput" type="text" value={editedDueDate} onChange={(e) => setEditedDueDate(e.target.value)} />
                                    <input className="editInput" type="text" value={editedDesc} onChange={(e) => setEditedDesc(e.target.value)}  />
                                    <input className="editInput" type="text" value={editedTags} onChange={(e) => setEditedTags(e.target.value)} />
                                </div>
                            </div>
                        ) : (
                            <button className="accentButton cardButton" onClick={() => {
                                setEditingTaskId(task._id);
                                // Populate the input fields with the current task data
                                setEditedTitle(task.title);
                                setEditedDueDate(task.dueDate);
                                setEditedDesc(task.desc);
                                setEditedTags(task.tags.join(', '));
                                {setIsOpen(true);}
                            }} style={{ "marginLeft": "30px" }} >Edit</button>
                        )}
                        {/* End of prototype code Nate (10/07/23)*/}
                        <p className={`cardDueDate ${task.completed ? 'completed' : 'uncompleted'}`}>{task.dueDate}</p>
                        <div>
                            <h1 className={`cardTitle ${task.completed ? 'completed' : 'uncompleted'}`}>{task.title}</h1>
                            <p className={`cardDescription ${task.completed ? 'completed' : 'uncompleted'}`}>{task.desc}</p>
                            <div className="cardTags">
                                {task.tags.map((tag) => (
                                    <h2 className="tag">{tag}</h2>
                                ))}
                            </div>
                        </div>
                        
                        {/* Add callback function to buttons below */}
                        <button className={currStyle ? "accentButton cardButton spaceButton" : "accentButton cardButton spaceButton"} onClick={() => {toggleCompletion(task._id); changeStyle();}}
                        style={{"marginLeft": "auto"}}>{task.completed ? "Uncomplete" : "Complete"}</button>
                        
                        
                        <button className="accentButton cardButton" onClick={() => removeTask(task._id)} style={{"marginRight": "50px"}}>Delete</button>
                    </div>:  <div className="card">
                        <p className="cardDueDate" style={{"text-decoration": "line-through", "color": "gray"}}>{task.dueDate}</p>
                        <div>
                            <h1 className="cardTitle" style={{"text-decoration": "line-through", "color": "gray"}}>{task.title}</h1>
                            <p className="cardDescription" style={{"text-decoration": "line-through", "color": "gray"}}>{task.desc}</p>
                            <div className="cardTags">
                                {task.tags.map((tag) => (
                                    <h2 className="tag">{tag}</h2>
                                ))}
                            </div>
                        </div>
                        {/* Add callback function to buttons below */}
                        <button className="accentButton cardButton" style={{"marginLeft": "auto"}}>Uncomplete</button>
                        <button className="accentButton cardButton" style={{"marginRight": "50px"}}>Delete</button>
                    </div>}
                    <div className="accentLine" />
                </div>
            ))}
        </section>
    );
}

export default TaskCards