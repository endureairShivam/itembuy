import React from "react";
import {DialogActions, DialogContent, TextField, IconButton,Button, Dialog, DialogTitle } from  "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function DialogComponent({open,handleClickClose,handleSubmit,formData,handleOnChange,itemText})
{
    return (
        <Dialog open={open} onClose={handleClickClose}>

        <DialogTitle>
                {itemText}
                <IconButton
                    aria-label="close"
                    onClick={handleClickClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <TextField required autoFocus name="name" label="Name" type="text" fullWidth variant="outlined" value={formData.name} onChange={handleOnChange} sx={{marginBottom:'3vh', marginTop:'3vh'}}/>
                <TextField  required name="price" label="Price" type="number" fullWidth variant="outlined" value={formData.price} onChange={handleOnChange} sx={{marginBottom:'3vh'}}/>
                <TextField  required name="quantity" label="Quantity" type="number" fullWidth variant="outlined" value={formData.quantity} onChange={handleOnChange} sx={{marginBottom:'3vh'}}/>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" type="button" onClick={handleSubmit}>
                    Submit
                </Button>
                
            </DialogActions>
        </Dialog>
    )
}
export default React.memo(DialogComponent);