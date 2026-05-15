import React, { useEffect, useState } from "react";
import "../css_styles/correct.css";

function QuestionCard({ data, handleAnswer }) {
	const [shuffledOptions, setShuffledOptions] = useState(
		[],
	);
	const [selectedAnswer, setSelectedAnswer] =
		useState(null);

	useEffect(() => {
		setSelectedAnswer(null);

		const allAnswers = [
			{ text: data.correct_answer, isCorrect: true },
			...data.incorrect_answers.map((ans) => ({
				text: ans,
				isCorrect: false,
			})),
		];

		for (let i = allAnswers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[allAnswers[i], allAnswers[j]] = [
				allAnswers[j],
				allAnswers[i],
			];
		}
		setShuffledOptions(allAnswers);
	}, [data]);

	const onButtonClick = (option) => {
		setSelectedAnswer(option.text);
		//2 øk vente tiden før neste spøsmål fordi legger merke til at nettsiden "loader" ikke på nytt
		setTimeout(() => {
			handleAnswer(option.isCorrect, option.text);
		}, 600);
	};

	return (
		<div className="card">
			<h2
				dangerouslySetInnerHTML={{ __html: data.question }}
			/>

			<div className="options">
				{shuffledOptions.map((option, index) => {
					let buttonClass = "";
					if (selectedAnswer) {
						if (option.isCorrect) {
							buttonClass = "correct";
						} else if (option.text === selectedAnswer) {
							buttonClass = "wrong";
						}
					}

					return (
						<button
							key={index}
							className={buttonClass}
							onClick={() => onButtonClick(option)}
							disabled={selectedAnswer !== null}
							dangerouslySetInnerHTML={{
								__html: option.text,
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default QuestionCard;
