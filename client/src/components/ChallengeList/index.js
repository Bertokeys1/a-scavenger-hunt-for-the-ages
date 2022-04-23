import React from 'react';
import { Link } from 'react-router-dom';

const ChallengeList = ( {challenges, title,} ) => {
  if (!challenges.length) {
    return <h3>No Challenge Yet</h3>;
  }

  return (
    <div>
      {<h3>{title}</h3>}
      {challenges&&
        challenges.map((challenge) =>
         (
          <div key={challenge._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              
                <Link
                  className="text-light"

                  to={`/challenges/${challenge._id}`}

                >
                  {challenge.challengeName} 
                </Link>
            </h4>
            {/* Possibly deletechallenge here if not on challengePage

             <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/challenge/${challenge._id}`}
            >
              Join the challenge.
            </Link> */}
          </div>
        ))}
    </div>
  );
};


export default ChallengeList;