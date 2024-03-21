import React from 'react';

const QuizOption = ({ key, name, value, onChange, label }) => {
  return (
    <div className="radio">
      <label>
        <input
          type="radio"
          className="answerInput"
          key={key}
          name={name}
          value={value}
          onChange={onChange}
        />
        <span className="ms-2">{label}</span>
      </label>
    </div>
  );
};

export default QuizOption;
