import { Modal, Text } from '@mantine/core';

function CustomModal({ children,title, opened, close }) {
    return (
        <Modal opened={opened} onClose={close} title={<Text fw={600}>{title}bs</Text>} centered closeOnClickOutside={false}>
            {children}
        </Modal>
    );
}

export default CustomModal;
