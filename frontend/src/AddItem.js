import React, { useContext, useState } from "react";
import { Container, Button} from "@mui/material";
import { DataContext } from "./DataProvider";
import DialogComponent from "./DialogComponent";

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
            <DialogComponent formData={formData} handleClickClose={handleClickClose} handleOnChange={handleOnChange} handleSubmit={handleSubmit} handleClickOpen={handleClickOpen} open={open} itemText={"Add the details for new item."}/>
        </Container>
    )
}

export default React.memo(AddItem);