import React, { useContext, useState } from "react";
import { Container, Button, Dialog,Typography, TextField, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { DataContext } from "./DataProvider";

function AddItem(){

    const [open,setOpen]= useState(false);

    const [formData,setFormData]=useState({
        name:'',
        quantity:0,
        price:0
    })
    const {items,setItems} = useContext(DataContext);


    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClickClose = () => {
        setOpen(false);
    };

    const handleOnChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        console.log('Submitting data:', formData);
        if(formData.name.length===0 && formData.price.length===0 && formData.quantity.length===0)
        {
            alert('Please fill all the fields.')
            return;
        }

        try{
            const response = await fetch('http://localhost:8080/additem',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({data:formData})
            });
            const newItem=await response.json();
            console.log(newItem.newItem);
            console.log(items);
            if (response.ok) {
                setItems((prevItems) => [...prevItems, newItem.newItem]); // Add the new item to the existing items
            } else {
                alert(newItem.message); // Display the error message from the server
            }

            
        }catch(error)
        {
            alert(error);
        }

        handleClickClose(); // Optionally close the dialog after submission
    };


    return(
        <Container sx={{display:'flex',alignContent:'center',justifyContent:'center',alignItems:'center', marginTop:'5vh'}} >
            <Button variant="contained" onClick={handleClickOpen}>
                Add Item
            </Button>
            {open &&
                    <Dialog open={open} onClose={handleClickClose}>

                    <DialogTitle>
                            {"Add the details for new Item."}
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
                }
        </Container>
    )
}

export default AddItem