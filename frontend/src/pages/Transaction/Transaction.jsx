import React, { useMemo } from 'react'
import { Button, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import CustomModal from '../../components/shared/Modal/Modal'
import TransactionForm from './TransactionForm'
import ReUsableHeader from '../../components/shared/Header/ReUsableHeader';
import styles from "./Transaction.module.scss"
import { useGetTransactionQuery } from '../../store/server/queries/transactionQuery';
import Table from '../../components/shared/Table/Table';

const Transaction = () => {
    const { data: transactionData } = useGetTransactionQuery({})
    const [transactionOpened, { open: transactionOpen, close: transactionClose }] = useDisclosure(false);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'customer.firstName',
                header: 'First Name',
            },
            {
                accessorKey: 'customer.lastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'customer.mobile',
                header: 'Mobile',
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
            },
        ],
        []
    );

    return (
        <>
            <ReUsableHeader
                Component={
                    <>
                        <Flex gap="1rem"
                            className={styles.btnMenu}
                        >
                            <Button variant="default" onClick={transactionOpen}>
                                Add transaction
                            </Button>
                        </Flex>
                    </>
                }
            />
            <Table
                columns={columns}
                data={transactionData?.data || []}
                isLoading={transactionData === undefined}
                tableSetting={{
                    // enableEditing: true,
                    // onEditingRowSave: handleSaveRow
                }}
            />
            <CustomModal title="Transcation" opened={transactionOpened} close={transactionClose}>
                <TransactionForm close={transactionClose} />
            </CustomModal>
        </>
    )
}

export default Transaction