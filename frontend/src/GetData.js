import React, { useContext } from "react";
import { Container, Button } from "@mui/material";
import { DataContext } from "./DataProvider";


function GetData(){

    const {items,setItems} = useContext(DataContext);

    const handleGetData = async (event)=>{
        event.preventDefault()
        try{
            const response=await fetch('http://localhost:8080/item');
            if(!response.ok)
            {
                throw new Error('Failed to fetch data');
            }
            const data=await response.json();
            setItems(data);
            console.log(items);
        }
        catch(error)
        {
            alert(error);
        }
    }

    return(
        <Container sx={{display:'flex',justifyContent:'center',alignItems:'center',my:2}}>
            <Button variant="contained" type="button" onClick={handleGetData}>Get Data</Button>
        </Container>
    )
}

export default React.memo(GetData);