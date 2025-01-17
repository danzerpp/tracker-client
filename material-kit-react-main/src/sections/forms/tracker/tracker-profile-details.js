import { useCallback, useState, useEffect } from 'react';

import { useTranslation }  from "react-i18next";
import { useRouter } from 'next/navigation';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Checkbox,
  FormControlLabel
} from '@mui/material';

const states = [
  {
    value: 'ADMIN',
    label: 'ADMIN'
  },
  {
    value: 'USER',
    label: 'USER'
  }
];

export const TrackerProfileDetails = ({parentProps}) => {
  const { i18n, t } = useTranslation();
const router = useRouter();
  
console.log(parentProps.router.query)


  const [values, setValues] = useState({
    name: parentProps.router.query.name ?? '',
  });


  const [animalsData, setAnimalsData] = useState([]);



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
  var idAn = parentProps.router.query.animalId ?? 0 

  var filtered = animals.filter(a=>a.tracker.id===0 || a.animal.id === parseInt(idAn))
  
  var mapped = filtered.map((a)=>{return {
    id: a.animal.id,
    name: a.animal.name
  }})

  if(idAn === 0)
    {
      idAn = mapped[0].id
    }

  setValues((prevState) => ({
    ...prevState,
    ['animalId']: idAn
  }));

  setAnimalsData(mapped)
}


  const handleChange = 
    (event) => {

      var val = event.target.value

      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: val
      }));
    }

  const  handleSubmit = 
  async (event) => {

    event.preventDefault();
    if(!values.name)
      {
      alert('Proszę podać nazwę zwierzęcia !')
      return;
      }


    if(parentProps.router.query.trackerId === undefined)
    {
         
        const URL = 'http://localhost:8080/api/tracker/add'
    
        var options = {  
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(values)
        }

        var response = await fetch(URL,options);

        if(response.status === 200)
          router.push('/trackers')
        else{
          alert(await response.text())
        }
      }
      else{

        const URL = 'http://localhost:8080/api/tracker/update/'+parentProps.router.query.trackerId;
  
      var options = {  
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(values)
      }

      var response = await fetch(URL,options);
      console.log(response)

      if(response.status === 200)
        router.push('/trackers')
      else{
        alert(await response.text())
      }

      }
    }







  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
      <CardHeader
          title={  parentProps.router.query.categoryId === undefined ?  t("add") : t("edit")}
          />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label= 'Nazwa trackera'
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
             
               
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
               <TextField
                  fullWidth
                  label= 'Typ zwierzęcia'
                  name="animalId"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.animalId}
                >
                    {animalsData.map((option) => (
                    <option
                      key={option.id}
                      value={option.id}
                      losowo = {option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </Grid>
             
             
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type='submit' variant="contained">
            {t("save")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
