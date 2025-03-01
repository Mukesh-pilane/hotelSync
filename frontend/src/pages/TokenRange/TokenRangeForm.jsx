import React from 'react'
import z from 'zod';
import { useForm } from '@mantine/form';
import { Button, Group, NumberInput, Select, Text } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
// import { RangeSlider } from '@mantine/core';
import { useAddTokenRangeMutation, useUpdateTokenRangeMutation } from '../../store/server/queries/tokenRangeQuery';
import { useGetHotelQuery } from '../../store/server/queries/hotelQuery';


const tokenRangeSchema = z.object({
    hotelId: z.number().min(1, { message: 'hotelId have at least 10 characters' }),
    startAmount: z.number().min(1, { message: 'startAmount is required' }),
    endAmount: z.number().min(1, { message: 'endAmount is required' }),
    tokenPoints: z.number().min(1, { message: 'tokenPoints is required' }),
});

const initialValues = {
    hotelId: '',
    startAmount: '',
    endAmount: '',
    tokenPoints: '',
};


const TokenRangeForm = ({ data, close, toggleLoading }) => {
    const { data: hotleOptions } = useGetHotelQuery({})

    const { mutate: addTokenRangeMutation } = useAddTokenRangeMutation();
    const { mutate: updateTokenRangeMutation } = useUpdateTokenRangeMutation();

    const modifiedData = data?.id ? data : initialValues;
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
        validate: zodResolver(tokenRangeSchema),
    });


    const handleSubmit = async (values) => {
        toggleLoading()
        if (data?.id) {
            updateTokenRangeMutation({ id: data.id, data: values }, { onSuccess: close, onError: toggleLoading });
        } else {
            addTokenRangeMutation(values, { onSuccess: close, onError: toggleLoading });
        }
    };

    return (
        <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Select
                withAsterisk
                label="Hotel"
                placeholder="Hotel Name"
                searchable
                nothingFound="No options"
                key={form.key('hotelId')}
                {...form.getInputProps('hotelId')}
                disabled={data?.id}
                hideControls
                data={hotleOptions ? hotleOptions?.data?.map((hotel) => ({ value: hotel.id, label: hotel?.name })) : []}
            />
            <NumberInput
                withAsterisk
                label="Token Points"
                placeholder="10"
                key={form.key('tokenPoints')}
                {...form.getInputProps('tokenPoints')}
                hideControls
            />
            <NumberInput
                withAsterisk
                label="Start Amount"
                placeholder="10"
                key={form.key('startAmount')}
                {...form.getInputProps('startAmount')}
                hideControls
            />
            <NumberInput
                withAsterisk
                label="End Amount"
                placeholder="10"
                key={form.key('endAmount')}
                {...form.getInputProps('endAmount')}
                hideControls
            />
            {/* <Text size="sm">Token Range</Text>
            <RangeSlider
                thumbSize={14}
                mt="xl"
                maxRange={200000}
                max={200000}
                defaultValue={[form.values?.startAmount, form.values?.endAmount]} /> */}
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    )
}

export default TokenRangeForm