import React from 'react';

interface QuizOptionProps {
    name: string;
    value: string;
    onChange: () => void;
    label: React.JSX.Element;
    key: string
}
const QuizOption: React.FC<QuizOptionProps> = ({ name, value, onChange, label, key}) => {
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
