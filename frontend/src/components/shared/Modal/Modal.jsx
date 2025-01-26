import { Modal } from '@mantine/core';

function CustomModal({ children,title, opened, close }) {
    return (
        <Modal opened={opened} onClose={close} title={title} centered>
            {children}
        </Modal>
    );
}

export default CustomModal;
