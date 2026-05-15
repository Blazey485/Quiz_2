import { useState, useEffect } from "react";
import QuestionCard from "./components/quiz";
import "./css_styles/correct.css";

function App() {
	const [questions, setQuestions] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [quizOver, setQuizOver] = useState(false);
	const [userAnswers, setUserAnswers] = useState([]);

	useEffect(() => {
		fetch(
			"https://opentdb.com/api.php?amount=10&type=multiple",
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.response_code === 0) {
					setQuestions(data.results);
				}
			});

		[];
	}, []);

	const handleAnswer = (isCorrect, selectedAnswer) => {
		const currentQuestion = questions[currentIndex];

		const record = {
			question: currentQuestion.question,
			correctAnswer: currentQuestion.correct_answer,
			userChoice: selectedAnswer,
			isCorrect: isCorrect,
		};
		setUserAnswers([...userAnswers, record]);

		if (isCorrect) setScore(score + 1);
		//3 her kontrollerer du hvor kjap det går, altsa current index = spørsmål number
		const nextQuestion = currentIndex + 1;
		if (nextQuestion < questions.length) {
			setCurrentIndex(nextQuestion);
		} else {
			setQuizOver(true);
		}
	};

	if (quizOver) {
		return (
			<>
				{" "}
				<button
					className="try-again1"
					onClick={() => window.location.reload()}
				>
					Try Again
				</button>
				<div className="summary">
					<h1>
						Final Score: {(score / questions.length) * 100}%
					</h1>
					<h2>Review your answers:</h2>
					{userAnswers.map((item, index) => (
						<div
							key={index}
							className="review-item"
						>
							<p
								dangerouslySetInnerHTML={{
									__html: `Question ${index + 1} : ${item.question}`,
								}}
							/>
							<p>
								Your answer: {""}
								<span
									className={
										item.isCorrect
											? "text-correct"
											: "text-wrong"
									}
									dangerouslySetInnerHTML={{
										__html: item.userChoice,
									}}
								/>
							</p>
							<p style={{ fontWeight: "bold" }}>
								{" "}
								Correct Answer:{" "}
								<span
									className="text-correct"
									dangerouslySetInnerHTML={{
										__html: item.correctAnswer,
									}}
								/>
							</p>
						</div>
					))}
					<button
						className="try-again"
						onClick={() => window.location.reload()}
					>
						Try Again
					</button>
				</div>
			</>
		);
	}

	if (questions.length === 0)
		return <h1>Loading Your Quiz....</h1>;

	return (
		<div className="App">
			<QuestionCard
				data={questions[currentIndex]}
				handleAnswer={handleAnswer}
			/>
		</div>
	);
}

export default App;
