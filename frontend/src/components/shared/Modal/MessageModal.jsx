import { Button, Stack, Text } from '@mantine/core';
import React from 'react'

const MessageModal = ({ context, id, innerProps }) => {
    const { message, handleOkCallback } = innerProps
    return (
        <Stack>
            <Text>{message}</Text>
            <Button
                w={100}
                onClick={() => {
                    handleOkCallback()
                    context.closeModal(id)
                }}>Ok</Button>
        </Stack>
    );
}

export default MessageModal