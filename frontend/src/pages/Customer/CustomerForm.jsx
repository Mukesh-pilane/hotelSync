import React, { useState } from 'react'
import { useForm } from '@mantine/form';
import { Button, Group, NumberInput, TextInput } from '@mantine/core';
import { useAddCustomerMutation, useUpdateCustomerMutation } from '../../store/server/queries/customersQuery';
import { getCustomers } from '../../store/server/services/customersService';
import { useTransactionLogMutation } from '../../store/server/queries/transactionQuery';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';

const initialValues = {
    mobile: ""
};


const customerSchema = (isUpdate) => {
    return z.object({
        mobile: z.number().min(10, { message: 'Mobile must have at least 10 characters' }),
        amount: isUpdate ? z.number().optional() : z.number().min(1, { message: 'Amount is required' }),
        firstName: z.string().min(3, { message: 'First name must have at least 3 characters' }),
        lastName: z.string().min(3, { message: 'Last name must have at least 3 characters' }),
    });
}

const transactionSchema = z.object({
    mobile: z.number().min(10, { message: 'Mobile must have at least 10 characters' }),
    amount: z.number().min(1, { message: 'Amount is required' }),
});

const CustomerForm = ({ data, close, toggleLoading, handleNavigate }) => {
    const { mutate: addCustomerMutation } = useAddCustomerMutation();
    const { mutate: addTransactionMutation } = useTransactionLogMutation();
    const { mutate: updateCustomerMutation } = useUpdateCustomerMutation();
    const [customerId, setCustomerId] = useState('')
    const modifiedData = data?.id ? { ...data, mobile: Number(data.mobile) } : initialValues;



    const form = useForm({
        mode: 'controlled',
        initialValues: modifiedData,
        validate: zodResolver(customerId ? transactionSchema : data?.id ? customerSchema(true) : customerSchema(false)),
    });


    const handleNumerChange = async (val) => {
        if (`${val}`.length > 10) {
            return;
        }

        if (`${val}`.length === 10) {
            try {
                const res = await getCustomers({ search: val })
                form.setFieldValue("mobile", val)
                setCustomerId(res.data.data[0]?.id)
            } catch (error) {
                console.error('error', error)
            }
        } else {
            setCustomerId("")
            form.setFieldValue("mobile", val)
        }
    }



    const handleSubmit = async (values) => {
        toggleLoading(true)
        if (data?.id) {
            updateCustomerMutation({ ...values, mobile: `${values.mobile}` }, { onSuccess: close })
        } else {
            if (customerId) {
                addTransactionMutation({ amount: values.amount, customerId }, { onSuccess: close });
                handleNavigate()
            } else {
                addCustomerMutation({ ...values, mobile: `${values.mobile}`, belongsToHotel: 1 }, { onSuccess: close });
            }
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
                value={form.values.mobile}
                onChange={handleNumerChange}
                hideControls
                maxLength={10}
                type='number'
                onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 10);
                }}
            />
            {
                customerId ?
                    <NumberInput
                        withAsterisk
                        label="Amount"
                        placeholder="1000"
                        key={form.key('amount')}
                        {...form.getInputProps('amount')}
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
                        {
                            !data?.id &&
                            <NumberInput
                                withAsterisk
                                label="Amount"
                                placeholder="1000"
                                key={form.key('amount')}
                                {...form.getInputProps('amount')}
                                hideControls
                                type='number'
                            />
                        }

                    </>

            }
            <Group justify="flex-end" mt="md">
                <Button disabled={!form.isDirty()} type="submit" >Submit</Button>
            </Group>
        </form>
    )
}

export default CustomerForm