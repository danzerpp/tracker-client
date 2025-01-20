import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography,MenuItem } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import {usert} from 'src/i18n'
import { useTranslation }  from "react-i18next";
import {
  MaterialReactTable,
  useMaterialReactTable,
  
} from 'material-react-table';
import { useRouter } from 'next/navigation';


const Page = () => {
  const [page, setPage] = useState(0);
  const {t} = useTranslation();
  const [usersData, setUsersData] = useState([]);
  const router = useRouter();

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  async function fetchApiData() {
    var animalsData = [];
    var options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    var URL = 'http://localhost:8080/api/animalShepherd/getAllByType?type=COW'
     var response = await fetch(URL, options)
    var bodyData = await response.json()

animalsData.push({
  AnimalType:'COW',
  AnimalTypeName:'Krowa',
  Points: bodyData.map(r=>'('+r.latitude +', ' + r.longitude+')').join(', ') 
})


var URL = 'http://localhost:8080/api/animalShepherd/getAllByType?type=BULL'
 var response = await fetch(URL, options)
var bodyData = await response.json()

animalsData.push({
AnimalType:'BULL',
AnimalTypeName:'Byk',
Points: bodyData.map(r=>'('+r.latitude +', ' + r.longitude+')').join(', ') 
})

var URL = 'http://localhost:8080/api/animalShepherd/getAllByType?type=SHEEP'
 var response = await fetch(URL, options)
var bodyData = await response.json()

animalsData.push({
AnimalType:'SHEEP',
AnimalTypeName:'Owca',
Points: bodyData.map(r=>'('+r.latitude +', ' + r.longitude+')').join(', ') 
})


    setUsersData(animalsData)
  };

  useEffect(() => {

    fetchApiData();
}, []);


function goToAddForm()
{
  router.push({
    pathname: '/forms/animal/add',
    query: { }
}, '/forms/animal/add')
    
  
}
  


  const columns = useMemo(
    () => [
      {
        accessorKey: 'AnimaleType', //access nested data with dot notation
        header: 'Typ',
        size: 60,
      },
      {
        accessorKey: 'AnimalTypeName', //access nested data with dot notation
        header: 'Pełna nazwa typu',
        size: 150,
      },
      {
        accessorKey: 'Points',
        header: 'Punkty geograficzne pastucha',
        size: 150,
      }
      
    ],
    [],
  );


  const table = useMaterialReactTable({
   
    data:usersData,
    columns,  
     enableFullScreenToggle:false,
    enableDensityToggle:false,
    enableColumnDragging:false,
    enableHiding:false,
    localization: {
      actions: t("actions"),
      move: t("move"),
      edit: t("edit"),
   
      // ... and many more - see link below for full list of translation keys
    },
    enableRowActions: true,
   renderRowActionMenuItems: ({ row }) => [
    <MenuItem key="edit" onClick={() => {
      router.push({
        pathname: '/forms/shepherd/shepherd',
        
        query: { 
          animalType: row.original.AnimalType
        }
    }, '/forms/shepherd/shepherd')
    }
    }>
      {t("edit")}
    </MenuItem>,


    <MenuItem key="delete" onClick={async () => {
      if(row.original.Points)
      {

          var res = confirm('Na pewno usunąć przypisany pastuch?')
            if(res)
          {
              var options = {  
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              }

              const URL = 'http://localhost:8080/api/animalShepherd/delete/'+ row.original.AnimalType
              var response = await fetch(URL, options)
              fetchApiData();
            }
          }
   }
      
    }>
      {t("delete")}
    </MenuItem>
  ]
  });

  return (
    <>
      <Head>
        <title>
        Zwierzęta
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Zwierzęta
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={goToAddForm}
                >
                   {t("add")}
                </Button>
              </div>
            </Stack>
            <MaterialReactTable table={table} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
