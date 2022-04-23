import React from "react";
import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

// Example of a checkbox function to track state
function ChekcboxExample({ challenges = [] }) {
  const [checked, setChecked] = useState("");

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={challenges.check}
            onChange={(e) => setChecked(e.target.checked)}
            color="primary"
            inputProps={{
              "aria-label": "secondary checkbox",
            }}
          >
            Hello
          </Checkbox>
        }
        label=""
      />
    </div>
  );
}

const ChallengeList = ({ challenges = [] }) => {
  if (!challenges.length) {
    return <h3>No Challenge Yet</h3>;
  }

  return (
    <div>
      {challenges &&
        challenges.map((challenge) => (
          <div>
            <div key={challenge._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0 display-flex">
                <ChekcboxExample {...challenges} />
                {challenge.challengeName}
              </h4>
              <p>{challenge.location?.address1}</p>
              <p>{challenge.location?.address2}</p>
              <p>{challenge.location?.city}</p>
              <p>{challenge.location?.state}</p>
              <p>{challenge.location?.zipCode}</p>
              <p>{challenge.todo}</p>
              {/* Possibly deletechallenge here if not on challengePage

             <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/challenge/${challenge._id}`}
            >
              Join the challenge.
            </Link> */}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChallengeList;
