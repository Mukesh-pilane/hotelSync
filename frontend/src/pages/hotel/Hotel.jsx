import React, { useState, lazy, useMemo, useEffect } from 'react'
const Table = lazy(() => import("../../components/shared/Table/Table"))
import { Avatar, Button,  Stack } from '@mantine/core'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader'
import { useDisclosure } from '@mantine/hooks'
import CustomModal from '../../components/shared/Modal/Modal'
import HotelForm from './HotelForm'
import { useGetHotelQuery } from '../../store/server/queries/hotelQuery'

const data = [
  {
    id: '1',
    name: 'Robert Wolfkisser',
    address: '123 Wolf Street, Furrytown, FT 56789',
    baseTokenPoints: 100,
  },
  {
    id: '2',
    name: 'Alice Dreamer',
    address: '456 Dream Ave, Wonderland, WL 98765',
    baseTokenPoints: 150,
  },
  {
    id: '3',
    name: 'John Doe',
    address: '789 Sample Blvd, Example City, EC 12345',
    baseTokenPoints: 200,
  },
  {
    id: '4',
    name: 'Jane Smith',
    address: '321 Elm Street, Springfield, SP 67890',
    baseTokenPoints: 180,
  },
  {
    id: '5',
    name: 'Charlie Blackwood',
    address: '555 Forest Lane, Timberville, TL 45321',
    baseTokenPoints: 250,
  },
  {
    id: '6',
    name: 'Emily Bright',
    address: '101 Sunshine Rd, Radiant City, RC 99876',
    baseTokenPoints: 120,
  },
  {
    id: '7',
    name: 'Daniel Stark',
    address: '202 Iron Street, Starkville, SV 56432',
    baseTokenPoints: 210,
  },
  {
    id: '8',
    name: 'Olivia Green',
    address: '303 Park Ave, Greenfield, GF 34210',
    baseTokenPoints: 190,
  },
  {
    id: '9',
    name: 'Liam White',
    address: '404 River Rd, Snowy Peaks, SP 78123',
    baseTokenPoints: 130,
  },
  {
    id: '10',
    name: 'Sophia Red',
    address: '505 Sunset Blvd, Sunset City, SC 87654',
    baseTokenPoints: 220,
  }
];




const Hotel = () => {
  const [search, setSearch] = useState("")
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate, data:customersData, isLoading } = useGetHotelQuery();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', // Maps to the full name
        header: 'Name',
      },
      {
        accessorKey: 'address', // Maps to the address
        header: 'Address',
      },
      {
        accessorKey: 'baseTokenPoints', // Maps to the base token points
        header: 'Base Token Points',
      },
    ],
    []
  );
  
  
  
  useEffect(() => {
    mutate();
  }, [])
  
  return (
    <>
      <Stack>
        <ReUsableHeader
          search={search}
          setSearch={setSearch}
          Button={
            <Button variant="default" onClick={open}>
              Add Hotel
            </Button>
          }
        />
        <Table columns={columns} data={data} />
      </Stack>
      <CustomModal title="Hotel" opened={opened} close={close}>
        <HotelForm data={{}} close={close} />
      </CustomModal>
    </>
  )
}

export default Hotel