import React, { useState, useMemo, useEffect } from 'react'
import Table from '../../components/shared/Table/Table'
import { Button,  Stack } from '@mantine/core'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader'
import { useDisclosure } from '@mantine/hooks'
import CustomModal from '../../components/shared/Modal/Modal'
import HotelForm from './HotelForm'
import { useGetHotelQuery } from '../../store/server/queries/hotelQuery'




const Hotel = () => {
  const [search, setSearch] = useState("")
  const [opened, { open, close }] = useDisclosure(false);
  const { data:hotelsData, isLoading, isError, error } = useGetHotelQuery({ page: 1, limit: 10 }); 

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
    ],
    []
  );
  
  
  return (
    <>
      <Stack>
        <ReUsableHeader
          search={search}
          setSearch={setSearch}
          Component={
            <Button variant="default" onClick={open}>
              Add Hotel
            </Button>
          }
        />
        <Table columns={columns} isLoading={hotelsData===undefined} data={hotelsData?.data || []} />
      </Stack>
      <CustomModal title="Hotel" opened={opened} close={close}>
        <HotelForm data={{}} close={close} />
      </CustomModal>
    </>
  )
}

export default Hotel