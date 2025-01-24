
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import {
  Unstable_Grid2 as Grid,
Button
} from '@mui/material';
import dynamic from 'next/dynamic';
import { withRouter,useRouter } from 'next/router'
import {  useState, useEffect } from 'react';

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import "dayjs/locale/pl"; // Import języka polskiego
import { AltRoute } from '@mui/icons-material';

// Dynamically import MapComponent to prevent SSR
const MapActualComponent = dynamic(() => import('src/components/MapActualDates'), {
  ssr: false, // This ensures MapComponent is only rendered on the client side
});


const Page = () => {
  const router = useRouter();
  const [animalsData, setAnimalsData] = useState([]);
  const [selectedAnimal, setSelectedAnimal] = useState({
    animalId :0,
    animalType:''
  });

const [datesSearch,setDatesSearch] = useState({
    start : dayjs(new Date()).add(-10,'hour'),
    end : dayjs(new Date()).add(10,'hour')
  })

  const [tempValue, setTempValue] = useState(dayjs(new Date()).add(-10,'hour')); // Temporary value


  const handleFromChange = 
  (value) => {


    setDatesSearch((prevState) => ({
      ...prevState,
      ['start']: datesSearch.end < value ? datesSearch.end :  value
    }));

  }

  const handleToChange = 
  (value) => {
  
    setDatesSearch((prevState) => ({
      ...prevState,
      ['end']: value
    }));
}

useEffect(() => {
  console.log('main',datesSearch)

}, [datesSearch]);

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

    <LocalizationProvider dateAdapter={AdapterDayjs}
      adapterLocale="pl">


      <DateTimePicker
       
        label="Wybierz datę i godzinę od"
        value={datesSearch.start}
         onChange={handleFromChange}
      />
    </LocalizationProvider> <LocalizationProvider dateAdapter={AdapterDayjs}
    adapterLocale="pl">

      <DateTimePicker
        label="Wybierz datę i godzinę do"
                  onChange={handleToChange}
                  value={datesSearch.end}
     
      />

    </LocalizationProvider>
    <MapActualComponent animalType ={selectedAnimal}  datesSearch = {datesSearch}/>

  </div>

  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
