import axios from "axios";
import { useEffect, useState } from "react";

const QuizApp = () => {
  const [selected, setSelected] = useState(null);
  const [tests, setTests] = useState([]);
  const [testIndex, setTestIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentTest, setCurrentTest] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [completedTest, setCompletedTest] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  // Fetch quizzes on initial load
  useEffect(() => {
    const getTests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/quizzes");
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    getTests();
  }, []);

  // Select a specific test based on index
  const selectTest = (index) => {
    if (tests.length > 0 && index < tests.length) {
      const selectedTest = tests[index];
      setCurrentTest(selectedTest);
      setQuestionIndex(0); // Reset question index when selecting a new test
      setCompletedQuestions([]);
    } else {
      console.error("Invalid test index or tests array is empty.");
    }
  };

  // Automatically select the first test when tests are loaded
  useEffect(() => {
    if (tests.length > 0) {
      selectTest(testIndex);
    }
  }, [tests, testIndex]);

  // Automatically select the first question when the current test changes
  useEffect(() => {
    if (currentTest?.questions?.length > 0) {
      setCurrentQuestion(currentTest.questions[questionIndex]);
    }
  }, [currentTest, questionIndex]);

  const needHelp = () => {
    setShowExplanation((prev) => !prev);
  };
  const checkAnswer = () => {
    if (selectedOption == currentQuestion?.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-auto">
      <div className="mt-3 mb-3 bg-white w-4/5 max-w-4xl rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="text-center py-4 border-b">
          <h1 className="text-2xl font-semibold">
            {currentTest.title || "Quiz Title"}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Quiz Section */}
          <div className="flex-1 p-4">
            {/* Question */}
            <div className="mb-4 border border-blue-600 p-4 rounded-lg">
              <h2 className="text-md font-semibold mb-2">
                Question {questionIndex + 1}
              </h2>
              <p className="text-black text-sm">
                {currentQuestion?.question || "No question available"}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
              {currentQuestion?.options?.map((option, index) => (
                <label
                  key={index}
                  onClick={() => {
                    setSelected(index);
                    setSelectedOption(option);
                    setIsCorrect(null); // Reset correctness when selecting a new option
                  }}
                  className={`block border p-2 rounded-lg cursor-pointer ${
                    isCorrect === null
                      ? selected === index
                        ? "bg-blue-500 text-white border-blue-500"
                        : "border-gray-300 hover:bg-gray-100"
                      : option === currentQuestion?.answer
                      ? "bg-green-500 text-white border-green-500"
                      : selected === index
                      ? "bg-red-500 text-white border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  {option}
                </label>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-10 justify-center">
              <button
                onClick={() => {
                  setSelected(false);
                  setQuestionIndex((prev) => Math.max(0, prev - 1));
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Prev
              </button>
              <button
                onClick={() => {
                  setQuestionIndex((prev) =>
                    Math.min(prev + 1, currentTest.questions.length - 1)
                  );
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Next
              </button>
            </div>

            {showExplanation && (
              <div
                onClick={checkAnswer}
                className="mt-6 border border-gray-300 rounded-lg cursor-pointer p-2"
              >
                <h3 className="text-lg font-semibold">Explanation</h3>
                <p className="text-gray-700 mt-2">
                  {currentQuestion?.explanation || "No explanation available."}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-gray-100 border-l p-4">
            <div className="text-center mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Question {questionIndex + 1}/
                {currentTest.questions?.length || "0"}
              </h3>
              <a onClick={needHelp} className="text-black hover:cursor-pointer">
                Need Help?
              </a>
            </div>
            {/* Question Navigator */}
            <div className="grid grid-cols-5 gap-2">
              {tests.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!completedTest.includes(index)) {
                      setTestIndex(index);
                    }
                  }}
                  disabled={completedTest.includes(index)} // Disable button if test is completed
                  className={`w-10 h-10 rounded-full ${
                    index === testIndex
                      ? "bg-red-300 text-white"
                      : completedTest.includes(index)
                      ? "bg-blue-300 text-white cursor-not-allowed" // Style for completed tests
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
