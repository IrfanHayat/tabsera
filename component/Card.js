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


export default function ActionAreaCard({product}) {
    const router = useRouter();
  

    const viewProduct = (e,item) => {
        console.log(item)
        e.preventDefault()
        router.push({
            pathname: '/product_detail',
            state: {
                item:item,
            }
            
        })
        //router.push('/product_detail')
      }
  
    return (
    <>
    <div style={{display:'flex'}}>
      {
          product.map(item=>(
            <Card sx={{ maxWidth: 345 }}>
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
                  <button onClick={e=>viewProduct(e,item)}>View Product</button>  
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
