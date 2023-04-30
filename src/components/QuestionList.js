import React,{useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";
function QuestionList() {
  const[questions, setQuestions]= useState([])
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => setQuestions(questions));
  }, []);
  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  }
  function handleAnswerChange(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",},
      body: JSON. stringify({correctIndex})
    })
    .then((res) => res.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) => {
        if(question.id === updatedQuestion.id) return updatedQuestion;
        return question;
      });
      setQuestions(updatedQuestions);
    })
  }
  const questionItems = questions.map((question) => (
    < QuestionItem key={question.id} question={question} onDelete={handleDeleteClick} onAnswerChange={handleAnswerChange}/>
  ));
 
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}</ul>
    </section>
  );
}

export default QuestionList;
