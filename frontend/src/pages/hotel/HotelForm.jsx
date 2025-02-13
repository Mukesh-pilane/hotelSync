import React from 'react'
import { useForm } from '@mantine/form';
import { Button, SimpleGrid, Group, NumberInput, TextInput, Textarea } from '@mantine/core';
import { useAddHotelMutation } from '../../store/server/queries/hotelQuery';

const initialValues = {
    mobile: '',
};

const HotelForm = ({ data, close }) => {
    const { mutate: addHotelMutation, isError, error } = useAddHotelMutation();

    const modifiedData = data?.id ? data : initialValues;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
        validate: {
            mobile: (value) => (/^[6-9]\d{9}$/.test(value) ? null : 'Invalid mobile number'),
        },
    });


    const handleSubmit = async (values) => {
        addHotelMutation({ ...values, mobile: `${values.mobile}` })
        close()
    };

    return (
        <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextInput
                withAsterisk
                label="Name"
                placeholder="uncle chinese"
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
                key={form.key('baseTokens')}
                {...form.getInputProps('baseTokens')}
                hideControls
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}

export default HotelForm