"use client";
import axio from "axios";
import { useEffect, useState } from "react";

const QuizApp = () => {
  useEffect(() => {
    axio.get("http://localhost:5000/api/quizzes").then((response) => {
      console.log(response.data);
    });
  }, []);
  const [selected, setSelected] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(5);
  const [completedQuestions, setCompletedQuestions] = useState([0, 1, 2, 3, 4]);
  const options = [
    { id: 1, text: "120 m" },
    { id: 2, text: "240 m" },
    { id: 3, text: "300 m" },
    { id: 4, text: "None of these" },
  ];

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-auto">
      <div className="mt-3 mb-3 bg-white w-4/5 max-w-4xl rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="text-center py-4 border-b">
          <h1 className="text-2xl font-semibold">Quiz Title</h1>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Quiz Section */}
          <div className="flex-1 p-4">
            {/* Question */}
            <div className="mb-4 border border-blue-600 p-4 rounded-lg">
              <h2 className="text-md font-semibold mb-2">Question 1</h2>
              <p className="text-black text-sm">
                A train passes a station platform in 36 seconds and a man
                standing on the platform in 20 seconds. If the speed of the
                train is 54 km/hr, what is the length of the platform?
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
              {options.map(({ id, text }) => (
                <label
                  key={id}
                  onClick={() => setSelected(id)}
                  className={`block border p-2 rounded-lg cursor-pointer ${
                    selected === id
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {text}
                </label>
              ))}
            </div>
            {/* Navigation Buttons */}
            <div className="flex space-x-10 justify-center">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Prev
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                Next
              </button>
            </div>

            {/* Explanation */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Explanation</h3>
              <p className="text-gray-700 mt-2">
                A train passes a station platform in 36 seconds and a man
                standing on the platform in 20 seconds. If the speed of the
                train is 54 km/hr, what is the length of the platform?
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-gray-100 border-l p-4">
            <div className="text-center mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Question 1/8</h3>
              <a href="#" className="text-black hover:underline">
                Need Help?
              </a>
            </div>
            {/* Question Navigator */}
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 20 }, (_, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-full ${
                    index === currentQuestion
                      ? "bg-red-300 text-white" // Light-red for the current question
                      : completedQuestions.includes(index)
                      ? "bg-blue-300 text-white" // Light-blue for completed questions
                      : "bg-gray-200 hover:bg-gray-300" // Default gray
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
