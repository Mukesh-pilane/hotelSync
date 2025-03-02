import React from 'react'
import Loader from '../Loader/Loader';

const CustomModal = ({ context, id, innerProps }) => {
    const { body: Component, data, handleNavigate } = innerProps
    const [loading, setLoading] = React.useState(false);
    const toggleLoading = () => setLoading((loading) => !loading);
    return (
        <>
            <Component data={data}
                toggleLoading={toggleLoading}
                close={() => {
                    context.closeModal(id)
                }}
                handleNavigate={handleNavigate}
            />
            {loading && <Loader />}
        </>
    );
}

export default CustomModal