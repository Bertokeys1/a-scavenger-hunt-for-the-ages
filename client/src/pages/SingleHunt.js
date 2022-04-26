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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ justifyContent: "center", paddingLeft: "12%", height: "30%", width: "80%"}}>

      <h1 className="display-flex p-2 m-0 ">
        {hunt.huntName} <br />
      </h1>
      <div className="col-12 mb-5">

          <ChallengeList
            challenges={hunt.challenges}
            huntId={huntId}
            />
        </div>
      <div className="m-3 p-4">
        <ChallengeForm
          huntId= {huntId}
          />
      </div>
    </div>
  );
};

export default SingleHunt;
