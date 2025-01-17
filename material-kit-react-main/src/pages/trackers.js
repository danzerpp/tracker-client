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


    var options = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    var URL = 'http://localhost:8080/api/tracker/getAll'
     var response = await fetch(URL, options)
    var trackers = await response.json()

    var trackersTable =[];
    for (let index = 0; index < trackers.length; index++) {
      const tracker = trackers[index];
      var animal = animals.find(x=>x.animal.id == tracker.animalId)
      trackersTable.push(
        {
          id: tracker.id,
          name: tracker.name,
          animalId: tracker.animalId,
          animalName: animal.animal.name
        }
      )
    } 
   
    setUsersData(trackersTable)
  };

  useEffect(() => {

    fetchApiData();
}, []);


async function goToAddForm()
{

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

  if(animals.find(a=>a.tracker.id ===0) === undefined) 
    {
      alert('Nie można dodać trakera, ponieważ nie istnieje zwierzę, do którego można byłoby go przypisać');
      return;
    }

  router.push({
    pathname: '/forms/tracker/add',
    query: { }
}, '/forms/tracker/add')
    
  
}
  


  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Nazwa trackera',
        size: 150,
      },
      {
        accessorKey: 'animalName',
        header: 'nazwa zwierzęcia',
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
        pathname: '/forms/tracker/add',
        
        query: { 
          trackerId: row.original.id,
          animalId: row.original.animalId,
          name: row.original.name
         
        }
    }, '/forms/tracker/add')
    }
    }>
      {t("edit")}
    </MenuItem>,


    <MenuItem key="delete" onClick={async () => {
          var res = confirm(t("delete-confirm"))
            if(res)
          {
              var options = {  
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              }

              const URL = 'http://localhost:8080/api/tracker/delete/'+ row.original.id
              var response = await fetch(URL, options)
              fetchApiData();
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
        Trakery
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
                Trakery
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
