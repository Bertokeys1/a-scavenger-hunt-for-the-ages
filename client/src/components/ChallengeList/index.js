import React,  { useState } from "react";
import { useMutation } from "@apollo/client";
import { Checkbox, FormControlLabel } from "@mui/material";
import {CHECK_CHALLENGE, DELETE_CHALLENGE, UPDATE_CHALLENGE} from '../../utils/mutations'
import {render} from 'react-dom'

import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

function BasicModal({challenge, huntId}) {

  const {
    challengeName, 
    todo, 
    location: {
      address1, 
      address2, 
      city, 
      state, 
      zipCode
    }} = challenge

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [formData, setFormData] = useState({
    challengeName: challengeName,
    address1: address1,
    address2: address2,
    city: city,
    state: state,
    zipCode: zipCode,
    todo: todo,
  });
  console.log(formData)

  const [updateChallenge, { error }] = useMutation(UPDATE_CHALLENGE);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      handleClose()
      return await updateChallenge({
        variables: {
          huntId: huntId,
          challengeId: challenge._id,
          data: {
            challengeName: formData.challengeName,
            location:{
              address1: formData.address1,
              address2: formData.address2,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode
            },
            todo: formData.todo
          }},        
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Button size="large" 
      variant="contained" 
      color="primary" 
      startIcon={<EditIcon />}
      onClick={handleOpen}>
        Edit Challenge
      </Button>
      <Modal
        {...challenge} 
        huntId={huntId}
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
                <TextField
                  fullWidth 
                  placeholder="Challenge Name"
                  name="challengeName"
                  label="Challenge Name"
                  value={formData.challengeName}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  placeholder="Challenge task"
                  name="todo"
                  label="Challenge task"
                  value={formData.todo}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  placeholder="Street Adress"
                  name="address1"
                  label="Street Adress"
                  value={formData.address1}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  placeholder="Building/Unit number"
                  name="address2"
                  label="Building/Unit number"
                  value={formData.address2}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  placeholder="City"
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  placeholder="State"
                  name="state"
                  label="State"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  placeholder="Zip Code"
                  name="zipCode"
                  label="Zip Code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </Typography>  
                <Button size="large"
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
                <BasicModal challenge={challenge} huntId={huntId}/>
                <Button size="large" 
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
                  startIcon={<DeleteIcon />}>
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
