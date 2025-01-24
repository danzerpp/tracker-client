
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import {
  TextField,
  Unstable_Grid2 as Grid,
Button
} from '@mui/material';
import dynamic from 'next/dynamic';
import { withRouter,useRouter } from 'next/router'
import {  useState, useEffect } from 'react';
// Dynamically import MapComponent to prevent SSR
const MapActualComponent = dynamic(() => import('src/components/MapActual'), {
  ssr: false, // This ensures MapComponent is only rendered on the client side
});


const Page = (props) => {
  const router = useRouter();

  const [animalsData, setAnimalsData] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState({
    animalId :0,
    animalType:''
  });


  useEffect(() => {
    getAnimals()
}, []);

  async function getAnimals(){
    var options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  
    var URL = 'http://localhost:8080/api/animal/getAll'
     var response = await fetch(URL, options)
    var animals = await response.json()
  
    var filtered = animals.filter(a=>a.tracker.id !==0)
    

    var mapped = filtered.map((a)=>{return {
      id: a.animal.id,
      name: a.animal.name,
      type: a.animal.type
    }})
  
    if(mapped.length >0)
    {
      setSelectedAnimal({
        animalId :mapped[0].id,
        animalType:mapped[0].type
      })
    }


    setAnimalsData(mapped)
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <TextField
                  fullWidth
                  label= 'Zwierzę'
                  name="animalId"
                  // onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  // value={values.animalId}
                >
                    {animalsData.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
                      <br></br>
                      <br></br>
    <MapActualComponent animalType ={selectedAnimal} />
  </div>

  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
