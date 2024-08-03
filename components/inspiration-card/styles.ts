import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
    },
    backgroundImage: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        borderRadius: 15,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    textContainer: {
        padding: 20,
        borderRadius: 15,
        minHeight: '60%',
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quoteText: {
        fontFamily: 'LobsterTwo-Regular',
        fontSize: 14,
        textAlign: 'center',
    },
    leftAction: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '20%',
        paddingLeft: 20,
    },
    rightAction: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '20%',
        paddingRight: 20,
    },
});

export default styles;
