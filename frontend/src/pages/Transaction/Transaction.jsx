import React, { useMemo, useState } from 'react'
import { modals } from '@mantine/modals';
import { ActionIcon, Button, Flex, Text } from '@mantine/core'
import TransactionForm from './TransactionForm'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader';
import styles from "./Transaction.module.scss"
import { useDeleteTransactionMutation, useGetTransactionQuery } from '../../store/server/queries/transactionQuery';
import Table from '../../components/shared/Table/Table';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import dayjs from 'dayjs';

const Transaction = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10, //customize the default page size
    });
    const [globalFilter, setGlobalFilter] = useState('');
    const { data: transactionData, isLoading } = useGetTransactionQuery({ page: pagination.pageIndex + 1, limit: pagination.pageSize, search: globalFilter || "" })
    const { mutate: deleteTransaction } = useDeleteTransactionMutation();


    const columns = useMemo(
        () => [
            {
                accessorKey: 'customer.firstName',
                header: 'First Name',
                size: 50
            },
            {
                accessorKey: 'customer.lastName',
                header: 'Last Name',
                size: 50
            },
            {
                accessorKey: 'customer.mobile',
                header: 'Mobile',
                size: 80
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                size: 50
            },
            {
                accessorKey: 'redeemed_points',
                header: 'Redeem Points',
                size: 50
            },
            {
                accessorKey: 'customer.updatedAt',
                header: 'Updated At',
                Cell: ({ cell }) => (
                    cell.getValue("customer.updatedAt") ? dayjs(cell.getValue("customer.updatedAt")).format('DD MMM YYYY') : "--"
                ),
            },
        ],
        []
    );



    const customModal = (data = {}) =>
        modals.openContextModal({
            title: <Text fw={600}>{data?.id ? 'Edit Transaction' : 'Add Transaction'}</Text>,
            modal: 'custom',
            centered: true,
            closeOnClickOutside: false,
            innerProps: {
                body: TransactionForm,
                data
            }
        });



    const openDeleteModal = (transactionId) =>
        modals.openContextModal({
            title: 'Delete Transaction',
            modal: 'delete',
            centered: true,
            closeOnClickOutside: false,
            innerProps: {
                body: (
                    <Text size="sm">
                        Are you sure you want to delete this transaction
                    </Text>
                ),
                submitText: "Delete",
                handleSubmit: (closeModal) => {
                    deleteTransaction(transactionId, { onSuccess: closeModal })
                },
            }

        });

    return (
        <>
            <ReUsableHeader
                Component={
                    <>
                        <Flex gap="1rem"
                            className={styles.btnMenu}
                        >
                            <Button variant="default" onClick={() => customModal()}>
                                <Text size="sm" fw={300}>Add Transaction</Text>
                            </Button>
                        </Flex>
                    </>
                }
            />

            <Table
                columns={columns}
                data={transactionData?.data || []}
                tableSetting={{
                    enableRowActions: true,
                    enableGlobalFilter: true,
                    manualFiltering: true,
                    onGlobalFilterChange: setGlobalFilter, //hoist internal global state to your state
                    manualPagination: true,
                    rowCount: transactionData?.total,
                    onPaginationChange: setPagination,
                    state: { pagination, isLoading, globalFilter },
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

export default Transaction