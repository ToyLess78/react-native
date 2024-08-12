import { Dialog, ALERT_TYPE } from 'react-native-alert-notification';

export const showAlert = (type: ALERT_TYPE, title: string, message: string, buttonText = 'close') => {
    Dialog.show({
        type: type,
        title: title,
        textBody: message,
        button: buttonText,
    });
};
