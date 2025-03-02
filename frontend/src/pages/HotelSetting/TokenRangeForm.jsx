import React from 'react'
import z from 'zod';
import { useForm } from '@mantine/form';
import { Button, Group, NumberInput, Select, Text } from '@mantine/core';
import { zodResolver } from 'mantine-form-zod-resolver';
// import { RangeSlider } from '@mantine/core';
import { useAddTokenRangeMutation, useGetTokenRangeQuery, useUpdateTokenRangeMutation } from '../../store/server/queries/tokenRangeQuery';
import { useGetHotelQuery } from '../../store/server/queries/hotelQuery';
import { useAuthStore } from '../../store/client/authStore';


const tokenRangeSchema = (tokenData) => z.object({
    hotelId: z.number().min(1, { message: 'hotelId must be at least 1' }),
    startAmount: z.number().min(0, { message: 'startAmount is required' }),
    endAmount: z.number().min(1, { message: 'endAmount is required' }),
    tokenPoints: z.number().min(1, { message: 'tokenPoints is required' }),
}).refine(data => data.endAmount > data.startAmount, {
    message: 'endAmount must be greater than startAmount',
    path: ['endAmount'], // the error will be associated with endAmount field
}).refine(data => {
    // Check if the new range is fully contained or overlaps any existing ranges
    for (const range of tokenData) {
        if (
            (data.startAmount >= range.startAmount && data.startAmount <= range.endAmount) || // New range's start within existing range
            (data.endAmount >= range.startAmount && data.endAmount <= range.endAmount) || // New range's end within existing range
            (data.startAmount <= range.startAmount && data.endAmount >= range.endAmount) // New range fully contains the existing range
        ) {
            return false; // Reject if there's any overlap or containment
        }
    }
    return true; // Allow if no overlap or containment
}, {
    message: 'The specified range overlaps with or is contained within an existing range.',
    path: ['startAmount'], // or 'endAmount' depending on which field you want to mark the error
});


const initialValues = {
    hotelId: '',
    startAmount: 20,
    endAmount: 1000,
    tokenPoints: 1000,
};


const TokenRangeForm = ({ data, close, toggleLoading }) => {
    const { userData } = useAuthStore((state) => state);
    const { data: tokenRangeData } = useGetTokenRangeQuery({ hotelId: userData?.hotel?.id, limit: 10000, page: 1 });

    const { data: hotleOptions } = useGetHotelQuery({})

    const { mutate: addTokenRangeMutation } = useAddTokenRangeMutation();
    const { mutate: updateTokenRangeMutation } = useUpdateTokenRangeMutation();

    const modifiedData = data?.id ? data : { ...initialValues, hotelId: userData?.hotel?.id };
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
        validate: zodResolver(tokenRangeSchema(tokenRangeData)),
    });


    console.log('form?.values', form?.values)
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
                hideControls
                disabled
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