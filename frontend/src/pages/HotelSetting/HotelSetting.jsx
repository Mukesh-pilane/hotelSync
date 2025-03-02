import React, { useMemo } from 'react'
import { modals } from '@mantine/modals';
import { ActionIcon, Button, Flex, Text } from '@mantine/core'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader';
import Table from '../../components/shared/Table/Table';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useDeleteTokenRangeMutation, useGetTokenRangeQuery } from '../../store/server/queries/tokenRangeQuery';
import TokenRangeForm from './TokenRangeForm';


const HotelSetting = () => {
    const { data: tokenRangeData } = useGetTokenRangeQuery({});
    const { mutate: deleteTransaction } = useDeleteTokenRangeMutation();

    const columns = useMemo(
        () => [
            {
                accessorKey: 'startAmount',
                header: 'Start Amount',
            },
            {
                accessorKey: 'endAmount',
                header: 'End Amount',
            },
            {
                accessorKey: 'tokenPoints',
                header: 'Token Points',
            },
        ],
        []
    );

    const customModal = (data = {}) =>
        modals.openContextModal({
            title: data?.id ? 'Edit Token Range' : 'Add Token Range',
            modal: 'custom',
            centered: true,
            innerProps: {
                body: TokenRangeForm,
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
                    <Flex gap="1rem"
                    >
                        <Button variant="default" onClick={() => customModal()}>
                            Add Token Range
                        </Button>
                    </Flex>
                }
            />
            <Table
                columns={columns}
                data={tokenRangeData?.data || []}
                isLoading={tokenRangeData === undefined}
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

export default HotelSetting