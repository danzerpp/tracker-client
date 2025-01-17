import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useState, useEffect} from 'react';

import { useTranslation }  from "react-i18next";

import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import axios from 'axios';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker, DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import "dayjs/locale/pl"; // Import języka polskiego
import { display } from '@mui/system';

// Register necessary Chart.js components


const now = new Date();
const Page = () =>{
  const { i18n, t } = useTranslation();
  const [chartData, setChartData] = useState(null); // State to hold the chart data
  const [datesSearch,setDatesSearch] = useState({
    start : dayjs(new Date()).add(-10,'hour'),
    end : dayjs(new Date()).add(10,'hour'),
    animalType:'COW'
    
  })


  // Fetch data from the REST API
  useEffect(() => {
    downloadPoints()
  }, [])




  const handleFromChange = 
  (value) => {
    setDatesSearch((prevState) => ({
      ...prevState,
      ['start']: value
    }));

  }

  const handleToChange = 
  (value) => {
    setDatesSearch((prevState) => ({
      ...prevState,
      ['end']: value
    }));
  }

  const handleAnimalChange= 
  (event) => {
    const selectedElement = event.target; // The select element
    const selectedIndex = selectedElement.selectedIndex; // Get the index of the selected option
    const selectedOption = selectedElement.options[selectedIndex]; // Get the option element

    setDatesSearch((prevState) => ({
      ...prevState,
      ['animalType']: event.target.value,
    }));
    // setSelectedValue(event.target.value)
    // setSelectedOptionId(selectedOption.getAttribute("data-id")); // Get the custom attribute
 
  }

  useEffect(() => {
    downloadPoints()

  }, [datesSearch]);



  async function downloadPoints(){

    try {
    const urlSummary = 'http://localhost:8080/api/geoReadSummary/getSummaryByAnimalType';
    const rawDataSummary = JSON.stringify({ 
      animalType: datesSearch.animalType,
      startDate: datesSearch.start.format("YYYY-MM-DD"),
      endDate: datesSearch.end.format("YYYY-MM-DD")
    });

    const responseSummary = await fetch(urlSummary, {
      method: 'POST', // Using GET
      headers: {
        'Content-Type': 'application/json',
      },
      body: rawDataSummary, // Sending raw JSON data as the body
    });

    if (!responseSummary.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await responseSummary.json();
    console.log(result)


   
      
        var data = result;
        const transformedData = {
          labels: result.map(m=>m.date), // Array of months, e.g., ['January', 'February', ...]
          datasets: [
            {
              label: 'przebyty dystans [km]',
              data: result.map(m=>m.distance), // Array of sales, e.g., [65, 59, 80, ...]
              backgroundColor: 'rgb(243,236,219)',
            },
            {
              label: 'czas spoczynku [min]',
              data: result.map(m=>m.idleTime/60), // Array of sales, e.g., [65, 59, 80, ...]
              backgroundColor: 'rgb(0,128,0)',
            },
            {
              label: 'Średnia temperatura zwierzęcia [°C]',
              data: result.map(m=> m.tempAvg), // Array of sales, e.g., [65, 59, 80, ...]
              backgroundColor: 'rgb(0,204,255)',
            },
            {
              label: 'Wyjścia poza pastuch',
              data: result.map(m=>m.outOfShepherdCounter), // Array of sales, e.g., [65, 59, 80, ...]
              backgroundColor: 'rgb(255,160,122)',
            }
          ],
        };

        setChartData(transformedData);



      } catch (error) {
        console.error('Error:', error);
      }
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Stacked Bar Chart Example',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: false, // Enable stacking on the x-axis
      },
      y: {
        stacked: false, // Enable stacking on the y-axis
      },
    },
  };

  const divStyle = {
    display: "flex",
   flexDirection : "row",
   gap:"10px",
   width: "100%"
  };

  return (
  <div  style={{width:"100%"}}>
    <Head>
      <title>
        Wykresy | zwierzę
      </title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
    
      <div style={{width:"100%"}}>
<div style={divStyle}>
      <TextField
                  style={{ width: "300px" }}
                  label= 'Typ zwierzęcia'
                  name="animalId"
                  required
                  select
                  onChange={handleAnimalChange}
                  SelectProps={{ native: true }}
                  // value={values.animalId}
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

      <LocalizationProvider dateAdapter={AdapterDayjs}
      adapterLocale="pl">


      <DatePicker
       
        label="Wybierz datę od"
        value={datesSearch.start}
        
        onChange={handleFromChange}
    
      />
    </LocalizationProvider> <LocalizationProvider dateAdapter={AdapterDayjs}
    adapterLocale="pl">

      <DatePicker
        label="Wybierz datę do"
                  onChange={handleToChange}
                  value={datesSearch.end}
     
      />

    </LocalizationProvider>
    </div>
      <h1>Wykres - statystyka dzienna </h1>
      <div>
      {chartData ? <Bar data={chartData} options={options} />: <p>Loading...</p>}
      </div>
    </div>
    </Box>
  </div>
);






            }
Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);



export default Page;


// export async function getStaticProps(context) {
//   // extract the locale identifier from the URL
//   const { locale } = context

//   return {
//     props: {
//       // pass the translation props to the page component
//       ...(await serverSideTranslations(locale)),
//     },
//   }
// }
