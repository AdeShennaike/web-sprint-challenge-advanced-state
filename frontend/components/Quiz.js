import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

function Quiz(props) {
  const {quiz, answer} = props;

  useEffect(() => {
    props.fetchQuiz()
  },[])

  const handleRightAnswer = () => {
    props.selectAnswer(quiz.answers[0])
  }

  const handleWrongAnswer = () => {
    props.selectAnswer(quiz.answers[1])
  }
  console.log(answer)
  const handleSubmit = () => {
    props.postAnswer(quiz, answer)
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className = {answer === quiz.answers[0] ? 'answer selected' : answer === null ? 'answer' : 'answer'}>
                {quiz.answers[0].text}
                <button onClick = {handleRightAnswer}>
                  {answer === quiz.answers[0] ? 'SELECTED' : answer === null ? 'Select' : 'Select'}
                </button>
              </div>

              <div className = {answer === quiz.answers[1] ? 'answer selected' : answer === null ? 'answer' : 'answer'}>
                {quiz.answers[1].text}
                <button onClick = {handleWrongAnswer}>
                {answer === quiz.answers[1] ? 'SELECTED' : answer === null ? 'Select' : 'Select'}
                </button>
              </div>
            </div>

            <button disabled = {answer === null} onClick = {handleSubmit} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    answer: state.selectedAnswer,
    quiz: state.quiz
  }
}

export default connect(mapStateToProps,actionCreators)(Quiz)
