import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { DELETE_HUNT, UPDATE_HUNT } from "../../utils/mutations"
import {QUERY_ME} from '../../utils/queries'

import { Button, TextField, Box, Typography, Modal} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const style = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },

  flexbox: {
    display: "flex",
    justifyContent: "space-between",
  },
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

  return (
    <div>
      <Button 
      variant="contained" 
      color="primary" 
      size="small" 
      startIcon={<EditIcon />}
      onClick={handleOpen}>
        Rename Hunt
      </Button>
      <Modal
        huntName={huntName}
        
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style.modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rename your Scavenger Hunt!
          </Typography>
          <form>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
                  fullWidth 
                  placeholder="Scavenger Hunt Name"
                  name="huntName"
                  label="Scavenger Hunt Name"
                  value={formData.huntName}
                  onChange={handleInputChange}
                />
          </Typography>  
                <Button
                  onClick={handleFormSubmit} 
                  variant="contained" 
                  color="primary" 
                  startIcon={<SaveIcon />}>
                  Save      
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

  return (
    <div>
      {<h3>{title}</h3>}
      {hunts&&
        hunts.map((hunt) =>
         (
          <div key={hunt._id} className="card mb-3 bg-primary p-3" style={style.flexbox}>
            <div>
            <h4 className="display-flex card-header bg-primary text-light p-2 m-0">
              
                <Link
                  className="text-light"
                  to={`/hunts/${hunt._id}`}

                >
                  {hunt.huntName} 
                </Link>
                
            </h4>
            </div>
            <div className="display-flex align-items-center">
            <BasicModal huntName={hunt.huntName} huntId={hunt._id}/>
            <div>
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
            </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HuntList;
