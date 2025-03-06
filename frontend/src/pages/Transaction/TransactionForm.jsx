import React from 'react'
import z from 'zod';
import { useForm } from '@mantine/form';
import { Button, Group, NumberInput, Select } from '@mantine/core';
import { useTransactionLogMutation, useUpdateTransactionMutation } from '../../store/server/queries/transactionQuery';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useGetCustomerQuery } from '../../store/server/queries/customersQuery';
import { useAuthStore } from '../../store/client/authStore';


const transactionSchema = (basePoints) => z.object({
    customerId: z.number().min(1, { message: 'Mobile must have at least 10 characters' }),
    amount: z.number().min(0, { message: 'Amount is required' }),
    redeemPoints: z.number().optional().refine(val => val === undefined || val >= 0, {
        message: `Minimum redeem points are ${basePoints}`,
      }),
});
const initialValues = {
    customerId: '',
    redeemPoints: 0,
    availablePoints: "",
    amount: ''
};

const TransactionForm = ({ data, close, toggleLoading }) => {
    const { data: customerOptions } = useGetCustomerQuery({})
    const { mutate: addTransactionMutation } = useTransactionLogMutation();
    const { mutate: updateTransactionMutation } = useUpdateTransactionMutation();
    const { userData } = useAuthStore();

    const modifiedData = data?.id ? { ...data, customerId: Number(data?.customer?.id) } : initialValues;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
        validate: zodResolver(transactionSchema(userData?.hotel?.baseTokenPoints)),
    });


    const handleSubmit = async (values) => {
        toggleLoading()
        if (data?.id) {
            updateTransactionMutation({ id: data.id, data: { amount: values.amount, customerId: data?.customer?.customerId } }, { onSuccess: close, onError: toggleLoading });
        } else {
            addTransactionMutation(values, { onSuccess: close, onError: toggleLoading });
        }
    };

    return (
        <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Select
                withAsterisk
                label="Mobile Number"
                placeholder="+91"
                searchable
                nothingFound="No options"
                key={form.key('customerId')}
                {...form.getInputProps('customerId')}
                onChange={(value) => {
                    form.setFieldValue('customerId', value)
                    form.setFieldValue('availablePoints', customerOptions?.data?.find((customer) => customer.id === value)?.customer_token_point?.points)
                }}
                disabled={data?.id}
                hideControls
                data={customerOptions ? customerOptions?.data?.map((customer) => ({ value: customer.id, label: `${customer.mobile} - ${customer.firstName} ${customer.lastName}` })) : []}
            />
            <NumberInput
                withAsterisk
                label="Available Points"
                placeholder="0"
                key={form.key('availablePoints')}
                {...form.getInputProps('availablePoints')}
                disabled
                hideControls
            />
            <NumberInput
                withAsterisk
                label="Redeem Points"
                placeholder="1000"
                key={form.key('redeemPoints')}
                {...form.getInputProps('redeemPoints')}
                disabled={data?.id}
                hideControls
            />
            <NumberInput
                withAsterisk
                label="Amount"
                placeholder="1000"
                key={form.key('amount')}
                {...form.getInputProps('amount')}
                hideControls
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}

export default TransactionForm