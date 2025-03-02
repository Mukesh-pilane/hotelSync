import React, { useState, useMemo } from 'react'
import Table from '../../components/shared/Table/Table'
import { ActionIcon, Button, Stack, Flex, Text } from '@mantine/core'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader'
import HotelForm from './HotelForm'
import { useDeleteHotelMutation, useGetHotelQuery } from '../../store/server/queries/hotelQuery'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { modals } from '@mantine/modals'



const Hotel = () => {
  const [search, setSearch] = useState("")
  const { data: hotelsData, isLoading } = useGetHotelQuery({ page: 1, limit: 10 });
  const { mutate: deleteHotel } = useDeleteHotelMutation();


  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', // Maps to the full name
        header: 'Name',
      },
      {
        accessorKey: 'address', // Maps to the address
        header: 'Address',
        enableSorting: false,
      },
      {
        accessorKey: 'baseTokenPoints', // Maps to the address
        header: 'Base Token Points',
      },
    ],
    []
  );

  const customModal = (data = {}) =>
    modals.openContextModal({
      title: data?.id ? 'Edit Hotel' : 'Add Hotel',
      modal: 'custom',
      closeOnClickOutside: false,
      centered: true,
      innerProps: {
        body: HotelForm,
        data
      }
    });



  const openDeleteModal = (hotel) =>
    modals.openContextModal({
      title: `Delete Hotel ${hotel?.name}`,
      modal: 'delete',
      closeOnClickOutside: false,
      centered: true,
      innerProps: {
        body: (
          <Text size="sm">
            Are you sure you want to delete this transaction
          </Text>
        ),
        submitText: "Delete",
        handleSubmit: (closeModal) => {
          deleteHotel(hotel?.id, { onSuccess: closeModal })
        },
      }

    });


  return (
    <>
      <Stack>
        <ReUsableHeader
          search={search}
          setSearch={setSearch}
          Component={
            <Button variant="default"
              onClick={() => {
                customModal()
              }}>
              Add Hotel
            </Button>
          }
        />
        <Table
          columns={columns}
          data={hotelsData?.data || []}
          tableSetting={{
            enableRowActions: true,
            state: { isLoading },
            renderRowActions: ({ row }) => (
              <Flex>
                <ActionIcon color='primary' onClick={() => {
                  customModal(row.original)
                }}>
                  <IconEdit />
                </ActionIcon>
                <ActionIcon color="orange" onClick={() => openDeleteModal(row?.original)}>
                  <IconTrash />
                </ActionIcon>
              </Flex>
            ),
          }}
        />
      </Stack>
    </>
  )
}

export default Hotel