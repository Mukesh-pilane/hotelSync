import React from 'react'
import { useForm } from '@mantine/form';
import { Button, Group, NumberInput, TextInput, Textarea } from '@mantine/core';
import { useAddHotelMutation } from '../../store/server/queries/hotelQuery';

const initialValues = {
    name: '',
    address: '',
    baseTokenPoints: ''
};

const HotelSetting = ({ data, close }) => {
    const { mutate: addHotelMutation } = useAddHotelMutation();

    const modifiedData = data?.id ? data : initialValues;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
    });


    const handleSubmit = async (values) => {
        addHotelMutation({ ...values }, {
            onSuccess: close()
        })
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
                key={form.key('baseTokenPoints')}
                {...form.getInputProps('baseTokenPoints')}
                hideControls
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}

export default HotelSetting