import React from 'react'
import { useForm } from '@mantine/form';
import { Button, SimpleGrid, Group, NumberInput, TextInput } from '@mantine/core';
import { useAddCustomerMutation } from '../../store/server/queries/customersQuery';

const initialValues = {
    mobile: '',
};

const UserForm = ({ data, close }) => {
    const { mutate: addCustomerMutation, isError, error } = useAddCustomerMutation();

    const modifiedData = data?.id ? data : initialValues;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
        validate: {
            mobile: (value) => (/^[6-9]\d{9}$/.test(value) ? null : 'Invalid mobile number'),
        },
    });


    const handleSubmit = async (values) => {
        addCustomerMutation({ ...values, mobile: `${values.mobile}` })
    };

    return (
        <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} justify="space-between">
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
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }} justify="space-between">
                <NumberInput
                    withAsterisk
                    label="Mobile Number"
                    placeholder="+91"
                    key={form.key('mobile')}
                    {...form.getInputProps('mobile')}
                    hideControls
                    maxLength={10}
                />
                <NumberInput
                    withAsterisk
                    label="token"
                    placeholder="50,100,200"
                    key={form.key('hotelId')}
                    {...form.getInputProps('hotelId')}
                    hideControls
                />
            </SimpleGrid>
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

export default UserForm