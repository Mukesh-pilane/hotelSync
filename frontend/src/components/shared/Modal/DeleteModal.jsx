import React from 'react'
import { Button } from '@mantine/core';
import DeleteLoader from '../Loader/DeleteLoader';


const DeleteModal = ({ context, id, innerProps }) => {
    const [loading, setLoading] = React.useState(false);
    const toggleLoading = () => setLoading((loading) => !loading);
    return (
        <>
            {innerProps?.body}
            <Button
                mt="md"
                color="red"
                onClick={() => {
                    toggleLoading()
                    innerProps.handleSubmit(
                        () => {
                            toggleLoading()
                            context.closeModal(id)
                        })
                }}
                disabled={loading}
            >
                {innerProps?.submitText}
            </Button>
            {loading && <DeleteLoader />}
        </>
    );
}
export default DeleteModal