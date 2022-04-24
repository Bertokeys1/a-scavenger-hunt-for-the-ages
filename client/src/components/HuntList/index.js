import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { DELETE_HUNT } from "../../utils/mutations"
import {QUERY_ME} from '../../utils/queries'

import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";

import { Navigate, useNavigate } from 'react-router-dom';

const HuntList = ( {hunts, title,} ) => {

  const [deleteHunt, { error }] = useMutation(DELETE_HUNT);
  
  if (!hunts.length) {
    return <h3>No Hunt Yet</h3>;
  }

  // const navigate = useNavigate();
  

  return (
    <div>
      {<h3>{title}</h3>}
      {hunts&&
        hunts.map((hunt) =>
         (
          <div key={hunt._id} className="card mb-3">
            <h4 className="display-flex card-header bg-primary text-light p-2 m-0">
              
                <Link
                  className="text-light"
                  to={`/hunts/${hunt._id}`}

                >
                  {hunt.huntName} 
                </Link>
                <Button 
                  huntId={hunt._id}
                  onClick={async () => {
                    try {
                      const data = await deleteHunt({ 
                        variables: {
                          id: hunt._id
                        },
                        refetchQueries: [QUERY_ME]
                      })
                      
                      return data
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
