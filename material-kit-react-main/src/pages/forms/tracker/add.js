import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useTranslation }  from "react-i18next";
import { withRouter } from 'next/router'
import {
    Button,
  
  } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AnimalProfileDetails } from 'src/sections/forms/animal/animal-profile-details';
import { TrackerProfileDetails } from 'src/sections/forms/tracker/tracker-profile-details';
const Page = (props) =>{
    const {t} = useTranslation();
    console.log(props.router.query.categoryId);
    const router = useRouter();

    function goBackToPage()
    {
        router.push("/trackers")
    }

return(
  <>
  <Button
        fullWidth
        variant="text"
        maxWidth ="50px"
        onClick={goBackToPage}
      >
       {t("return")}
      </Button>
    <Head>
      <title>
        Traker | Dodaj
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
            Trakery
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <TrackerProfileDetails parentProps = {props} />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);
    }
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default withRouter (Page);
