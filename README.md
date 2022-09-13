# Quizzical
## Sections
- [Introduction](#introduction)
- [How to play](#how-to-play)
- [Application Requirements](#application-requirements)
- [Functional Description](#functional-description)
- [Source Code](#source-code)
- [To Do](#to-do)
- [Installation instructions](#installation-instructions)
- [Available Scripts](#available-scripts)
- [Credits](#credits)


___

## Introduction

This application is a small game that allows user to take a five-questions quiz about a topic of his/her choice.

___

## How to play
There are two ways to play:
### First way and easier
Just access the following link, where the game is published: <https://francesc-quizzical.netlify.app>

### Second way
If for any reason the link above did not work, you can always download this github repository in your local machine and install the applicaiton. You will find installation instructions here [Installation Instructions](#installation-instructions)

___

## Application requirements
To use the app is necessary:
- Connection to internet
- A web browser:
    - I have tested with: Safari 15.2 (17612.3.6.1.6), Chrome versions 104.0.5112.101 and 105.0.5195.102, and Edge version 105.0.1343.27
    - But it should work also with other versions.

The application display too small in mobile phones, but display well in desktops. (To make the app web responsive is a TO DO item).

___

## Functional Description
### Application screens / User Manual
`Initial screen`

![Initial screen of the application](/documentation_images/00_InitialScreen.png)

Here the user must choose a topic from the list of topics, and then press the button "Start Quiz", as explained in the instructions on the screen.

If no topic is chosen, nothing happens.

The first value in the list of topics, "Random topic from the list below", is not a real topic: if user chooses this option, the application decides which topic the quiz will be about.

`Loading screen`

![Loading questions from server](/documentation_images/01_Loading.png)

After having selected any option from the list and press Start button, the application shows a loading screen as the one below. This indicates that the application is retrieving the questions (5 questions about the chosen topic).
Questions are retrieved from the Open Trivia Data Base server, publishec on the internet.
The loading screen can display less than one seconds or longer, depending on the available internet connection and how busy is the server.

`Questions screen`

![Screen with list of questions](/documentation_images/02_QuizQuestions.png)

When the questions retrieved from the server, the application displays them.
Now the user can select his/her answers.

`Questions with user's answers`

![Questions answered by user](/documentation_images/03_QuizAnswers.png)

User's answers are marked in a different colour.
When user has finished, he/she presses the button "Check answers". The application does not require to answer all questions. But of course, unanswered questions will not be counted as correct.

`Corrected answers`

![Questions with corrected answers](/documentation_images/04_QuizCorrections.png)

Once "Check answers" is pressed, the application shows the corrections:
- if the answer by the user is incorrect, it is marked with pink/redish colour.
- right answers are marked in green color.

In the example above, answers to questions 1 and 4 were correct, while answers to questions 2, 3 qnd 5 where incorrect. 
Note that user did not give any answer to question 3. "True" was the right answer, which the application displays in green, but in a grey font, while in questions 1 and 4 that user answered correctly, the font is black.  

The application counts how many answers were correct, and offers two possibilities to the user:
- play again with the same topic (wich leads to screen , after having retrieved from the server a different set of questions from the same topic)
- play again choosing a different topic, which leads to .

`Congratulations`

![Celebration Screen](/documentation_images/05_Congratulation.png)

Every time user answers all questions corrected, a rain of confetti is displayed.

`Error Screen`

![Screen when errors](/documentation_images/06_Error.png)

If when retrieving questions from the server there is any error, error information is displayed on the screen.

### Navigation diagram
 The diagram below shows the navigation between the diferent screens. Arrows are events.

![Navigation diagram](/documentation_images/navigation.png)

___

## Source Code
The application is written in React JS, and is a single page application. 
Source code is in English, with plenty of comments.

In this application I am using:
 - React functional components
 - Function hooks: useState, useEffect and useRef
 - JSX conditional display
 - Styling in CSS files and also styling embedded in JSX


### List of Components
**App**: This component just renders the InitialScreen component or the QuizScreen component, depending on the state.

**InitialScreen**: Component in charge to display the initial screen.

**QuizScreen**: This component has practically all the logic of the application.

**QuizQuestion**: Component to render one single question of the quiz, with its answers.

**Confetti**: Imported from the package with the same name, this component renders a confetti rain.

**Spinner**: A spinner to indicate when the questions are being retrieved from the server.

The following table lists the React components in the application and for which screens they are responsible for:


SCREENS VS COMPONENTS | Initial Screen | Loading Screen | Questions Screen | Questions with user's answers | Corrected Answers | Congratulations | Error Screen 
:--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: 
App.js | &#9679; |  | &#9679; |  |  |  |  
InitialScreen.js | &#9679; |  |  |  |  |  |  
QuizScreen.js |  |  | &#9679; | &#9679; | &#9679; | &#9679; | &#9679; 
QuizQuestions.js |  |  | &#9679; | &#9679; | &#9679; | &#9679; | &#9679; 
Confetti.js |  |  |  |  |  | &#9679; |  
Spinner.js |  | &#9679; |  |  |  |  |  

Note that, even though I am writting all time about screens, the application is a single page app.


I could have made some things different in the source code:
- In the initial screen could not have used useRef and instead make the input a React controlled input via useState, name and value. But I did not see the point either: it is simple enough as it is.
- I could have used React Router and really have different pages. But th application is small enough to not require this.
- Finally, I could have used useReducer for the logic of the app. Maybe next time.

___

## To Do
1. To make the application web responsive, so displays nicely in any device. (Currently it displays well on desktops but not on mobile phones). This is an important TO DO item.
2. Another potential improvement is to add a time limit for the quiz. With a count down timer, and when arriving to zero user would not be able to further modify andswers and the quiz would be automatically scored.

___

## Installation Instructions
To install the application locally in your computer, follow these steps:
1. Clone the GitHub repository.
2. In the app folder run `npm install`, which will install all the dependencies.
3. Finally run `npm start`. This starts the application in development mode. A browser will start, running the application. If not, open your browser en introduce the URL localhost:3000

Note: While developing this, my version of npom and npx was 8.5.5.
___

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

___

## Credits
This mini project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It is published in internet for free via [Netlify](https://www.netlify.com). 
