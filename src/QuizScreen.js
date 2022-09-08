import React, {useState, useEffect} from 'react';
import quizbckgr from './images/bckgr.png';
import Spinner from './Spinner';
import QuizQuestion from './QuizQuestion';
import Confetti from 'react-confetti';
import App from './App';


export default function QuizScreen(props) {

    // An array of five questions, as part of the state. Each question is an object with attributes:
    // question : the text of the question
    // answers: an array of answers (usually 4, 2 for boolean), each answer is a String
    // correctAnswer: the text of the right answer
    let [questions, setQuestions] = useState([]);

    // another piece of state: correctionMode, true when checking for the answers to the test, false otherwise
    let [correctionMode, setCorrectionMode] = useState(false);

    // another piece of state, the number of correctAnswers
    let [correct, setCorrect] = useState(0);

    // another piece of state, a boolean to trigger retreiving of new questions for a new quiz
    let [ping, setPing] = useState(false);

    // another piece of state, a boolean to indicate if there were errors when retrieving data from OTDB server
    let [errors, setErrors] = useState({errorsFound: false, errorsText: ''});

    // another piece of state, a boolean to indicate if at this moment we are retrieving data from OTDB server
    let [isLoading,setIsLoading] = useState(true);

    // final piece of state, a boolean to indicate re-render of App component (= back to initial screen)
    let [backToInitial, setBackToInitial] = useState(false);

    // load the questions once, from the OPEN TDB website:
    // 5 questions of any kind (multiple answers or boolean answer) and any difficulty, from the category 'Computers'
    useEffect(() => {
        const url = 'https://opentdb.com/api.php?amount=5&category=' + props.category;
        fetch(url)
            .then((res) => { 
                if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);
                else return res.json();
              })
            .then(data => {initializeQuestions(data,url); setIsLoading(false);})
            .catch(error => {
                setIsLoading(false);
                console.log(url);
                console.dir(error);
                console.log(error.response);
                setErrors({errorsFound: true, errorsText: error.message + '. The server might be down or you are not connected to the internet?'});
            });
        // // Note: In this case we do not need to return a clean-up function
        },[ping, props.category]);
      

    // Prepare the list of questions from the data returned by OPEN TDB api.
    // For multiple answer questions: arranges the right question in a random place in the all answers array
    // For boolean answer questions: set the answers always in the order True False
    // Sets the state questions with the prepared data structure
    function initializeQuestions(data){

        // auxiliar function to parse the HTML special characters the we get from OTDB
        function parse(str) {
            const pars = new DOMParser();
            return pars.parseFromString(str, 'text/html').body.textContent;
        }

        let q = [];
        if (data.response_code !== 0) {
            // the data answered from OPEN TDB website indicate there is some error.
            // Let's make some error treatment.
            let text = '';
            switch (data.response_code) {
                case 1: 
                    text = "No Results. Could not return results. The API does not have enough questions for your query.";
                    break;
                case 2: 
                    text = "Invalid Parameter. The request contains an invalid parameter. Arguments passed in are not valid.";
                    break;
                case 3:
                    text = "Token Not Found. Session token does not exist.";
                    break;
                case 4:
                    text = "Token Empty. Session token has returned all possible questions for the specified query. Resetting the token is necessary.";
                    break;
                default:
                    text = `Unexpected response code ${data.response_code}`; 
            }
            setErrors({errorsFound: true, errorsText: text});
        } else {
            // data.response_code is 0, no errors in the data
            data.results.forEach((elem,index) => {
                let a;
                if (elem.type === 'multiple') {
                    // place the correct answer at a random position i
                    let i = Math.round(Math.random()* (elem.incorrect_answers.length+1));
                    a = Array.from(elem.incorrect_answers);
                    a.splice(i,0,elem.correct_answer);
                } else {  // elem.type === 'boolean'
                    a = ['True', 'False'];
                }
                // add the question, replacing all html characters (html entities)
                q.push({
                    question: parse(elem.question),
                    answers: a.map(e => parse(e)),
                    correctAnswer: parse(elem.correct_answer),
                    answered: undefined
                });
            });
            setErrors({errorsFound: false, errorsText: ''});
        }
        setQuestions(q);
    };


    // key identifies the answer being clicked by the user.
    // That answer becomes the answered answer for the question.
    // Clicking on the answer already choosen before leaves the question unanswered.
    function toogleAnswer(key) {
        if (correctionMode) return; // once in correction mode user cannot change his/her answers
        // key has the form qn.m where n is the question number and m is the answer number
        let dot = key.indexOf('.');
        let n = Number(key.slice(1,dot));
        let m = Number(key.slice(dot+1));
        // change the status, forcing to re-render the component, which will show changes in the color of the answers
        setQuestions(prevQuestions => prevQuestions.map((elem, index) => {
                return index !== n ? elem : 
                        ({...elem, answered: elem.answered === elem.answers[m] ? undefined : elem.answers[m] })
            }
        ));
    }

    // count how many answers are correct. And displays right answers in green, wrong answers in red. 
    function checkAnswers() {
        let correctAnswers = questions.reduce((acc,elem) => elem.correctAnswer === elem.answered ? acc + 1 : acc, 0);
        setCorrect(correctAnswers);
        setCorrectionMode(true); // click on answers are now ignored
    }

    // Play another quiz (different questions) from the same topic. 
    function playAgain() { 
        setQuestions([]);
        setIsLoading(true); // display Loading... while fetching the new set of questions
        setPing(prevValue => !prevValue); // to trigger a new fetch of questions
        setCorrectionMode(false); // click on answers now are not ignored
    }

    // this forces to come back to the initial screen, when user must choose a topic
    function restart() {
        setBackToInitial(true);
    }

    // And finally prepare a couple of variables and return the JSX structure
    let questionsBattery = questions.map((q,index) => {
        return (<QuizQuestion {...q} 
                            key={'q'+index} 
                            id={'q'+index} 
                            toogleAnswer={toogleAnswer}
                            correctionMode={correctionMode} />
        );
    });
    let resultText= correctionMode ? `You scored ${correct}/${questions.length} correct answers`: '';
    if (isLoading) {
        return(
            <div className='quiz--container' style={{backgroundImage: `url(${quizbckgr})`}}>
                <div className='quiz--loading'>
                    <div className='quiz--loading--text'>Loading...</div>
                    <Spinner />
                </div>
            </div>
        );
    }
    if (!isLoading && !backToInitial) {
        return(
            <div className='quiz--container' style={{backgroundImage: `url(${quizbckgr})`}}>
                <div className='quiz--group'>
                    {questionsBattery}
                    {!correctionMode && !errors.errorsFound && <button className='quiz--button' onClick={checkAnswers}>Check answers</button>}
                    {correctionMode && !errors.errorsFound && 
                        <div className='quiz--bottombar'>
                            <div className='quiz--resulttext'>{resultText}</div>
                            <button className='quiz--button' onClick={playAgain}>Play again<br/>(same topic)</button>
                            <button className='quiz--button' onClick={restart}>Play again<br/>(choose topic)</button>
                        </div>
                    
                    }
                    {correctionMode && !errors.errorsFound && (correct === questions.length) && <Confetti width={550} height={550}/>}
                    {errors.errorsFound && 
                        <>
                            <div className="quiz--errortitle">ERROR:</div>
                            <div className='quiz--errortext'>{errors.errorsText}</div>
                            <div className='quiz--bottombar'>
                                <div className='quiz--resulttext'></div>
                                <button className='quiz--button' onClick={playAgain}>Play again</button>
                                <button className='quiz--button' onClick={restart}>Play again<br/>(choose topic)</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
    if (backToInitial) {
        return <App />;
    }
}

