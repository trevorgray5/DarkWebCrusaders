import React, { useState, useEffect} from 'react'
import App from './App.js'
import $ from 'jquery'

let newTask = {'id': 0, 'title': "Simple Task New", 'desc': "simple description", 'dueDate': "1/1/1", "tags": ['test', 'test1'], "status": "incomplete", 'completed' : false};

function TaskCards(props) {

    let [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
        let newTask = {
            title: $('#boxTitleText').val(),
            desc: $('#boxDescriptionText').val(),
            dueDate : $('#boxDueDateText').val(),
            tags : $('#boxTagsText').val().split(',').map(tag => tag.trim()),
        }
        fetch(App.baseAPI + "/api/v1/tasks/createTask", {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response => response.json()))
            .then(data => {
                if (data.success) {
                    // set task id from the id returned by the API
                    const newId = data.insertedId;
                    // add task with new id to task array
                    const updatedTask = { ...newTask,
                        _id: data.insertedId,
                        title: newTask.title,
                        desc: newTask.desc,
                        dueDate: newTask.dueDate,
                        tags: newTask.tags,
                        status: "incomplete",
                        completed: false
                    };
                    // update tasks
                    setTasks((prevTasks) => prevTasks.concat(updatedTask));
                }
            })
    }
    TaskCards.addTask = addTask;

    /* newly implemented api removetask*/
    function removeTask (taskId) {
        // Send a request to the API to delete the task by its ID
        fetch(App.baseAPI + `/api/v1/tasks/deleteTaskByID/${taskId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // If the task was successfully deleted online, remove it locally <- this should be handled the other way around but is fine for school. -Justin
                    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
                } else {
                    alert('Task deletion failed. Please try again.');
                }
            })
    }
    TaskCards.removeTask = removeTask;

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
        //The map lets us find the specific task to get the info that won't change such as status and complete
        tasks.map((task) => {
            if (task._id === taskId) {
                let newTaskData = {
                    'title': editedTitle,
                    'desc': editedDesc,
                    'dueDate': editedDueDate,
                    "tags": editedTags.split(',').map(tag => tag.trim()),
                    "status": task.status,
                    'completed' : task.completed
                }
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
             tasks.map((task) => {
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
                        setIsLoading(false);
                    } else {
                        //Do nothing grab probably failed due to pull limit due to using the free mongodb option
                        //This will essentially try again till the timeout is done
                    }
                });
        }
    })

    return (
        <section className="cardContainer">
            <div className={`${isLoading ? 'LoadingScreen' : 'hideLoading'}`}>
                <svg width={`${isLoading ? '100' : '0'}`} height={`${isLoading ? '100' : '0'}`} viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                            <stop stop-color="#fff" stop-opacity="0" offset="0%"/>
                            <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>
                            <stop stop-color="#fff" offset="100%"/>
                        </linearGradient>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                        <g transform="translate(1 1)">
                            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 18 18"
                                    to="360 18 18"
                                    dur="0.9s"
                                    repeatCount="indefinite" />
                            </path>
                            <circle fill="#fff" cx="36" cy="18" r="1">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 18 18"
                                    to="360 18 18"
                                    dur="0.9s"
                                    repeatCount="indefinite" />
                            </circle>
                        </g>
                    </g>
                </svg>
            </div>
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