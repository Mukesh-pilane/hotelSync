import React, { useState } from 'react'
import { useForm } from '@mantine/form';
import { Button, Group, NumberInput, TextInput } from '@mantine/core';
import { useAddCustomerMutation, useTransactionLogMutation } from '../../store/server/queries/customersQuery';
import { getCustomers } from '../../store/server/services/customersService';

const initialValues = {
    mobile:""
};

const UserForm = ({ data, close }) => {

    const { mutate: addCustomerMutation, isError, error } = useAddCustomerMutation();
    const { mutate: addTransactionMutation } = useTransactionLogMutation();

    const [customerId, setCustomerId] = useState('')
    const modifiedData = data?.id ? data : initialValues;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
    });

    const handleNumerChange = async (val) => {

        if (`${val}`.length === 10) {
            try {
                const res = await getCustomers({ mobile: val })
                form.setFieldValue("mobile", val)
                setCustomerId(res.data.data[0]?.id)
            } catch (error) {
                console.log('error', error)
            }
        } else {
            setCustomerId("")
        }
    }


    const handleSubmit = async (values) => {
        if (customerId) {
            addTransactionMutation({ amount: values.amount, customerId },  {onSuccess:close});
        } else {
            addCustomerMutation({ ...values, mobile: `${values.mobile}`, belongsToHotel: 1 },  {onSuccess:close});
        }
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
            {
                customerId ?
                    <NumberInput
                        withAsterisk
                        label="Amount"
                        placeholder="1000"
                        key={form.key('amount')}
                        {...form.getInputProps('amount')}
                        onChange={handleNumerChange}
                        hideControls
                    /> :
                    <>
                        <TextInput
                            withAsterisk
                            label="First Name"
                            placeholder="Jhon"
                            key={form.key('firstName')}
                            {...form.getInputProps('firstName')}
                        />
                        <TextInput
                            withAsterisk
                            label="Last Name"
                            placeholder="doe"
                            key={form.key('lastName')}
                            {...form.getInputProps('lastName')}
                        />
                        <NumberInput
                            withAsterisk
                            label="Amount"
                            placeholder="1000"
                            key={form.key('amount')}
                            {...form.getInputProps('amount')}
                            hideControls
                            // onChange={handleNumerChange}
                        />
                    </>

            }

            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}

export default UserForm