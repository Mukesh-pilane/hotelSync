import React from 'react'
import { useForm } from '@mantine/form';
import { Button, Group, NumberInput, TextInput, Textarea } from '@mantine/core';
import { useAddHotelMutation, useUpdateHotelMutation } from '../../store/server/queries/hotelQuery';

const initialValues = {
    name: '',
    address: '',
    baseTokenPoints: '',
    redeemLimit:''
};

const HotelForm = ({ data, close, toggleLoading }) => {
    const { mutate: addHotelMutation } = useAddHotelMutation();
    const { mutate: updateHotelMutation } = useUpdateHotelMutation();


    const modifiedData = data?.id ? data : initialValues;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
    });


    const handleSubmit = async (values) => {
        toggleLoading()
        if (data?.id) {
            updateHotelMutation({ id: data.id, data: { name: values.name, address: values.address, baseTokenPoints: values.baseTokenPoints } }, { onSuccess: close, onError: toggleLoading });
        } else {
            addHotelMutation({ ...values }, {
                onSuccess: close,
                onError: toggleLoading
            })
        }
    };

    return (
        <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
            <Group justify="flex-end" mt="md">
                <Button type="submit">{data?.id ? "Update" : "Submit" }</Button>
            </Group>
        </form>
    )
}

export default HotelForm