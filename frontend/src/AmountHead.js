import React, { useContext, useMemo } from "react";
import { Container, Typography } from "@mui/material";
import { DataContext } from "./DataProvider";

function AmountHead(){

    const {amount}= useContext(DataContext);
    const currentAmount = useMemo(()=>{return amount},[amount]);
    return(
        <Container sx={{display:'flex',justifyContent:"center",alignContent:'cetner', alignItems:'center',marginBottom:'3vh',marginTop:'3vh'}}>
            <Typography variant="h6">
                Total Amount:{currentAmount}
            </Typography>
        </Container>
    )
}

export default React.memo(AmountHead);