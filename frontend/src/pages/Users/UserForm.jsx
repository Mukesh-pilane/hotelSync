import React from 'react'
import { useForm } from '@mantine/form';
import { Button, Checkbox, SimpleGrid, Group, NumberInput, TextInput } from '@mantine/core';

const initialValues = {
    email: '',
    termsOfService: false,
};

const UserForm = ({ data, close }) => {

    const modifiedData = data?.id ? data : initialValues;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
        validate: {
            mobile: (value) => (/^[6-9]\d{9}$/.test(value) ? null : 'Invalid mobile number'),
        },
    });


    return (
        <form
            onSubmit={form.onSubmit((values) => console.log(values))}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} justify="space-between">
                <TextInput
                    withAsterisk
                    label="First Name"
                    placeholder="Jhon"
                    key={form.key('fname')}
                    {...form.getInputProps('email')}
                />
                <TextInput
                    withAsterisk
                    label="Last Name"
                    placeholder="doe"
                    key={form.key('lname')}
                    {...form.getInputProps('email')}
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
                />
                <NumberInput
                    withAsterisk
                    label="token"
                    placeholder="50,100,200"
                    key={form.key('mobile')}
                    {...form.getInputProps('mobile')}
                    hideControls
                />
            </SimpleGrid>
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}

export default UserForm