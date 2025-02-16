import { notifications } from '@mantine/notifications';

export const configToast = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
};

export const showSuccessNotification = (title, message, configToast) => {
    return notifications.show({
        title: title,
        message: message,
        ...configToast
    });
};

export const showErrorNotification = (title, message, configToast) => {
    return notifications.show({
        color: 'red',
        title: title,
        message: message,
        ...configToast
    })
};

export const showDeleteNotification = (title, message, configToast) => {
    return notifications.show({
        color: 'red',
        title: title,
        message: message,
        ...configToast
    });
};