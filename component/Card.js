import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link'
import Detail from '../component/Detail'
import { useRouter } from 'next/router';


export default function ActionAreaCard({product,viewProduct,addToCartHandler}) {
    
    
  
    return (
    <>
    <div style={{display:'flex', flexWrap:'wrap'}}>
       
      {
          product.map(item=>(
            <Card >
            <CardActionArea>
            <Image
                                    src={item.imgdata}
                                    alt='shirt'
                                    width={100}
                                    height={300}
                                  ></Image>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                 {item.rname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.somedata}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <button key={item.id} onClick={e=>viewProduct(item)}>View Product</button>  
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <button key={item.id} onClick={e=>addToCartHandler(item)}>Add To Cart</button>  
                </Typography>
              </CardContent>
            </CardActionArea>
            
          </Card>
          ))
      }  
    
    
    </div>
    </>    
    
  );
}
