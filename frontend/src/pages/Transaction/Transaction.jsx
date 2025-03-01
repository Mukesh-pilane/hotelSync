import React, { useMemo } from 'react'
import { modals } from '@mantine/modals';
import { ActionIcon, Button, Flex, Text } from '@mantine/core'
import TransactionForm from './TransactionForm'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader';
import styles from "./Transaction.module.scss"
import { useDeleteTransactionMutation, useGetTransactionQuery } from '../../store/server/queries/transactionQuery';
import Table from '../../components/shared/Table/Table';
import { IconEdit, IconTrash } from '@tabler/icons-react';


const Transaction = () => {
    const { data: transactionData } = useGetTransactionQuery({})
    const { mutate: deleteTransaction } = useDeleteTransactionMutation();

    const columns = useMemo(
        () => [
            {
                accessorKey: 'customer.firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'customer.lastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'customer.mobile',
                header: 'Mobile',
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
            },
        ],
        []
    );
    
    

    const customModal = (data = {}) =>
        modals.openContextModal({
            title: data?.id ? 'Edit Transaction' : 'Add Transaction',
            modal: 'custom',
            centered: true,
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
                                Add transaction
                            </Button>
                        </Flex>
                    </>
                }
            />
            <Table
                columns={columns}
                data={transactionData?.data || []}
                isLoading={transactionData === undefined}
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
        </>
    )
}

export default Transaction