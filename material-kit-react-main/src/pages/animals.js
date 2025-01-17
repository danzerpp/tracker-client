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

    const URL = 'http://localhost:8080/api/animal/getAll'
     var response = await fetch(URL, options)
    var bodyData = await response.json()

    var tableData = bodyData.map((item)=> 
     {  return {
       'id': item.animal.id,
        'name': item.animal.name,
        'temp': item.animal.tempMin +' - ' + item.animal.tempMax,
        'tempMin':item.animal.tempMin,
        'tempMax':item.animal.tempMax,
        'type': item.animal.type,
        'trackerId': item.tracker.id,
        'trackerName': item.tracker.name
      }});
    console.log(tableData)
    setUsersData(tableData)
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
        accessorKey: 'id', //access nested data with dot notation
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Nazwa zwierzęcia',
        size: 150,
      },
      {
        accessorKey: 'temp',
        header: 'Zakres temp.',
        size: 150,
      }
      ,
      {
        accessorKey: 'trackerName', //normal accessorKey
        header: 'Nazwa trackera',
        size: 200,
      }
      ,
      {
        accessorKey: 'type', //normal accessorKey
        header: 'Typ zwierzęcia',
        size: 200,
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
        pathname: '/forms/animal/add',
        
        query: { 
          animalId: row.original.id,
          name: row.original.name,
          tempMin: row.original.tempMin,
          tempMax: row.original.tempMax,
          type: row.original.type,
        }
    }, '/forms/animal/add')
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

              const URL = 'http://localhost:8080/api/animal/delete/'+ row.original.id
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
