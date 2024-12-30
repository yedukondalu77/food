import { Button, Card, Group, Space, Text} from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Rating } from '@mantine/core';
import { BiLeftArrow } from 'react-icons/bi';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';

const ItemCard = () => {
    const[Item,SetItem]=useState({})
    const[Rate,Setrate]=useState('')
    const[rating,Setrating]=useState('')
    const mealid=localStorage.getItem('Id')
    
    const navigate=useNavigate()
    useEffect(()=>{Product()},[mealid])
    const Product = async ()=>{
        try{
            let result = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
            console.log(result.data.meals[0])
            SetItem(result.data.meals[0])
            Setrate(localStorage.getItem('Rate'))
            Setrating(localStorage.getItem('Rating'))
        }
        catch(error){
            console.error('error',error)
        }
    }

  return (
    <Card>
      <Card padding="xl" radius="md" >
            <Card style={{display:'flex',justifyContent:'space-between'}}>
                <BsFillArrowLeftSquareFill onClick={()=>{
                    navigate('/')}}/>
                <Button>Buy</Button></Card>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text weight={500}>ItemID:{Item.idMeal}</Text> 
                    <Group>
                    <img src={Item.strMealThumb} alt={Item.strMeal} 
                    style={{width:'600px',height:'300px',objectFit:'fill'}}/>
                    <Text weight={500}> <b>Instructions:</b><br/>{Item.strInstructions}</Text>
                    </Group>
                    <Space h="md"/>
                    <Text  weight={600}> Area:{Item.strArea}</Text>
                    <Text  weight={600}>Category{Item.strCategory}</Text>
                    <Text  weight={600}>Price: &#8377;{Rate}</Text>
                    <Rating value={rating} color='orange'/>
                </Card>
      </Card>
    </Card>
  )
}

export default ItemCard
