import React, { useState } from 'react'
import { useForm } from '@mantine/form';
import { Box, Button, Group, NumberInput, Text, TextInput } from '@mantine/core';
import { useAddCustomerMutation, useUpdateCustomerMutation } from '../../store/server/queries/customersQuery';
import { getCustomers } from '../../store/server/services/customersService';
import { useTransactionLogMutation } from '../../store/server/queries/transactionQuery';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { modals } from '@mantine/modals';
import TransactionForm from '../Transaction/TransactionForm';
import { notifications } from '@mantine/notifications';

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
                if(!res.data.data[0]?.id){
                    return
                }
                setCustomerId(res.data.data[0]?.id)
                modals.openContextModal({
                    modal: 'message',
                    centered: true,
                    closeOnClickOutside: false,
                    innerProps: {
                        message: "Would you like to add transaction",
                        handleOkCallback: () => {
                            close()
                            modals.openContextModal({
                                title: <Text fw={600}>{'Add Transaction'}</Text>,
                                modal: 'custom',
                                centered: true,
                                closeOnClickOutside: false,
                                innerProps: {
                                    body: TransactionForm,
                                    data: { customerId: res.data.data[0]?.id,  availablePoints: res.data.data[0]?.customer_token_point?.points }
                                }
                            })
                        }
                    }
                })
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
            updateCustomerMutation({ ...values, mobile: `${values.mobile}` }, { onSuccess: close, onError: toggleLoading })
        } else {
            if (customerId) {
                addTransactionMutation({ amount: values.amount, customerId }, { onSuccess: close, onError: toggleLoading });
                handleNavigate()
            } else {
                addCustomerMutation({ ...values, mobile: `${values.mobile}` }, { onSuccess: close, onError: toggleLoading });
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
                <Button disabled={!form.isDirty()} type="submit" >{data?.id ? "Update" : "Submit"}</Button>
            </Group>
        </form>
    )
}

export default CustomerForm