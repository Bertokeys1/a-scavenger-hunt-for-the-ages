import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ChallengeList from "../components/ChallengeList";

import { QUERY_SINGLE_HUNT } from "../utils/queries";
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


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {hunt.huntName} <br />
      </h3>
      <div className="col-12 col-md-10 mb-5">
          <ChallengeList
            challenges={hunt.challenges}
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
