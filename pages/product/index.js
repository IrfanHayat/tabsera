import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ActionAreaCard from '../../component/Card';
import Menu from '../../component/Menu'
import Layout from '../../component/Layout';
import Footer from '../../component/Footer'  
import ShopingCart from '../../component/ShoppingCart'
import Image from 'next/image';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
  return (
     <Layout> 
    <Box sx={{ flexGrow: 1 }}>
      <Grid container >
        <Grid item xs={12} md={12}>
              <Menu></Menu>
          
        </Grid>
        
        <Grid item xs={12} md={12}>
          <Item>
              <Footer></Footer>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </Layout>
  );
}