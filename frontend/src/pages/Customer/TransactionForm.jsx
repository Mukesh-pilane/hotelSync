import React, { useState } from 'react'
import { useForm } from '@mantine/form';
import { Button, SimpleGrid, Group, NumberInput, TextInput } from '@mantine/core';
import { useTransactionLogMutation } from '../../store/server/queries/customersQuery';
import { getCustomers } from '../../store/server/services/customersService';

const initialValues = {
    mobile: '',
    amount: ''
};

const TransactionForm = ({ data, close }) => {
    const [customerId, setCustomerId] = useState('')
    const { mutate: addTransactionMutation, isError, error } = useTransactionLogMutation();

    const modifiedData = data?.id ? data : initialValues;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
        validate: {
            // mobile: (value) => (/^[6-9]\d{9}$/.test(value) ? null : 'Invalid mobile number'),
        },
    });


    const handleNumerChange = async (val) => {
        if(`${val}`.length===10){
            try {
               const res = await getCustomers({mobile:val})
               setCustomerId(res.data.data[0].id)
            } catch (error) {
                console.log('error', error)
            }
        }
    }


    const handleSubmit = async (values) => {
            addTransactionMutation({ amount:values.amount, customerId}, {onSuccess:close});
    };

    return (
        <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <NumberInput
                withAsterisk
                label="Mobile Number"
                placeholder="+91"
                key={form.key('mobile')}
                {...form.getInputProps('mobile')}
                onChange={handleNumerChange}
                hideControls
                maxLength={10}
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