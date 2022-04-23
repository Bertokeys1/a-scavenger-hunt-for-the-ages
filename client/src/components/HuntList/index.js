import React from 'react';
import { Link } from 'react-router-dom';

const HuntList = ( {hunts, title,} ) => {
  if (!hunts.length) {
    return <h3>No Hunt Yet</h3>;
  }

  return (
    <div>
      {<h3>{title}</h3>}
      {hunts&&
        hunts.map((hunt) =>
         (
          <div key={hunt._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              
                <Link
                  className="text-light"
                  to={`/hunts/${hunt._id}`}
                >
                  {hunt.huntName} 
                </Link>
            </h4>
            {/* Possibly deleteHunt here if not on HuntPage
             <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/hunt/${hunt._id}`}
            >
              Join the hunt.
            </Link> */}
          </div>
        ))}
    </div>
  );
};

export default HuntList;
