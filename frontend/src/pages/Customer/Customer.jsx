import React, { useMemo } from 'react'
import Table from '../../components/shared/Table/Table'
import { ActionIcon, Button, Flex, Menu, Text } from '@mantine/core'
import { modals } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks'
import { IconEdit, IconSettings, IconTrash } from '@tabler/icons-react';
import { IconUserPlus } from '@tabler/icons-react';
import { IconTransactionRupee } from '@tabler/icons-react';
import styles from "./Custmer.module.scss"
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader'
import CustomModal from '../../components/shared/Modal/Modal'
import CustomerForm from './CustomerForm'
import { useDeleteCustomerMutation, useGetCustomerQuery } from '../../store/server/queries/customersQuery'
import TransactionForm from '../Transaction/TransactionForm'


const Users = () => {
  const { data: customersData } = useGetCustomerQuery({})
  const { mutate: deleteCustomer } = useDeleteCustomerMutation();

  const [transactionOpened, { open: transactionOpen, close: transactionClose }] = useDisclosure(false);


  const openDeleteModal = (customerId) =>
    modals.openContextModal({
      title: 'Delete Customer',
      modal: 'delete',
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
      title: customTitle ? customTitle : data?.id ? 'Edit Customer' : 'Add Customer',
      modal: 'custom',
      centered: true,
      innerProps: {
        body: CustomerForm,
        data
      }
    });

  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'mobile',
        header: 'Mobile',
      },
      {
        accessorKey: 'customer_token_point.points',
        header: 'Token',
        Cell: ({ cell }) => (
          cell.getValue("customer_token_point")?.points ?? "--"
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
            <Menu
              className={styles.menuDropDown}
              shadow="md" width={200} position="bottom-end" visbleFrom="sm">
              <Menu.Target>
                <IconSettings />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconUserPlus size={14} />}
                  onClick={() => customModal()}>Add Customer</Menu.Item>
                <Menu.Item
                  icon={<IconTransactionRupee size={14} />}
                  onClick={transactionOpen}>Add Transaction</Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Flex gap="1rem"
              className={styles.btnMenu}
            >
              <Button variant="default" onClick={() => customModal()}>
                Add Customer
              </Button>
              <Button variant="default" onClick={transactionOpen}>
                Add transaction
              </Button>
            </Flex>
          </>
        }
      />
      <Table
        columns={columns}
        data={customersData?.data || []}
        isLoading={customersData === undefined}
        tableSetting={{
          enableRowActions: true,
          renderRowActions: ({ row }) => (
            <Flex>
              <ActionIcon onClick={() => {
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
      <CustomModal title="Customer" opened={transactionOpened} close={transactionClose}>
        <TransactionForm close={transactionClose} />
      </CustomModal>
    </>
  )
}

export default Users