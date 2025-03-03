import React from 'react'
import z from 'zod';
import { useForm } from '@mantine/form';
import { Button, Group, NumberInput, Select } from '@mantine/core';
import { useTransactionLogMutation, useUpdateTransactionMutation } from '../../store/server/queries/transactionQuery';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useGetCustomerQuery } from '../../store/server/queries/customersQuery';


const transactionSchema = z.object({
    customerId: z.number().min(1, { message: 'Mobile must have at least 10 characters' }),
    amount: z.number().min(1, { message: 'Amount is required' }),
});
const initialValues = {
    customerId: '',
    redeemPoints:"",
    availablePoints:"",
    amount: ''
};

const TransactionForm = ({ data, close, toggleLoading }) => {
    const { data: customerOptions } = useGetCustomerQuery({})
    const { mutate: addTransactionMutation } = useTransactionLogMutation();
    const { mutate: updateTransactionMutation } = useUpdateTransactionMutation();

    const modifiedData = data?.id ? { ...data, customerId: Number(data?.customer?.id) } : initialValues;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
        validate: zodResolver(transactionSchema),
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