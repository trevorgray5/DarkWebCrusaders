//import React, { useState, useEffect} from 'react'
import React from 'react'

function TaskCard(props) {
    // const [words, setWord] = useState(props.words)

    // useEffect(() => {
    // })

    return (
        <div class="card">
            <p class="cardDueDate">9/21/23</p>
            <div>
                <h1 class="cardTitle">Catch A Frog</h1>
                <p class="cardDescription">Gotta catch a jumpy frog!</p>
                <div class="cardTags">
                    <h2 class="tag">Frog</h2>
                    <h2 class="tag">Water</h2>
                </div>
            </div>
            <button class="accentButton cardButton" style={{"margin-left": "auto"}}>Complete</button>
            <button class="accentButton cardButton" style={{"margin-right": "50px"}}>Edit</button>
        </div>
    );
}

export default TaskCard