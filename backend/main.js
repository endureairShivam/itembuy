const express = require('express');
const cors=require('cors');


const items=[{
    id:1,
    name:'Biryani',
    quantity:1,
    price:10,
    available:true
},
{id:2,
    name:'Dessert',
quantity:2,
price:30,
available:true
},
{id:3,
    name:'Dosa',
quantity:5,
price:100,
available:true
}]


const app=express()
app.use(cors());
app.use(express.json())

app.get('/item',(req,res)=>{
    console.log('Called');
    res.status(200).json(items);
})

app.post('/amount', (req, res) => {
    console.log('calling amount');
    console.log(req.body);
    
    // Expecting req.body to contain { id: <itemId> }
    const itemId = req.body.id; // Change this to match the structure of the request body
    const item = items.find(item => item.id === itemId);

    console.log(item); // Check if the item is found
    if (item && item.available) {
        item.available = false;
        res.status(200).json({ message: 'Item is available', item });
    } else {
        res.status(404).json({ message: 'Item is not available' });
    }
});

app.post('/additem',(req,res)=>{
    console.log(req.body);
    const data=req.body.data
    const item= items.find(item=> item.name===data.name && item.quantity=== data.quantity && item.price === data.price)
    if(item)
    {
        res.status(400).json({message:"Item already exists"});
    }
    else{
        const newitemid=generateRandom();
        const newItem={id:newitemid,name:data.name,quantity:data.quantity,price:data.price,available:true}
        items.push(newItem);
        res.status(200).json({message:"Added item successfully",newItem});
    }
})

app.put('/edititem',(req,res)=>{
    const itemId = req.body.id;
    const index = items.findIndex(item => item.id === itemId);
    if(index !== -1)
    {
        const updateditem={    
            id:itemId,
            name:req.body.name,
            quantity:req.body.quantity,
            price:req.body.price,
            available:req.body.available
        }

        items[index]=updateditem;
        console.log(items);
        res.status(200).json({message:"Successfully updated items.",updateditem})
    }
    else{
        res.status(401).json({message:"Item not found."})
    }
})
app.delete('/deleteitem/:id',(req,res)=>{
    console.log('delete called.')
    console.log(req.params.id);
    const itemid=parseInt(req.params.id);
    const index = items.findIndex(item => item.id ===itemid);
    console.log(index);
    if(index!==-1)
    {
        items.splice(index,1);
        res.status(200).json({message:'Item deleted successfully'});
    }
    else{
        res.status(401).json({message:'Item not found'});
    }
})


const port=8080;
app.listen(port,()=>{
    console.log('App is listening.');
})

function generateRandom() {
    let randomNum;
    const existingIds = new Set(items.map(item => item.id));

    do {
        randomNum = Math.floor(Math.random() * 1000) + 1; // Generates a number between 1 and 1000
    } while (existingIds.has(randomNum)); // Repeat until the number is not in existingIds

    return randomNum;
}
