import React, { useMemo, useState } from 'react'
import { modals } from '@mantine/modals';
import { ActionIcon, Box, Button, Flex, Group, LoadingOverlay, NumberInput, Stack, Text, Textarea, TextInput } from '@mantine/core'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader';
import Table from '../../components/shared/Table/Table';
import { IconEdit, IconTrash, IconX } from '@tabler/icons-react';
import { useDeleteTokenRangeMutation, useGetTokenRangeQuery } from '../../store/server/queries/tokenRangeQuery';
import TokenRangeForm from './TokenRangeForm';
import { useUpdateHotelMutation } from '../../store/server/queries/hotelQuery';
import { useAuthStore } from '../../store/client/authStore';
import { useForm } from '@mantine/form';
import styles from './HotelSetting.module.scss';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';




const hotelSchema = z.object({
    name: z.string().min(10, { message: 'Mobile must have at least 10 characters' }),
    address: z.string()
        .min(5, { message: 'Address should have minimum 5 charcaters' })
        .max(200, { message: 'Address should have maximum 200 charcaters' }),
    baseTokenPoints: z.number().min(5, { message: 'Base Token Points is Required' }),
    redeemLimit: z.number().min(5, { message: 'Redeem Limit is Required' })
});

const HotelSetting = () => {
    const { data: tokenRangeData, isLoading: loading } = useGetTokenRangeQuery({});
    const { userData } = useAuthStore();
    const { mutate: deleteTransaction } = useDeleteTokenRangeMutation();
    const { mutate: updateHotelMutation, isLoading } = useUpdateHotelMutation();
    const [isEdit, setIsEdit] = useState(false)

    const form = useForm({
        mode: 'controlled',
        initialValues: userData.hotel,
        enhanceGetInputProps: () => ({ disabled: !isEdit }),
        validate: zodResolver(hotelSchema)
    });


    const handleSubmit = async (values) => {
        updateHotelMutation({ id: userData?.hotel?.id, data: values },
            {
                onSuccess: () => {
                    setIsEdit(false);
                    form?.reset(values);
                    localStorage?.setItem({
                        ...userData,
                        hotel: {
                            id: userData?.hotel?.id,
                            ...values
                        }
                    })
                }
            }
        );
    };


    const columns = useMemo(
        () => [
            {
                accessorKey: 'startAmount',
                header: 'Start Amount',
                size: 50, //small column
            },
            {
                accessorKey: 'endAmount',
                header: 'End Amount',
                size: 50, //small column
            },
            {
                accessorKey: 'tokenPoints',
                header: 'Token Points',
                size: 50, //small column
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
                        <Flex justify="flex-end">
                            {isEdit
                                ?
                                <ActionIcon color='indigo' onClick={() => { setIsEdit(false); form.reset() }}>
                                    <IconX cursor="pointer" />
                                </ActionIcon>
                                :
                                <ActionIcon color='indigo' onClick={() => setIsEdit(true)}>
                                    <IconEdit cursor="pointer" />
                                </ActionIcon>
                            }
                        </Flex>
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
                        <NumberInput
                            withAsterisk
                            label="Redeem Limit"
                            placeholder="100"
                            key={form.key('redeemLimit')}
                            {...form.getInputProps('redeemLimit')}
                            hideControls
                        />
                        {
                            isEdit &&
                            <Group justify="flex-end" mt="md">
                                <Button variant='default' type="submit">Update</Button>
                            </Group>
                        }

                    </form>
                    <Table
                        columns={columns}
                        data={tokenRangeData?.data}
                        isLoading={tokenRangeData === undefined}
                        tableSetting={{
                            enableRowActions: true,
                            state: { isLoading: loading },
                            enableColumnActions: false,
                            enableColumnFilters: false,
                            enablePagination: false,
                            enableTopToolbar: false,
                            enablePagination: false,
                            enableBottomToolbar: false,
                            mantineTableProps: {
                                highlightOnHover: false,
                                withColumnBorders: false,
                                withBorder: 'light',
                            },
                            mantineTableContainerProps: { sx: { maxHeight: 'calc(100vh - 14rem)', height: "fit-content" } },
                            mantinePaperProps: { sx: { height: 'fit-content' } },
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