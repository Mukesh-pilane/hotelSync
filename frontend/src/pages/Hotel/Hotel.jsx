import React, { useState, useMemo } from 'react'
import Table from '../../components/shared/Table/Table'
import { ActionIcon, Button, Flex, Text } from '@mantine/core'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader'
import HotelForm from './HotelForm'
import { useDeleteHotelMutation, useGetHotelQuery } from '../../store/server/queries/hotelQuery'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { modals } from '@mantine/modals'
import { Tooltip } from '@mantine/core';
import CustomTooltip from '../../components/shared/CustomTooltip/CustomTooltip'



const Hotel = () => {
  const [search, setSearch] = useState("")
  const { data: hotelsData, isLoading } = useGetHotelQuery({ page: 1, limit: 10 });
  const { mutate: deleteHotel } = useDeleteHotelMutation();


  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', // Maps to the full name
        header: 'Name',
        size: 50, //small column
      },
      {
        accessorKey: 'address', // Maps to the address
        header: 'Address',
        enableSorting: false,
        size: 50, //small column
        Cell: ({ cell }) => (
          <CustomTooltip label={cell.getValue("address")} text={cell.getValue("address")}/>
        ),
      },
      {
        accessorKey: 'baseTokenPoints', // Maps to the address
        header: 'Base Token Points',
        size: 50, //small column
      },
      {
        accessorKey: 'redeemLimit', // Maps to the address
        header: 'redeemLimit',
        enableSorting: false,
        size: 50, //small column
      },
    ],
    []
  );

  const customModal = (data = {}) =>
    modals.openContextModal({
      title: <Text fw={600}>{data?.id ? 'Edit Hotel' : 'Add Hotel'}</Text>,
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
      <ReUsableHeader
        search={search}
        setSearch={setSearch}
        Component={
          <Button variant="default"
            onClick={() => {
              customModal()
            }}>
            <Text size="sm" fw={300}>Add Hotel</Text>
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
    </>
  )
}

export default Hotel