import React, { useMemo, useState } from 'react'
import Table from '../../components/shared/Table/Table'
import {
  ActionIcon, Button, Flex,
  Text
} from '@mantine/core'
import { modals } from '@mantine/modals';
import {
  IconEdit,
  IconTrash
} from '@tabler/icons-react';
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader'
import { useNavigate } from 'react-router-dom';
import CustomerForm from './CustomerForm'
import { useDeleteCustomerMutation, useGetCustomerQuery } from '../../store/server/queries/customersQuery'
import dayjs from 'dayjs'

const Users = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10, //customize the default page size
  });
  const [globalFilter, setGlobalFilter] = useState('');

  const { data: customersData, isLoading } = useGetCustomerQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: globalFilter || ""
  });
  const { mutate: deleteCustomer } = useDeleteCustomerMutation();
  const navigate = useNavigate();



  const openDeleteModal = (customerId) =>
    modals.openContextModal({
      title: 'Delete Customer',
      modal: 'delete',
      closeOnClickOutside: false,
      centered: true,
      innerProps: {
        body: (
          <Text size="sm">
            Are you sure you want to delete this Customer It will delete all of his Transaction
          </Text>
        ),
        submitText: "Delete",
        handleSubmit: (closeModal) => {
          deleteCustomer(customerId, { onSuccess: closeModal, })
        },
      }
    });

  const customModal = (data = {}, customTitle) =>
    modals.openContextModal({
      title: <Text fw={600}>{customTitle ? customTitle : data?.id ? 'Edit Customer' : 'Add Customer'}</Text>,
      modal: 'custom',
      centered: true,
      closeOnClickOutside: false,
      innerProps: {
        body: CustomerForm,
        data,
        handleNavigate: () => navigate('/transaction')
      }
    });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size:50
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size:50
      },
      {
        accessorKey: 'mobile',
        header: 'Mobile',
        size:80
      },
      {
        accessorKey: 'customer_token_point.points',
        header: 'Token',
        Cell: ({ cell }) => (
          cell.getValue("customer_token_point.points") ?? "--"
        ),
        size:80
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        Cell: ({ cell }) => (
          cell.getValue("updatedAt") ? dayjs(cell.getValue("updatedAt")).format('DD MMM YYYY') :  "--"
        ),
      },
    ],
    []
  );


  return (
    <>
      <ReUsableHeader
        Component={
          <>
            <Flex gap="1rem">
              <Button variant="default" onClick={() => customModal()}>
                <Text size="sm" fw={300}>Add Customer</Text>
              </Button>
            </Flex>
          </>
        }
      />
      <Table
        columns={columns}
        data={customersData?.data}
        tableSetting={{
          enableRowActions: true,
          manualPagination: true,
          manualFiltering: true,
          enableGlobalFilter: true,
          onGlobalFilterChange: setGlobalFilter,
          rowCount: customersData?.total,
          onPaginationChange: setPagination,
          state: { pagination, isLoading },
          renderRowActions: ({ row }) => (
            <Flex>
              <ActionIcon color='primary' onClick={() => {
                customModal(row.original)
              }}>
                <IconEdit />
              </ActionIcon>
              <ActionIcon color="orange" onClick={() => openDeleteModal(row?.original?.id)}>
                <IconTrash />
              </ActionIcon>
            </Flex>
          ),
        }}
      />
    </>
  )
}

export default Users