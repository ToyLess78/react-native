import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderImage: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
    placeholderText: {
        fontFamily: 'LobsterTwo-Italic',
        fontSize: 24,
    },
    icon: {
        marginRight: 15,
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        color: 'red',
    },
});

export default styles;
