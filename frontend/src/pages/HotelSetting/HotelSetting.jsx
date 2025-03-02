import React, { useMemo } from 'react'
import { modals } from '@mantine/modals';
import { ActionIcon, Box, Button, Flex, Group, LoadingOverlay, NumberInput, Stack, Text, Textarea, TextInput } from '@mantine/core'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader';
import Table from '../../components/shared/Table/Table';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useDeleteTokenRangeMutation, useGetTokenRangeQuery } from '../../store/server/queries/tokenRangeQuery';
import TokenRangeForm from './TokenRangeForm';
import { useUpdateHotelMutation } from '../../store/server/queries/hotelQuery';
import { useAuthStore } from '../../store/client/authStore';
import { useForm } from '@mantine/form';
import styles from './HotelSetting.module.scss';

const HotelSetting = () => {
    const { data: tokenRangeData, isLoading: loading } = useGetTokenRangeQuery({});
    const { userData } = useAuthStore();
    const { mutate: deleteTransaction } = useDeleteTokenRangeMutation();

    const { mutate: updateHotelMutation, isLoading } = useUpdateHotelMutation();


    const form = useForm({
        mode: 'controlled',
        initialValues: userData.hotel,
    });


    const handleSubmit = async (values) => {
        updateHotelMutation({ id: userData?.hotel?.id, data: { name: values.name, address: values.address, baseTokenPoints: values.baseTokenPoints } }, { onSuccess: close });
    };


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
            closeOnClickOutside: false,
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
                    <Flex gap="1rem"
                    >
                        <Button variant="default" onClick={() => customModal()}>
                            <Text size="sm" fw={300}>Add Token Range</Text>
                        </Button>
                    </Flex>
                }
            />
            <Box className={styles.wrapper}>
                <Flex gap="1rem" pt={10} className={styles.container}>
                    <form
                        onSubmit={form.onSubmit(handleSubmit)}
                        className={styles.form}
                    >
                        <LoadingOverlay visible={isLoading} />
                        <TextInput
                            withAsterisk
                            label="Name"
                            placeholder="Hotel name"
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                        <Textarea
                            withAsterisk
                            label="Address"
                            placeholder="address"
                            key={form.key('address')}
                            {...form.getInputProps('address')}
                        />
                        <NumberInput
                            withAsterisk
                            label="Base Token"
                            placeholder="100"
                            key={form.key('baseTokenPoints')}
                            {...form.getInputProps('baseTokenPoints')}
                            hideControls
                        />
                        <Group justify="flex-end" mt="md">
                            <Button variant='default' type="submit">Submit</Button>
                        </Group>
                    </form>
                    <Table
                        columns={columns}
                        data={tokenRangeData?.data}
                        isLoading={tokenRangeData === undefined}
                        tableSetting={{
                            enableRowActions: true,
                            state: { isLoading: loading },
                            mantineTableContainerProps: { sx: { maxHeight: 'calc(100vh - 14rem)' } },
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
                </Flex>
            </Box>
        </>
    )
}

export default HotelSetting