import React from 'react';

export default function QuizQuestion(props) {
    let r = props.answers.map((a, indexA) => {
        // a little bit of styling
        const answered  = '#D6DBF5'; // a gray color to use when answering a question, before validating the answer
        const unchosen  = '#F5F7FB'; // same a the background image, to use when not answering a question, before validating the answer
        const correct   = '#94D7A2';  //green color, to show the correct answer when validating answers
        const incorrect = '#F8BCBC'; // red color, to show an incorrect user's answer when validating answers
        let backgroundColor = (a === props.answered) ? answered: unchosen;
        let borderColor = '#293264';
        let color = borderColor;
        if (props.correctionMode) { 
            backgroundColor = (a === props.correctAnswer) ? correct : (a === props.answered) ? incorrect : unchosen;
            borderColor = (a === props.correctAnswer) ? correct : (a === props.answered) ? incorrect : '#4D5B9E';
            color = (a === props.answered && a=== props.correctAnswer) ? 'black': '#4D5B9E'; // to distinguish a correct answer from unanswered question
        }
        let style = {backgroundColor: backgroundColor, border: '1px solid ' + borderColor, color: color};

        return (
            <div 
                key={props.id+'.'+indexA} 
                className='quiz--answer' 
                onClick={() => props.toogleAnswer(props.id+'.'+indexA)}
                style={style}
                >{a}
            </div>);
    });
    
    // the question, its answers and an horizontal line that acts as separator
    // (Note; For the questions and its answers, as never making partial removals or additions, 
    //        there was no need to use any other key than the index in the array)
    return (
        <>
            <p key={'q'+props.index} className='quiz--question'>{props.question}</p>
            <div key={'q'+props.index+'_answers'} className='quiz--answers'>{r}</div>
            <hr key={'sep'+props.index} className='quiz--lineseparator'></hr>
        </>
    );
}

