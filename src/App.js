import React, { useState } from 'react';
import InitialScreen from './InitialScreen';
import QuizScreen from './QuizScreen';



export default function App() {
    let [isQuizStarted, setIsQuizStarted] = useState(false);
    let [category, setCategory] = useState('0');

    function startQuiz(cat) {
        if (cat !== '0') {
            setCategory(cat);
            setIsQuizStarted(true);
        }
    }

    return(
        <>
            {isQuizStarted ? <QuizScreen category={category}/> : <InitialScreen startQuiz={startQuiz} />}
        </>
    );
}