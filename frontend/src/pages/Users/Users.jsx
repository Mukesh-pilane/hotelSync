import React, { useMemo, useState } from 'react';
import { modals } from '@mantine/modals';
import { ActionIcon, Button, Flex, Text } from '@mantine/core';
import UserForm from './UserForm';
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader';
import styles from "./Users.module.scss";
import { useDeleteUserMutation, useGetUserQuery } from '../../store/server/queries/userQuery';
import Table from '../../components/shared/Table/Table';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';

const Users = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10, // customize the default page size
    });
    const [globalFilter, setGlobalFilter] = useState('');
    const { data: usersData, isLoading } = useGetUserQuery({ page: pagination.pageIndex + 1, limit: pagination.pageSize, search: globalFilter || "" });
    const { mutate: deleteUser } = useDeleteUserMutation();

    const columns = useMemo(
        () => [
            {
                accessorKey: 'first_name',
                header: 'First Name',
                size: 50
            },
            {
                accessorKey: 'last_name',
                header: 'Last Name',
                size: 50
            },
            {
                accessorKey: 'mobile',
                header: 'Mobile',
                size: 80
            },
            {
                accessorKey: 'role.name',
                header: 'Role',
                size: 50
            },
            {
                accessorKey: 'hotel.name',
                header: 'Hotel',
                size: 50
            },
            {
                accessorKey: 'updatedAt',
                header: 'Updated At',
                Cell: ({ cell }) => (
                    cell.getValue("updatedAt") ? dayjs(cell.getValue("updatedAt")).format('DD MMM YYYY') : "--"
                ),
            },
        ],
        []
    );

    const customModal = (data = {}) =>
        modals.openContextModal({
            title: <Text fw={600}>{data?.id ? 'Edit User' : 'Add User'}</Text>,
            modal: 'custom',
            centered: true,
            closeOnClickOutside: false,
            innerProps: {
                body: UserForm,
                data
            }
        });

    const openDeleteModal = (userId) =>
        modals.openContextModal({
            title: 'Delete User',
            modal: 'delete',
            centered: true,
            closeOnClickOutside: false,
            innerProps: {
                body: (
                    <Text size="sm">
                        Are you sure you want to delete this user?
                    </Text>
                ),
                submitText: "Delete",
                handleSubmit: (closeModal) => {
                    deleteUser(userId, { onSuccess: closeModal });
                },
            }
        });

    return (
        <>
            <ReUsableHeader
                Component={
                    <Flex gap="1rem" className={styles.btnMenu}>
                        <Button variant="default" onClick={() => customModal()}>
                            <Text size="sm" fw={300}>Add User</Text>
                        </Button>
                    </Flex>
                }
            />

            <Table
                columns={columns}
                data={usersData?.data || []}
                tableSetting={{
                    enableRowActions: true,
                    enableGlobalFilter: true,
                    manualFiltering: true,
                    onGlobalFilterChange: setGlobalFilter, // hoist internal global state to your state
                    manualPagination: true,
                    rowCount: usersData?.total,
                    onPaginationChange: setPagination,
                    state: { pagination, isLoading, globalFilter },
                    renderRowActions: ({ row }) => (
                        <Flex>
                            <ActionIcon color='primary' onClick={() => customModal(row.original)}>
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
    );
};

export default Users;