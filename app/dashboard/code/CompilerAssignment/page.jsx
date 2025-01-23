
"use client"

import axios from 'axios';
import '../../../../app/globals.css';
import React, { useState } from 'react';

function AddAssignment() {
    const [assignmentName, setAssignmentName] = useState('');
    const [questions, setQuestions] = useState([
        {
            company: '',
            questionName: '',
            description: '',
            topic: '',
            marks: '',
            arguments: '',
            inputs: '',
            executiontime: '',
            memory: '',
            function: '',
            testCases: [{ input: '', output: '', marks: '' }],
            selectedLevels: [],
        },
    ]);
    const [faculties, setFaculties] = useState([]);
    const [students, setStudents] = useState([]);
    const [visibility, setVisibility] = useState('true');
    const [errors, setErrors] = useState({}); // for form validation

    const validateFields = () => {
        const newErrors = {};
        questions.forEach((question, index) => {
            if (!question.questionName) newErrors[`questionName-${index}`] = 'Question name is required';
            if (!question.marks) newErrors[`marks-${index}`] = 'Marks are required';
        });
        if (!assignmentName) newErrors.assignmentName = 'Assignment name is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleQuestionChange = (index, e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][e.target.name] = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleTestCaseChange = (questionIndex, testCaseIndex, e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].testCases[testCaseIndex][e.target.name] = e.target.value;
        setQuestions(updatedQuestions);
    };

    const handleAddTestCase = (questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].testCases.push({ input: '', output: '', marks: '' });
        setQuestions(updatedQuestions);
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                company: '',
                questionName: '',
                description: '',
                topic: '',
                marks: '',
                arguments: '',
                inputs: '',
                executiontime: '',
                memory: '',
                function: '',
                testCases: [{ input: '', output: '', marks: '' }],
                selectedLevels: [],
            },
        ]);
    };

    const handleDiscardQuestion = (index) => {
        const updatedQuestions = questions.filter((_, idx) => idx !== index);
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (validateFields()) {
            const assignmentData = {
                assignmentName,
                questions,
                faculties,
                students,
                visibility,
            };
            console.log('Assignment Data:', assignmentData);
            axios.post('/api/code-assignment', assignmentData, {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true, // Ensure cookies are sent along with the request
              })
                .then((response) => {
                  console.log('Assignment Data Saved:', response.data);
                  // Handle success
                })
                .catch((error) => {
                  console.error('Error saving assignment:', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" p-6 pt-0 w-full mx-auto bg-white rounded-lg shadow-lg">
           
           <h1 className="text-xl p-2 font-semibold text-center text-gray-800 mb-6  border-gray-800">
  <u>Add Code Assignment</u>
</h1>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Code Assignment Name</label>
                <input
                    type="text"
                    value={assignmentName}
                    onChange={(e) => setAssignmentName(e.target.value)}
                    className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.assignmentName && <p className="text-red-500 text-sm mt-2">{errors.assignmentName}</p>}
            </div>

            {questions.map((question, index) => (
                <div key={index} className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">Question {index + 1}</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={question.company}
                                onChange={(e) => handleQuestionChange(index, e)}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Question Name</label>
                            <input
                                type="text"
                                name="questionName"
                                value={question.questionName}
                                onChange={(e) => handleQuestionChange(index, e)}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            />
                            {errors[`questionName-${index}`] && (
                                <p className="text-red-500 text-sm mt-2">{errors[`questionName-${index}`]}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                rows="4"
                                name="description"
                                value={question.description}
                                onChange={(e) => handleQuestionChange(index, e)}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>




                    </div>









                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Function</label>
                        <textarea
                            name="function"
                            value={question.function}
                            onChange={(e) => handleQuestionChange(index, e)}
                            className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            rows="4"  // Adjust the number of rows to suit your needs
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-6">

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Topic</label>
                            <input
                                type="text"
                                name="topic"
                                value={question.topic}
                                onChange={(e) => handleQuestionChange(index, e)}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Arguments</label>
                            <input
                                type="text"
                                name="arguments"
                                value={question.arguments}
                                onChange={(e) => handleQuestionChange(index, e)}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Inputs</label>
                            <input
                                type="text"
                                name="inputs"
                                value={question.inputs}
                                onChange={(e) => handleQuestionChange(index, e)}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Marks</label>
                            <input
                                type="number"
                                name="marks"
                                value={question.marks}
                                onChange={(e) => handleQuestionChange(index, e)}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            />
                            {errors[`marks-${index}`] && (
                                <p className="text-red-500 text-sm mt-2">{errors[`marks-${index}`]}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Execution Time</label>
                            <input
                                type="text"
                                name="executiontime"
                                value={question.executiontime}
                                onChange={(e) => handleQuestionChange(index, e)}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Memory</label>
                            <input
                                type="text"
                                name="memory"
                                value={question.memory}
                                onChange={(e) => handleQuestionChange(index, e)}
                                className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Test Cases</label>
                        {question.testCases.map((testCase, testCaseIndex) => (
                            <div key={testCaseIndex} className="grid grid-cols-3 gap-6">
                                <div>
                                    <input
                                        type="text"
                                        name="input"
                                        placeholder="Input"
                                        value={testCase.input}
                                        onChange={(e) => handleTestCaseChange(index, testCaseIndex, e)}
                                        className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="output"
                                        placeholder="Output"
                                        value={testCase.output}
                                        onChange={(e) => handleTestCaseChange(index, testCaseIndex, e)}
                                        className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        name="marks"
                                        placeholder="Marks"
                                        value={testCase.marks}
                                        onChange={(e) => handleTestCaseChange(index, testCaseIndex, e)}
                                        className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        ))}

                    </div>
                    <button
                        type="button"
                        onClick={() => handleAddTestCase(index)}
                        className="mt-4 ml-2 p-3 bg-blue-600 text-white rounded-md"
                    >
                        Add Test Case
                    </button>
                    {questions.length > 1 && (
                        <button
                            type="button"
                            onClick={() => handleDiscardQuestion(index)}
                            className="mt-4 p-3 bg-red-600 text-white rounded-md"
                        >
                            Discard Question
                        </button>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={handleAddQuestion}
                className="mt-6 p-3 bg-green-600 text-white rounded-md"
            >
                Add Another Question
            </button>



            <button
                type="submit"
                className="mt-6 w-full p-3 bg-blue-600 text-white rounded-md"
            >
                Submit Assignment
            </button>
        </form>
    );
}

export default AddAssignment;



