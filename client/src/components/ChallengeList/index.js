import React from 'react';
import { Link } from 'react-router-dom';

const ChallengeList = ( {challenges=[]} ) => {
  if (!challenges.length) {
    return <h3>No Challenge Yet</h3>;
  }

  return (
    <div>
      {challenges&&
        challenges.map((challenge) =>
         (
          <div key={challenge._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              
                
                  {challenge.challengeName}
                  <br/>
                  {challenge.todo} 
                
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