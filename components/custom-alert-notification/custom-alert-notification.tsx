import React, { ReactElement } from 'react';
import { useTheme } from '../../hooks';
import { COLORS_LIGHT } from '../../constants';
import { AlertNotificationRoot } from 'react-native-alert-notification';

export const CustomAlertNotification: React.FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('custom-alert-notification must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    const isLightTheme = theme === COLORS_LIGHT;

    const customColors = {
        label: theme.SECONDARY,
        card: theme.APP_BACKGROUND,
        overlay: theme.APP_BACKGROUND,
        success: theme.PRIMARY,
        danger: theme.ERROR,
        warning: theme.SECONDARY,
        info: theme.SECONDARY,
    };

    return (
        <AlertNotificationRoot
            theme={isLightTheme ? 'light' : 'dark'}
            colors={[customColors, customColors]}
            toastConfig={{
                titleStyle: { color: theme.SECONDARY },
                textBodyStyle: { color: theme.SECONDARY },
            }}
            dialogConfig={{
                closeOnOverlayTap: true,
                autoClose: false,
            }}
        >
            {children}
        </AlertNotificationRoot>
    );
};