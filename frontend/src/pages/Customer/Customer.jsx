import React, { useState, useMemo } from 'react'
import Table from '../../components/shared/Table/Table'
import { Button, Flex, Menu, Stack } from '@mantine/core'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader'
import { useDisclosure } from '@mantine/hooks'
import CustomModal from '../../components/shared/Modal/Modal'
import UserForm from './UserForm'
import { useGetCustomerQuery } from '../../store/server/queries/customersQuery'
import TransactionForm from './TransactionForm'
import { IconSettings } from '@tabler/icons-react';
import styles from "./Custmer.module.scss"
import { IconUserPlus } from '@tabler/icons-react';
import { IconTransactionRupee } from '@tabler/icons-react';


const Users = () => {
  const [search, setSearch] = useState("")
  const [opened, { open, close }] = useDisclosure(false);
  const [transactionOpened, { open: transactionOpen, close: transactionClose }] = useDisclosure(false);

  const { data: customersData } = useGetCustomerQuery({})


  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName', // Maps to the first name
        header: 'First Name',
      },
      {
        accessorKey: 'lastName', // Maps to the last name
        header: 'Last Name',
      },
      {
        accessorKey: 'mobile', // Maps to the mobile number
        header: 'Mobile',
      },
      {
        accessorKey: 'customer_token_point', // Maps to the avatar image
        header: 'Token',
        Cell: ({ cell }) => (
          cell.customer_token_point || "--"
        ),
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
                    onClick={open}>Add Customer</Menu.Item>
                  <Menu.Item
                    icon={<IconTransactionRupee size={14} />}
                    onClick={transactionOpen}>Add Transaction</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Flex gap="1rem"
                className={styles.btnMenu}
              >
                <Button variant="default" onClick={open}>
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
        // tableSetting={{
        //   enableEditing: true,
        // }}
        />
      </Stack>
      <CustomModal title="Customer" opened={opened} close={close}>
        <UserForm data={{}} close={close} />
      </CustomModal>
      <CustomModal title="Customer" opened={transactionOpened} close={transactionClose}>
        <TransactionForm close={transactionClose} />
      </CustomModal>
    </>
  )
}

export default Users