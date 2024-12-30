import { Modal, Button, Card, Group, Text, TextInput, Loader, Alert, Grid, SimpleGrid,Rating,Space, Select} from '@mantine/core';
import React, { useState } from 'react';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import { FaCheck,  FaRegEye } from 'react-icons/fa';
import { IoMdAdd, IoMdCart, IoMdRemove } from 'react-icons/io';
import { useForm } from '@mantine/form';
import { notifications,Notifications } from '@mantine/notifications';


const FoodRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

   const[Item,SetItem]=useState({})
      const[Rate,Setrate]=useState('')
      const[rating,Setrating]=useState('')


const [opened, { open, close }] = useDisclosure(false);
 
  const fetchFood = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (search === '') {
      alert('Please enter an item');
    } else {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
        );
        console.log(response.data.meals)
        const meals = response.data.meals || [];
        if(meals.length ===0){
            setError("OOPS! No Items Found For Your Search")
        }
        const mealsWithPrice = meals.map((meal) => ({
          ...meal,
          price: Math.ceil(Math.random() * 100),
          Rating:Math.ceil(Math.random()*4)
        }));
        setData(mealsWithPrice);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const Product = async (mealid)=>{
    try{
        let result = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
        console.log(result.data.meals[0])
        SetItem(result.data.meals[0])
        Setrate(localStorage.getItem('Rate'))
        Setrating(localStorage.getItem('Rating'))
        localStorage.clear()
    }

    catch(error){
        console.error('error',error)
    }
}
const [modalOneOpened, setModalOneOpened] = useState(false);
const [modalOneOpened1, setModalOneOpened1] = useState(false);

let[quantity,setquantity]=useState(1)

const form = useForm({
  initialValues: {
    state: '',
    district: '',
    pincode:'',
    city:'',
    village:'',
    hno:''
  },

  
});

const OrderAddress = (e)=>{
  e.preventDefault();
  console.log(form.values)
 // Delay the notification by 3 seconds (3000 ms)
setTimeout(() => {
  notifications.show({
    id: 'hello-there',
    withCloseButton: true,
    autoClose: 2000,
    title: "Your Order",
    message: 'Your Order Successfully Placed',
    color: 'green',
    icon: <FaCheck/>,
    className: 'my-notification-class',
    style: { backgroundColor: '#EBEDF4' },
    sx: { backgroundColor: 'gray' },
    loading: false,
  });
}, 3000); // 3000 ms = 3 seconds

  setModalOneOpened1(false)
  setModalOneOpened(false)

}
return (
    <Card style={{ backgroundColor: '#EBEDF4' }}>
      <Card>
        <Card style={{ display: 'flex', justifyContent: 'center', fontSize: 'larger', fontWeight: '600' }}>
          Food Recipe APP
        </Card>
        <Notifications position="top-right" zIndex={2077} />

        <Card style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#EBEDFF' }} mb="lg">
          <form onSubmit={fetchFood}>
            <Group>
              <TextInput
                placeholder="Search any item"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                radius="lg"
                style={{ flex: 1 }}
              />
              <Button type="submit" radius="lg">
                GET
              </Button>
            </Group>
          </form>
        </Card>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Loader variant="dots" size="lg" />
          </div>
        )}

        {error && (
          <Alert color="red" mt="md" style={{textAlign:'center'}}>
            {error}
          </Alert>
        )}

        {!loading && data.length > 0 && (
          <Card style={{ backgroundColor: '#EBEDF4' }}>
            <Text weight={500} size="lg" mt="md">
              Your Search Results:
            </Text>
            <Grid gutter='md'>
              {data.map((item) => (
                <Grid.Col xs={12} sm={6} md={4} lg={3} key={item.idMeal}>
                  {/* <Grid.Col span="content"> */}
                    <Card
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      withBorder
                    >
                      <Text weight={600} style={{ fontSize: 'small' }}>
                        {item.strMeal}
                      </Text>
                      <img
                        src={item.strMealThumb}
                        alt={item.strMeal}
                        style={{
                          width:'100%',
                          height: 'auto',
                          borderRadius: '8px',
                          marginTop: '10px',
                        }}
                      />
                      <Text weight={600}>Area: {item.strArea}</Text>
                      <Text weight={600}>Category: {item.strCategory}</Text>
                      <Text>Price: &#8377;{item.price}.00</Text>
                      <Rating value={item.Rating} color='Orange'/>

                      <Modal opened={opened} onClose={close} title="Selected Item"
                       size='auto'
                       centered
                    
                      transitionProps={{ transition: 'fade', duration: 200 }}>
                         <Card shadow="sm" padding="lg" radius="md" withBorder>
                                        <Text weight={500}>ItemID:{item.idMeal}</Text> 
                                            <Group>
                                            <img src={Item.strMealThumb} alt={Item.strMeal} 
                                            style={{width:'300px',height:'300px',objectFit:'fill'}}/>
                                            <Text weight={500}> <b>Instructions:</b><br/>{Item.strInstructions}</Text>
                                            </Group>
                                            <Space h="md"/>
                                            <Text  weight={600}> Area:{Item.strArea}</Text>
                                            <Text  weight={600}>Category{Item.strCategory}</Text>
                                            <Text  weight={600}>Price: &#8377;{Rate}</Text>
                                            <Rating value={rating} color='orange'/>
                                        </Card>
                                 </Modal>

                            <Modal
                                opened={modalOneOpened}
                                onClose={() => {setModalOneOpened(false)
                                 setquantity(quantity=1)
                                }
                                }
                                title="buying"
                                size='auto'
                                centered
                              transitionProps={{ transition: 'fade', duration: 200 }}
                            >
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Text weight={500}>ItemID:{item.idMeal}</Text> 
                                            <Group>
                                            <img src={Item.strMealThumb} alt={Item.strMeal} 
                                            style={{width:'300px',height:'300px',objectFit:'fill'}}/>
                                            </Group>
                                            <Space h="md"/>
                                            <Text  weight={600}> Area:{Item.strArea}</Text>
                                            <Text  weight={600}>Category{Item.strCategory}</Text>
                                            <Text  weight={600}>Price: &#8377;{Rate}.00</Text>
                                            <Rating value={rating} color='orange'/>
                                            <Space h='md'/>
                                            <Group>
                                                <Text weight={600}>No Of Quantity:  <b>{quantity}</b></Text>
                                                <Button onClick={()=>setquantity(quantity+1)} color='violet' variant='light' compact radius='md'><IoMdAdd style={{fontSize:'18px'}}  /></Button>
                                                <Button onClick={()=>setquantity(quantity-1)} disabled={quantity===1} compact radius='md' variant='outline'><IoMdRemove style={{fontSize:'18px'}} /></Button>
                                            </Group>
                                            <Text weight={600}>Total Price:  {Rate*quantity}.00</Text>
                                            <Button fullWidth mt='md' onClick={()=>{
                                                // alert("order placed")
                                                // setModalOneOpened(false)
                                                setquantity(quantity=1)
                                                 setModalOneOpened1(true)
                                            }}>Place Order</Button>
                                </Card>
                            </Modal>

                            {/* ADDRESS MODAL */}

                             <Modal
                                opened={modalOneOpened1}
                                onClose={() => setModalOneOpened1(false)}
                                title="Address"
                                size='auto'
                                centered
                              transitionProps={{ transition: 'fade', duration: 200 }}
                            >
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <form onSubmit={OrderAddress}>
                                  <SimpleGrid cols={2}>
                               <TextInput label=" State" className='Address' {...form.getInputProps('state')}/>
                                <TextInput label="District" className='Address' {...form.getInputProps('district')}/>
                               <TextInput label=" Pincode" className='Address' {...form.getInputProps('pincode')}/> 
                               <TextInput label="City" className='Address' {...form.getInputProps('city')}/>
                               <TextInput label=" Village" className='Address' {...form.getInputProps('village')}/>
                                <TextInput label="House NO" className='Address' {...form.getInputProps('hno')}/>
                               </SimpleGrid>
                                <Button type='submit' mt='lg' fullWidth>Order</Button>
                                </form>
                                </Card>
                            </Modal>

                            <SimpleGrid cols={2}>
                        
                        
                        <Button mt='md' onClick={()=>{
                             localStorage.setItem('Rate',item.price)
                             localStorage.setItem('Rating',item.Rating)
                            Product(item.idMeal)
                            open()
                            }} color='green' leftIcon={<FaRegEye style={{fontSize:'16px'}} />}>View</Button>
                        <Button mt="md" onClick={()=>{
                            // navigate('/item')
                            localStorage.setItem('Rate',item.price)
                             localStorage.setItem('Rating',item.Rating)
                            setModalOneOpened(true)
                            Product(item.idMeal)
                            }} leftIcon={<IoMdCart style={{fontSize:'16px'}}/>}>Buy</Button>
                      </SimpleGrid>
                    </Card>
                  {/* </Grid.Col> */}
                </Grid.Col>
              ))}
            </Grid>
          </Card>
        )}
      </Card>
    </Card>
  );
};

export default FoodRecipe;
