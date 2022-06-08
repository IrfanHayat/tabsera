import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@mui/styles';
//import { FontProvider, Font } from 'website/src/components/Font';

import { ColumnToRow, Item } from '@mui-treasury/components/flex';
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation';
import {
  EmailSubscribe,
  EmailTextInput,
  SubmitButton,
} from '@mui-treasury/components/EmailSubscribe';
import {
  CategoryProvider,
  CategoryTitle,
  CategoryItem,
} from '@mui-treasury/components/menu/category';
import {
  SocialProvider,
  SocialLink,
} from '@mui-treasury/components/socialLink';

import { useMagCategoryMenuStyles } from '@mui-treasury/styles/categoryMenu/mag';
import { usePoofSocialLinkStyles } from '@mui-treasury/styles/socialLink/poof';
import { useReadyEmailSubscribeStyles } from '@mui-treasury/styles/emailSubscribe/ready';
import { usePlainNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/plain';

//const darkTheme = createMuiTheme({ palette: { type: 'dark' } });

const useStyles = makeStyles(({ palette, typography }) => ({
  top: {
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
  middle: {
    backgroundColor: palette.type === 'dark' ? '#192D36' : palette.action.hover,
  },
  bottom: {
    backgroundColor:
      palette.type === 'dark' ? '#0F2128' : palette.action.selected,
  },
  newsletterText: {
    color: '#fff',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
  },
  form: {
    margin: 0,
    minWidth: 343,
    fontSize: '0.875rem',
  },
  legalLink: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    justifyContent: 'center',
    color: palette.text.hint,
    letterSpacing: '0.5px',
  },
  divider: {
    height: 2,
    margin: '-1px 0',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    filter: 'grayscale(80%)',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  info: {
    ...typography.caption,
    color: palette.text.hint,
    marginTop: 8,
  }
}));

export default Footer= ()=> {
  const classes = useStyles();
  return (
   
      <Box width={'100%'}>
        <Box px={2} py={6} className={classes.top} position={'relative'}>
          <div className={classes.overlay}>
            <img
              src={
                'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80'
              }
              alt={''}
            />
          </div>
         
            <ColumnToRow
              at={'sm'}
              cssPosition={'relative'}
              columnStyle={{ alignItems: 'center', textAlign: 'center' }}
              rowStyle={{ justifyContent: 'center' }}
              gap={{ xs: 2, sm: 3, md: 4 }}
              wrap
            >
              <Item>
                <Typography className={classes.newsletterText}>
                 Subscribe to our quarterly newsletter
                </Typography>
              </Item>
              <Item>
                <EmailSubscribe
                  className={classes.form}
                  onSubmit={email => alert(`Your email is ${email}.`)}
                  useStyles={useReadyEmailSubscribeStyles}
                  inputClearedAfterSubmit
                >
                  <EmailTextInput placeholder="Enter your email" />
                  <SubmitButton>Subscribe</SubmitButton>
                </EmailSubscribe>
              </Item>
            </ColumnToRow>
          
        </Box>
        <Box px={2} py={10} className={classes.middle}>
          <Container disableGutters>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} lg={3}>
                <Box
                  component={'img'}
                  mt={-3}
                  width={120}
                  height={64}
                  src="https://cdn.dribbble.com/users/1007527/screenshots/2992564/arc-logo.png"
                  alt=""
                  borderRadius={12}
                />
                <Typography className={classes.info}>
                    Architect VR, 830-1183 BKK Thailand 10220
                  
                </Typography>

                <Typography className={classes.info}>
                    admin@arc.fake
                  
                </Typography>
              </Grid>
              <Grid item xs={12} md={8} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                      <CategoryTitle>
                        Products
                      </CategoryTitle>
                      <CategoryItem>
                        Snowflake Free
                      </CategoryItem>
                      <CategoryItem>
                        Coloristic
                      </CategoryItem>
                      <CategoryItem>
                        Summer free
                      </CategoryItem>
                      <CategoryItem>
                        Lucky store
                      </CategoryItem>
                    </CategoryProvider>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                      <CategoryTitle>
                        Information
                      </CategoryTitle>
                      <CategoryItem>
                        License
                      </CategoryItem>
                      <CategoryItem>
                        Privacy Policy
                      </CategoryItem>
                      <CategoryItem>
                        Releases
                      </CategoryItem>
                      <CategoryItem>
                        FAQ
                      </CategoryItem>
                    </CategoryProvider>
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                      <CategoryTitle>
                        About
                      </CategoryTitle>
                      <CategoryItem>
                        Contact
                      </CategoryItem>
                      <CategoryItem>
                        Team
                      </CategoryItem>
                      <CategoryItem>
                        Support
                      </CategoryItem>
                    </CategoryProvider>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={8} lg={3} style={{ marginLeft: 'auto' }}>
                <CategoryProvider useStyles={useMagCategoryMenuStyles}>
                  <CategoryTitle>
                    Subscribe
                  </CategoryTitle>
                </CategoryProvider>
                <SocialProvider useStyles={usePoofSocialLinkStyles}>
                  <SocialLink brand={'Envelope'} />
                  <SocialLink brand={'GooglePlus'} />
                  <SocialLink brand={'Pinterest'} />
                  <SocialLink brand={'Dribbble'} />
                </SocialProvider>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container disableGutters>
          <Divider className={classes.divider} />
        </Container>
        <Box px={2} py={3} className={classes.bottom}>
          <Container disableGutters>
            <ColumnToRow
              at={'md'}
              columnStyle={{ alignItems: 'center' }}
              rowStyle={{ alignItems: 'unset' }}
            >
              <Item grow ml={-2} shrink={0}>
                <NavMenu useStyles={usePlainNavigationMenuStyles}>
                  <ColumnToRow at={'sm'}>
                    <NavItem className={classes.legalLink}>
                      Terms & Conditions
                    </NavItem>
                    <NavItem className={classes.legalLink}>
                      Privacy Policy
                    </NavItem>
                    <NavItem className={classes.legalLink}>
                      Sitemap
                    </NavItem>
                  </ColumnToRow>
                </NavMenu>
              </Item>
              <Item>
                <Box py={1} textAlign={{ xs: 'center', md: 'right' }}>
                  <Typography
                    component={'p'}
                    variant={'caption'}
                    color={'textSecondary'}
                  >
                    
                      Designed by Anonymous © Fake Studio 2020 All right
                      reserved
                    
                  </Typography>
                </Box>
              </Item>
            </ColumnToRow>
          </Container>
        </Box>
      </Box>
 
  );
}