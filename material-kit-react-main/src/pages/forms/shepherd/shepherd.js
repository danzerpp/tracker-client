
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import {
  TextField,
  Unstable_Grid2 as Grid,
Button
} from '@mui/material';
import dynamic from 'next/dynamic';
import { withRouter,useRouter } from 'next/router'

// Dynamically import MapComponent to prevent SSR
const MapComponent = dynamic(() => import('src/components/Map'), {
  ssr: false, // This ensures MapComponent is only rendered on the client side
});


const Page = (props) => {
  const router = useRouter();


  function goBackToPage()
    {
        router.push("/animalShepherds")
    }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <Button
              fullWidth
              variant="text"
              maxWidth ="50px"
              onClick={goBackToPage}
            >
             {"Wróć"}
            </Button>
       <TextField
                        fullWidth
                        name="type"
                        // onChange={handleChange}
                        required
                         value= {'Mapa dla typu zwierzęcia "' +props.router.query.animalType+'". Wybierz ikonkę wielościanu z lewej strony i narysuj pastuch'}
                      >
                        {props.router.query.animalType}
                      </TextField>
                      <br></br>
                      <br></br>
    <MapComponent animalType ={props.router.query.animalType} />
  </div>

  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default withRouter (Page);
