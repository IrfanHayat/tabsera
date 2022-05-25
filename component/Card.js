import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link'

export default function ActionAreaCard() {
    const addToCartHandler = async () => {
        router.push('/cart');
      };
  
    return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <Image
                              src='/shirt3.jpg'
                              alt='shirt'
                              width={100}
                              height={300}
                            ></Image>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Slim Shirt
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Classic Pants
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Price:150$
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View Product  
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
}
