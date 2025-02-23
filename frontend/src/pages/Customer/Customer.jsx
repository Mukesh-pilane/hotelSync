import React, { useState, useMemo } from 'react'
import Table from '../../components/shared/Table/Table'
import { Button, Flex, Menu, Stack } from '@mantine/core'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader'
import { useDisclosure } from '@mantine/hooks'
import CustomModal from '../../components/shared/Modal/Modal'
import CustomerForm from './CustomerForm'
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
        accessorKey: 'customer_token_point',
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
        <CustomerForm data={{}} close={close} />
      </CustomModal>
      <CustomModal title="Customer" opened={transactionOpened} close={transactionClose}>
        <TransactionForm close={transactionClose} />
      </CustomModal>
    </>
  )
}

export default Users