import React, { useContext, useEffect, useState } from "react";
import { Container, List, ListItem, ListItemText, Paper, Typography, Button, ListItemAvatar, Avatar } from "@mui/material";
import { DataContext } from "./DataProvider";
import DialogComponent from "./DialogComponent";

const imageurl = "https://foodish-api.com/api/images/";

function ItemList() {
    const { items, setItems, amount, setAmount } = useContext(DataContext);
    const [imageUrls, setImageUrls] = useState({});
    const [editform, setEditForm] = useState({ name: '', price: 0, quantity: 0,id:0 ,available:false});
    const [open, setOpen] = useState(false);

    const fetchImage = async (name) => {
        const newname = name.toLowerCase();
        const res = await fetch(imageurl + newname + '/');
        const data = await res.json();
        console.log(data.image);
        return data.image;
    };

    const handleClickOpen = (item) => {
        console.log(item);
        setEditForm({ name: item.name, price: item.price, quantity: item.quantity,id:item.id ,available:item.available});  // Sync editform with selected item
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOnChange = (event) => {
        console.log(event.target.value);
        setEditForm({ ...editform, [event.target.name]: event.target.value });
    };
    const handleEditSubmit= async (event)=>{
        console.log(editform);
        try{
            const response = await fetch('http://localhost:8080/edititem',{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(editform),
            });
            if(!response.ok)
            {
                alert(response.message);
            }
            const data= await response.json();
            const updateitem=data.updateditem;
            setItems(prevItems=> prevItems.map(item=>
                item.id=== updateitem.id? updateitem:item
            )) 
        }
        catch(error)
        {
            alert(error);
        }
        handleClose();
    }

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            const fetchAllImages = async () => {
                const urls = { ...imageUrls };
                for (const item of items) {
                    if (!urls[item.id]) {
                        const imageUrl = await fetchImage(item.name);
                        urls[item.id] = imageUrl;
                    }
                }
                setImageUrls(urls); 
            };
            fetchAllImages();
        }
        return () => {
            isMounted = false;
        };
    }, [items]);

    const addData = async (item) => {
        try {
            console.log(item);
            const response = await fetch('http://localhost:8080/amount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: item.id })
            });
            if (!response.ok) {
                alert('There is an error', response.message);
            }
            console.log('Amount added successfully');
            let itemAmount = item.quantity * item.price;
            let newAmount = amount + itemAmount;
            let updateditem = await response.json();
            console.log(updateditem);
            setItems(prevItems => prevItems.map(i =>
                i.id === updateditem.item.id ? updateditem.item : i
            ));
            setAmount(newAmount);
        } catch (error) {
            console.log(error);
        }
    };
    const deleteItem=async (item)=>{
        try{
            console.log(item);
            console.log(item.id);
            const response= await fetch(`http://localhost:8080/deleteitem/${item.id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'applciation/json',
                }
            });
            console.log(response);
            if(response.ok)
            {
                setItems(prevItems=>prevItems.filter(i =>i.id !== item.id));
                alert('Item deleted successfully.');
            }
            else{
                throw new Error('Failed to delete the item.');
            }
            
        }
        catch(error)
        {
            alert(error);
        }
    }

    return (
        <Container maxwidth="md" sx={{ maxheight: '100%', minheight: '40%' }}>
            <Paper elevation={3}  maxwidth='md' sx={{ height: '100%', display: 'flex' }}>
                <List sx={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: '3vh', height: '100%', width: '100%', paddingLeft: '5%' }}>
                    {items.map(item => (
                        <Paper key={item.id} elevation={2} maxheight={'90%'} maxwidth={'90%'} sx={{ height: '50%', width: '43%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2v' }}>
                            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ListItemAvatar>
                                    <Avatar src={imageUrls[item.id] || ""} />
                                </ListItemAvatar>
                                <ListItemText sx={{ textAlign: 'center' }}>
                                    <Typography>Name: {item.name}</Typography>
                                    <Typography>Quantity: {item.quantity}</Typography>
                                    <Typography>Price: {item.price}</Typography>
                                </ListItemText>
                                <Container sx={{display:'flex' , alignItems:'center',alignContent:'center',justifyContent:'center',flexDirection:'row',gap:1}}>
                                    <Button type="button" variant="contained" onClick={() => addData(item)} disabled={!item.available}>ADD</Button>
                                    <Button variant="contained" onClick={() => handleClickOpen(item)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" onClick={()=>deleteItem(item)}>Delete</Button>
                                </Container>
                            </ListItem>
                        </Paper>
                    ))}
                </List>
                <DialogComponent open={open} handleClickClose={handleClose} handleOnChange={handleOnChange} handleSubmit={handleEditSubmit} formData={editform}itemText={"Add the details to edit the data."}/>
            </Paper>
        </Container>
    );
}

export default React.memo(ItemList);
