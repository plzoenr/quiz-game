import './App.css';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import parse from 'html-react-parser';
import QuizOption from "./QuizOption";
import { useNavigate } from 'react-router-dom';
function App() {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (quiz.length !== 20) {
      fetch(`https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results !== undefined) {
            setQuiz(data.results);
            shuffleChoices(data.results);
          } else {
            console.log("Quiz data is null");
          }
          setLoading(false);
        }).catch((err) => {
        setLoading(false);
        console.log("Error:", err);
      });
    }
  }, [quiz]);

  const shuffleChoices = (quizData) => {
    const shuffled = quizData.map((quizItem) => {
      const choices = [quizItem.correct_answer, ...quizItem.incorrect_answers];
      return shuffle(choices);
    });
    setShuffledChoices(shuffled);
  };

  const shuffle = (array) => {
    let currentIndex = array.length
    let temporaryValue = ''
    let randomIndex = ''

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };


  const handleAnswerSelection = (questionIndex, selectedOption, actualValue, actualIndex) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [actualIndex]: actualValue
    }));

    let element = document.querySelector(`input[name=${questionIndex}]`)
    if (selectedOption === 'correct') {
      element.parentNode.style = 'background:green; color:white; padding: 5px; border-radius: 8px;';
    } else {
      element.parentNode.style = 'background:red; color:white; padding: 5px; border-radius: 8px;';
    }
    disableFormAfterChoose(element)
  };

  const disableFormAfterChoose = (element) => {
    const all_input = element.closest('.question').querySelectorAll('.answer input')
    const input_array = [...all_input];

    input_array.map(item => {
      item.disabled = 'disabled'
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    processScore()

    navigate('/summary',
      { state: { selectedAnswers: selectedAnswers } }
    );
  };

  const processScore = () => {
    let score = 0

    quiz.map(function(quizItem, main_index) {
      if(quizItem.correct_answer === selectedAnswers[main_index]) {
        score += 1;
      }
    });

    localStorage.setItem('quiz_score', score)
  }

  return (
    <div className="card">
      <div className="card-body">
        {loading ? (
          <div>...Data Loading.....</div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            {quiz.map((quizItem, main_index) => (
              <div key={main_index} className={`question question_${main_index}`}>
                <div className="question">
                  <label className="form-label mt-2">{main_index + 1}. {parse(quizItem.question)}</label>
                </div>
                <div className="answer">
                  {shuffledChoices.length > 0 && shuffledChoices[main_index].map((choice, index) => (
                    <QuizOption
                      key={index}
                      name={`option_${main_index}_${index}`}
                      value={choice}
                      onChange={() => handleAnswerSelection(`option_${main_index}_${index}`, choice === quizItem.correct_answer ? 'correct' : 'incorrect', choice, main_index)}
                      label={parse(choice)}
                    />
                  ))}
                </div>
              </div>
            ))}

            <button type="submit" className="btn btn-primary mt-2 w-100">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
