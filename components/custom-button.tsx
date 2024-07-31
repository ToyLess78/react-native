import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../hooks';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    isInverse?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, disabled = false, style, isInverse = false }) => {
    const themeContext = useTheme();

    if (!themeContext) {
        throw new Error('CustomButton must be used within a ThemeProvider');
    }

    const { theme } = themeContext;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                style,
                {
                    borderColor: theme.PRIMARY,
                    opacity: disabled ? 0.5 : 1,
                },
            ]}
        >
            <Text style={[styles.buttonText, {color: isInverse ? theme.FONT_INVERSE : theme.PRIMARY}]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'LobsterTwo-Regular',
    },
});

export { CustomButton };
