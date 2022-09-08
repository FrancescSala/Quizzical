import React, { useRef } from 'react';
import initbckgr from './images/bckgr.png';
import topics from './categories';

export default function InitialScreen(props) {
    let refList = useRef(null); // to refrence the topic chosen by user. No need to make it as a controled input

    function startQuiz() {
        // after few checkings on the topic chosen by user, it triggers the start of the quiz
        let category = refList.current.value;
        if (category === '') return; // no topic has been selected, do nothing
        if(category === 'random')    // user slected option 'Random topic from list below', let's pic then a random cateogry
            category = Math.round(Math.random()* 23) + 9;  // a random integer number between 9 and 32
        props.startQuiz(category);
    }
     
    let bckImage = {backgroundImage: `url(${initbckgr})`};
    return(
        <div className='init--container' style={bckImage}>
            <h1 className='init--title'>Quizzical</h1>
            <div className='init--topics'>
                <label className='init--topiclabel' htmlFor="topic">Topic</label>
                <select className='init--topicselection' id="topic" name="topic" ref={refList}>
                    <option value="" key="">-- Choose one topic --</option>
                    <option value="random" key="random">Random topic from list below</option>
                    {topics.map(elem => <option value={elem.code.toString()} key={elem.code.toString()}>{elem.name}</option>)}
                </select>
            </div>
            <h2 className='init--description'>Check your knowledge answering a test of 5 questions about a topic of your choice. Select a topic from the list and press the "Start quiz" button when you are ready. Good luck!</h2>
            <button className='init--button' onClick={startQuiz}>Start quiz</button>
        </div>
    );
}
