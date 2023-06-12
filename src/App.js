import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import './App.css';
import * as Products from './items';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNameAndContact, getUser } from './Redux/Slices/userSlice';
import { addToCart, decrementQuantity, getCart, incrementQuantity, updateCart } from './Redux/Slices/cartSlice';


function App() {


  // const [ order, setOrder] = useState({});

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  // hook to dispatch the action
  const dispatch = useDispatch();

  // to fetch the user from the state 
  const user = useSelector(getUser);
  const cart = useSelector(getCart);

  console.log("cart", cart)



  const placeOrder = () => {
    dispatch(
      addNameAndContact({
        name: name,
        contact: contact
      })
    );

    setName('');
    setContact('');
  }

  const handleName = (e) => {
    setName(e.target.value);


  }
  const handleContact = (e) => {
    setContact(e.target.value)
  }

  const handleAdd = (item) => {


    console.log(item);

    dispatch(addToCart({
      item: item
    }));
  }
  const handleDelete = (item) => {
    
    dispatch(decrementQuantity({
      item: item
    }));
  }

  return (
    <div>
      <div>
        <h2 style={{ marginLeft: "30px" }}>Redux Demo : Shopping Cart</h2>
        <Divider></Divider>
        <Card>
          <Box sx={{ display: "flex" }}>
            <Box>
              <h3 style={{ marginInline: "20px" }}>Menu</h3>
              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>

                {

                  Products.Items.map((item, index) => (
                    <Card sx={{ width: "200px", height: "128px", margin: "20px", backgroundColor: "#f4f1f1" }} key={item.id * index}>

                      <CardContent>
                        <span >{item.name}</span>
                        <span style={{ marginLeft: "30px" }}>{item.price}rs</span>
                      </CardContent>

                      <CardActions>
                        <Button onClick={
                          (e) => {handleAdd(item)}}>
                          +
                        </Button>
                        <span>{item.quantity}</span>
                        <Button onClick={(e) => { handleDelete(item) }}>
                          -
                        </Button>

                      </CardActions>

                    </Card>
                  ))
                }


              </Box>
              <h3 style={{ marginInline: "20px" }}>User Details</h3>
              <Box
                component="form"
                sx={{
                  margin: "15px",
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField

                    id="outlined-required"
                    label="Name"
                    onChange={handleName}
                    value={name}
                  />

                  <TextField
                    id="outlined-read-only-input"
                    label="Contact no."
                    onChange={handleContact}
                    value={contact}

                  />

                  <Button onClick={placeOrder} sx={{ marginTop: "16px", marginInline: "40px" }} variant='contained'>
                    Place Order
                  </Button>

                </div>
              </Box>
            </Box>


            <Box>
              <Card sx={{ marginBlock: "30px", width: "300px" }}>
                <CardContent sx={{ display: "flex", justifyContent: "space-around", flexDirection: "column" }}>

                  <Box>
                    <h3>User Details</h3>
                    <h5>Name: {user?.name}</h5>
                    <h5>Contact: {user?.contact}</h5>
                  </Box>
                  <Box>
                    <h3>Cart</h3>
                    <ul>
                      {
                        cart?.cartItems.map((item, ind) => (
                          <li key={ind}>{item.name} X {item.quantity}</li>

                        ))
                      }

                    </ul>
                  </Box>
                  <Box>
                    <h3>Total Value</h3>
                    <span>{cart?.totalValue}rs</span>
                  </Box>
                </CardContent>
              </Card>
            </Box>

          </Box>
        </Card>
      </div>
    </div>
  );
}

export default App;
