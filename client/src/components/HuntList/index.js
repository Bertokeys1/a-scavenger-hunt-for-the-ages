import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { DELETE_HUNT, UPDATE_HUNT } from "../../utils/mutations"
import {QUERY_ME} from '../../utils/queries'

import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Navigate, useNavigate } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal({huntName, huntId}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    huntName: huntName,
  });

  const [updateHunt, { error }] = useMutation(UPDATE_HUNT);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      handleClose()
      return await updateHunt({
        variables: {
          id: huntId,
          huntName: formData.huntName  
        },
        refetchQueries: [QUERY_ME]
      });

    } catch (err) {
      console.error(err);
    }
  };


  console.log(huntName)
  return (
    <div>
      <Button 
      variant="contained" 
      color="primary" 
      size="small" 
      startIcon={<EditIcon />}
      onClick={handleOpen}>
        Edit Hunt
      </Button>
      <Modal
        huntName={huntName}
        
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rename your Scavenger Hunt!
          </Typography>
          <form>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
                  className="form-input"
                  placeholder="Name of your hunt"
                  name="huntName"
                  type="text"
                  value={formData.huntName}
                  onChange={handleInputChange}
                />
                {/* <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button> */}
          </Typography>  
                <Button
                  onClick={handleFormSubmit} 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SaveIcon />}>
                  Submit      
                </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}




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
                <BasicModal huntName={hunt.huntName} huntId={hunt._id}/>
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
                  startIcon={<DeleteIcon />}>
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
