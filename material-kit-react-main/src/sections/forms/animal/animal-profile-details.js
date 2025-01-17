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

export const AnimalProfileDetails = ({parentProps}) => {
  const { i18n, t } = useTranslation();
const router = useRouter();
  
console.log(parentProps.router.query)


  const [values, setValues] = useState({
    name: parentProps.router.query.name ?? '',
    type: parentProps.router.query.type ?? 'COW',
    tempMin : parentProps.router.query.tempMin ?? '',
    tempMax : parentProps.router.query.tempMax ?? ''
  });





  useEffect(() => {
   
}, []);



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

      if(!values.tempMin)
      {
      alert('Proszę podać temperaturę minimalną !')
      return;
    }


        if(!values.tempMax)
        {
        alert('Proszę podać temperaturę maksymalną !')
      return;
    }

    if(parseInt(values.tempMax) < parseInt(values.tempMin))
      {
      alert('Temperatura maksymalna nie może być mniejsza od temperatury minimalnej!')
    return;
  }



    if(parentProps.router.query.animalId === undefined)
    {
         
        const URL = 'http://localhost:8080/api/animal/add'
    
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
          router.push('/animals')
        else{
          alert(await response.text())
        }
      }
      else{

        const URL = 'http://localhost:8080/api/animal/update/'+parentProps.router.query.animalId;
  
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
        router.push('/animals')
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
                  label= {t("name")}
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
                  name="type"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.type}
                >
                    <option
                      key='COW'
                      value='COW'
                    >
                      Krowa
                    </option>
                    <option
                      key='SHEEP'
                      value='SHEEP'
                    >
                      Owca
                    </option>
                    <option
                      key='BULL'
                      value='BULL'
                    >
                      Byk
                    </option>
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                
                <TextField
                  fullWidth
                  label="Temperatura minimalna"
                  name="tempMin"
                  onChange={handleChange}
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                  onKeyPress={(event) => {
                    if (! /^[0-9]$/i.test(event?.key)) {
                      event.preventDefault();
                    }
                  }}
                  required
                  value={values.tempMin}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                
                <TextField
                  fullWidth
                  label="Temperatura maksymalna"
                  name="tempMax"
                  onChange={handleChange}
                  type='number'
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                  onKeyPress={(event) => {
                    if (! /^[0-9]$/i.test(event?.key)) {
                      event.preventDefault();
                    }
                  }}
                  required
                  value={values.tempMax}
                />
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
