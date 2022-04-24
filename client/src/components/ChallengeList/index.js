import React from "react";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import {CHECK_CHALLENGE, DELETE_CHALLENGE} from '../../utils/mutations'
import {render} from 'react-dom'

import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";

function CheckboxGroup({challengeId, huntId, chezch}) {

  const [checked, setChecked] = useState(true);
  
  const [checkChallenge, { error }] = useMutation(CHECK_CHALLENGE);
  
  const handleCheck = async (event) => {

    setChecked(event.target.checked)

    try {
      await checkChallenge({
        variables: {
          huntId: huntId,
          challengeId: challengeId
        }});

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={chezch}
            onChange={(e) => {
              setChecked(e.target.checked)
              handleCheck(e)
            }}
            color="primary"
            inputProps={{
              huntId: huntId,
              challengeId: challengeId
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

const ChallengeList = ({ challenges = [], huntId }) => {
  
  const [deleteChallenge, { error }] = useMutation(DELETE_CHALLENGE);

  if (!challenges.length) {
    return <h3>No Challenge Yet</h3>;
  }
  
  return (
    <div>
      {challenges &&
        challenges.map((challenge) => (
            <div key={challenge._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0 display-flex">
                <CheckboxGroup challengeId={challenge._id} huntId={huntId} chezch={challenge.check}/>
                {challenge.challengeName}
                <Button 
                  onClick={async () => {
                    try {
                      return await deleteChallenge({ 
                        variables: {
                          challengeId: challenge._id,
                          huntId: huntId
                        },
                      })
                    } catch (err) {
                      console.error(err);
                    }
                  }} 
                  variant="contained" 
                  color="warning" 
                  size="small" 
                  endIcon={<DeleteIcon />}>
                  Discard      
                </Button>
              </h4>
              <p>{challenge.location?.address1}</p>
              <p>{challenge.location?.address2}</p>
              <p>{challenge.location?.city}</p>
              <p>{challenge.location?.state}</p>
              <p>{challenge.location?.zipCode}</p>
              <p>{challenge.todo}</p>
              
              <p>Link to Google Maps: <a href={`https://www.google.com/maps/search/?api=1&query=${challenge.location?.address1} ${challenge.location?.address2} ${challenge.location?.city} ${challenge.location?.state} ${challenge.location?.zipCode}`}target="_blank" rel="noreferrer">Link</a></p>
              
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
