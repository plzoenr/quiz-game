import React from 'react';
import {Link} from 'react-router-dom';

function Summary() {
  const score = localStorage.getItem("quiz_score")
  const mockUpLeaderBoard = [{
    userName: "Alex Sis",
    score: 17
  }, {
    userName: "JaneGen",
    score: 15
  }, {
    userName: "NoMore",
    score: 10
  }, {
    userName: "Ps.GG",
    score: 8
  }, {
    userName: "YOU",
    score: score
  }]
  const leaderBoardSorted = mockUpLeaderBoard.sort((a, b) => a.score > b.score ? -1 : 1)


  return (
    score ? (
      <div className="p-4">
        <div className="text-body">
          <h2>Summary</h2>
          <table className="table">
            <thead>
            <tr>
              <th>Rank</th>
              <th>UserName</th>
              <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {leaderBoardSorted.map((personalScore, index) => (
              <tr key={index}>
                <td className={personalScore.userName === "YOU" ? 'text-bg-primary' : ''}>{index + 1}</td>
                <td className={personalScore.userName === "YOU" ? 'text-bg-primary' : ''}>{personalScore.userName}</td>
                <td className={personalScore.userName === "YOU" ? 'text-bg-primary' : ''}>{personalScore.score}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <Link to="/">Play Again</Link>
      </div>
    ) : (
      <div>You have no Score. Play first <Link to="/">Play Quiz</Link></div>
    )
  );
}

export default Summary;
