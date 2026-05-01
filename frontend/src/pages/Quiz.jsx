import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum voting age in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correctAnswer: 1, // index of "18 years"
    explanation: "The 61st Constitutional Amendment Act (1988) lowered the voting age from 21 to 18 years."
  },
  {
    id: 2,
    question: "Which form is used for new voter registration?",
    options: ["Form 6", "Form 7", "Form 8", "Form 8A"],
    correctAnswer: 0,
    explanation: "Form 6 is used for the inclusion of a name in the electoral roll for first-time voters."
  },
  {
    id: 3,
    question: "What does VVPAT stand for?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Voting Verification Print Audit Test",
      "Visual Verification Paper Audit Trail",
      "Voter Validated Print And Track"
    ],
    correctAnswer: 0,
    explanation: "VVPAT is a method of providing feedback to voters using a ballotless voting system."
  },
  {
    id: 4,
    question: "Who appoints the Chief Election Commissioner of India?",
    options: ["Prime Minister", "Chief Justice of India", "President of India", "Parliament"],
    correctAnswer: 2,
    explanation: "The President of India appoints the Chief Election Commissioner and other Election Commissioners."
  },
  {
    id: 5,
    question: "What is the NOTA option on the EVM?",
    options: ["Not on The Agenda", "None of The Above", "No Official To Answer", "New Official To Appoint"],
    correctAnswer: 1,
    explanation: "NOTA allows voters to indicate their disapproval of all the candidates in a voting system."
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswerClick = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Election Knowledge Quiz</h1>
        <p className="text-gray-400">Test your knowledge and earn your "Election Expert" badge!</p>
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="quiz-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm max-w-2xl mx-auto"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-saffron"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold text-white mb-8">
              {quizQuestions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, index) => {
                const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                const isSelected = selectedAnswer === index;
                
                let buttonStyle = "bg-white/5 border-white/10 hover:bg-white/10 text-white";
                if (showResult) {
                  if (isCorrect) {
                    buttonStyle = "bg-green-500/20 border-green-500 text-green-400";
                  } else if (isSelected) {
                    buttonStyle = "bg-red-500/20 border-red-500 text-red-400";
                  } else {
                    buttonStyle = "bg-white/5 border-white/10 text-gray-500 opacity-50";
                  }
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswerClick(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex justify-between items-center ${buttonStyle}`}
                  >
                    <span className="font-medium text-lg">{option}</span>
                    {showResult && isCorrect && <CheckCircle className="text-green-400" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="text-red-400" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation & Next Button */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
                  <p className="text-blue-200 text-sm">{quizQuestions[currentQuestion].explanation}</p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-saffron hover:bg-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  {currentQuestion + 1 === quizQuestions.length ? 'See Results' : 'Next Question'}
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-sm max-w-2xl mx-auto text-center"
          >
            <div className="w-32 h-32 mx-auto bg-saffron/20 rounded-full flex items-center justify-center mb-6">
              <Award className="w-16 h-16 text-saffron" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Quiz Completed!</h2>
            <p className="text-xl text-gray-300 mb-8">
              You scored <span className="text-saffron font-bold text-3xl">{score}</span> out of {quizQuestions.length}
            </p>
            
            {score === quizQuestions.length ? (
              <div className="mb-8 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <h3 className="text-green-400 font-bold mb-2">🎉 Perfect Score!</h3>
                <p className="text-green-200/80">You've earned the "Election Expert" badge!</p>
              </div>
            ) : (
              <div className="mb-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-xl">
                <p className="text-blue-200/80">Good effort! Review the answers and try again to get a perfect score.</p>
              </div>
            )}

            <button
              onClick={resetQuiz}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-bold flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              <RotateCcw size={20} />
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
