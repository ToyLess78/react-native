import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10,
    },
    flexButton: {
        flex: 1,
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        height: 100,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginVertical: 10,
    },
    saveButton: {
        fontSize: 18,
        marginRight: 10,
    },
    iconContainer: {
        marginRight: 10,
    },
    iconButtonRow: {
        marginTop: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 16,
    },
    iconButton: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
});

export default styles;
