import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ChallengeList from "../components/ChallengeList";
// import ChallengeForm from "../components/ChallengeForm";

import { QUERY_SINGLE_HUNT } from "../utils/queries";

const SingleHunt = () => {
  // Use `useParams()` to retrieve value of the route parameter `:huntId`
  const { huntId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_HUNT, {
    // pass URL parameter
    variables: { huntId: huntId },
  });

  const hunt = data?.hunts || {};
  console.log(data);
  console.log(hunt);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        hunt <br />
      </h3>
      <div className="col-12 col-md-10 mb-5">
          <ChallengeList
            challenges={hunt.challenges}
            title={`${hunt.huntname}`}
          />
        </div>
      <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        {/* <ChallengeForm huntId={hunt._id} /> */}
      </div>
    </div>
  );
};

export default SingleHunt;
