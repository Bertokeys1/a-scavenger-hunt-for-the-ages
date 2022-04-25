import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { render } from 'react-dom'
import ChallengeList from "../components/ChallengeList";

import { QUERY_SINGLE_HUNT } from "../utils/queries";
import { DELETE_HUNT } from "../utils/mutations"
import ChallengeForm from "../components/ChallengeForm";

const SingleHunt = () => {
  // Use `useParams()` to retrieve value of the route parameter `:huntId`
  const { huntId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_HUNT, {
    // pass URL parameter
    variables: { huntId: huntId },
  });

  const hunt = data?.hunt || {};
  console.log(data);
  
  // const [deleteHunt, { error }] = useMutation(DELETE_HUNT);
  // const navigate = useNavigate();
  // const handleDelete = async (event) => {

    
    
  //   try {
  //     const data = await deleteHunt({ 
  //       variables: {
  //         id: huntId
  //       }
  //     })
  //     return data, navigate('/me');
      
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-3">
      <h3 className="display-flex card-header bg-dark text-light p-2 m-0 ">
        {hunt.huntName} <br />
        {/* <Button 
        huntId={hunt._id}
        onClick={handleDelete} 
        variant="contained" 
        color="warning" 
        size="small" 
        endIcon={<DeleteIcon />}>
          Discard      
        </Button> */}
      </h3>
      <div className="col-12 mb-5">
          <ChallengeList
            challenges={hunt.challenges}
            huntId={huntId}
          />
        </div>
      <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <ChallengeForm
          huntId= {huntId}
        />
      </div>
    </div>
  );
};

export default SingleHunt;
