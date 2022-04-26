import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { DELETE_HUNT, UPDATE_HUNT } from "../../utils/mutations"
import {QUERY_ME} from '../../utils/queries'

import { Button, TextField, Box, Typography, Modal} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const style = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
  },
  flexbox: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: "auto",
  },
  inputProps:{
    style:{
      fontFamily: "Amatic SC, cursive",
      fontSize: 28,
    }
  },
  inputLabelProps: {
    style:{
      fontFamily: "Amatic SC, cursive",
    }
  },
  button: {
    fontFamily: "Amatic SC, cursive",
    fontSize: 20,
    margin:.5
  },
  textfield:{
    margin:.5
  }
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A494A",
    },
    secondary: {
      main: "#4A7B9D",
    },
    warning: {
      main: "#800020"
    }
  }
});

function BasicModal({huntName, huntId}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = useState({
    huntName: huntName,
  });

  const [updateHunt] = useMutation(UPDATE_HUNT);

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
        sx={style.button}    
        variant="contained" 
        color="secondary" 
        size="large" 
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
          <form>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
            sx={style.textfield}
            inputProps={style.inputProps}
            InputLabelProps={style.inputLabelProps}
            fullWidth 
            placeholder="Scavenger Hunt Name"
            name="huntName"
            label="Scavenger Hunt Name"
            value={formData.huntName}
            onChange={handleInputChange}
          />
          </Typography>  
          <Button
            sx={style.button}   
            onClick={handleFormSubmit} 
            variant="contained" 
            color="secondary" 
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

  const [deleteHunt] = useMutation(DELETE_HUNT);
  
  if (!hunts.length) {
    return <h3>No Hunts Yet</h3>;
  }

  return (
    <ThemeProvider theme={theme}>
    <div>
      {/* {<h3>{title}</h3>} */}
      {hunts&&
        hunts.map((hunt) =>
         (
          <div key={hunt._id} className="card mb-3 p-3" style={style.flexbox}>
            <div>
            <h2 className="display-flex font-bold text-dark p-2 m-0">
              
                <Link
                  className="text-dark"
                  to={`/hunts/${hunt._id}`}

                >
                  {hunt.huntName} 
                </Link>
                
            </h2>
            </div>
            <div className="display-flex align-items-center flex-wrap">
            <BasicModal huntName={hunt.huntName} huntId={hunt._id}/>
            <div>
                <Button 
                  sx={style.button}   
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
                  color="primary" 
                  size="large" 
                  startIcon={<DeleteIcon />}>
                  Discard      
                </Button>
            </div>
            </div>
          </div>
        ))}
    </div>
    </ThemeProvider>
  );
};

export default HuntList;
