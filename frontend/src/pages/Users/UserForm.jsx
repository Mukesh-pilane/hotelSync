import React from 'react';
import z from 'zod';
import { useForm } from '@mantine/form';
import { Button, Group, TextInput, Select } from '@mantine/core';
import { useAddUserMutation, useUpdateUserMutation } from '../../store/server/queries/userQuery';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useGetRoleQuery } from '../../store/server/queries/roleQuery';
import { useGetHotelQuery } from '../../store/server/queries/hotelQuery';

const userSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    mobile: z.string().min(10, { message: 'Mobile number is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    roleId: z.number().min(1, { message: 'Role is required' }),
    hotelId: z.number().min(1, { message: 'Hotel is required' })
});

const initialValues = {
    firstName: '',
    lastName: '',
    mobile: '',
    password: '',
    roleId: '',
    hotelId: ''
};

const UserForm = ({ data, close, toggleLoading }) => {
    const { data: roleOptions } = useGetRoleQuery({});
    const { data: hotelOptions } = useGetHotelQuery({});
    const { mutate: createUserMutation } = useAddUserMutation();
    const { mutate: updateUserMutation } = useUpdateUserMutation();
    const modifiedData = data?.id ? { ...data } : { ...initialValues };

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: modifiedData,
        validate: zodResolver(userSchema),
    });

    const handleSubmit = async (values) => {
        toggleLoading();
        if (data?.id) {
            updateUserMutation({ id: data.id, data: values }, { onSuccess: close, onError: toggleLoading });
        } else {
            createUserMutation(values, { onSuccess: close, onError: toggleLoading });
        }
    };

    return (
        <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextInput
                withAsterisk
                label="First Name"
                placeholder="John"
                {...form.getInputProps('firstName')}
            />
            <TextInput
                withAsterisk
                label="Last Name"
                placeholder="Doe"
                {...form.getInputProps('lastName')}
            />
            <TextInput
                withAsterisk
                label="Mobile"
                placeholder="+91"
                {...form.getInputProps('mobile')}
            />
            <TextInput
                withAsterisk
                label="Password"
                placeholder="******"
                type="password"
                {...form.getInputProps('password')}
            />
            <Select
                withAsterisk
                label="Role"
                placeholder="Select role"
                data={roleOptions ? roleOptions?.map(role => ({ value: role.id, label: role.name })) : []}
                {...form.getInputProps('roleId')}
            />
            <Select
                withAsterisk
                label="Hotel"
                placeholder="Select hotel"
                data={hotelOptions ? hotelOptions?.data.map(hotel => ({ value: hotel.id, label: hotel.name })) : []}
                {...form.getInputProps('hotelId')}
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    );
};

export default UserForm;
