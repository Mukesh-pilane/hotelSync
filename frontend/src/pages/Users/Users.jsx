import React, { useState } from 'react'
import Table from '../../components/shared/Table/Table'
import { Button, Paper, Stack } from '@mantine/core'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader'
import { useDisclosure } from '@mantine/hooks'
import CustomModal from '../../components/shared/Modal/Modal'
import UserForm from './UserForm'

const data = [
  {
    id: '1',
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    fname: 'Robert',
    lname: 'Wolfkisser',
    email: 'rob_wolf@gmail.com',
    mobile: '123-456-7890', // Example mobile number
  },
  {
    id: '2',
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    fname: 'Jill',
    lname: 'Jailbreaker',
    email: 'jj@breaker.com',
    mobile: '234-567-8901', // Example mobile number
  },
  {
    id: '3',
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    fname: 'Henry',
    lname: 'Silkeater',
    email: 'henry@silkeater.io',
    mobile: '345-678-9012', // Example mobile number
  },
  {
    id: '4',
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    fname: 'Bill',
    lname: 'Horsefighter',
    email: 'bhorsefighter@gmail.com',
    mobile: '456-789-0123', // Example mobile number
  },
  {
    id: '5',
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    fname: 'Jeremy',
    lname: 'Footviewer',
    email: 'jeremy@foot.dev',
    mobile: '567-890-1234', // Example mobile number
  },
];



const Users = () => {
  const [search, setSearch] = useState("")
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Stack>
        <ReUsableHeader
          search={search}
          setSearch={setSearch}
          Button={
            <Button variant="default" onClick={open}>
              Add User
            </Button>
          }
        />
        <Paper>
          <Table data={data}/>
        </Paper>
      </Stack>
      <CustomModal title="User" opened={opened} close={close}>
        <UserForm data={{}} close={close} />
      </CustomModal>
    </>
  )
}

export default Users