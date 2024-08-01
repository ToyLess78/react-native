import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    leaf: {
        position: 'absolute',
        width: 100,
        height: 100,
        opacity: 0.5,
    },
    leafTop: {
        top: 20,
        left: 20,
    },
    leafBottom: {
        bottom: 20,
        right: 20,
    },
});

export default styles;
