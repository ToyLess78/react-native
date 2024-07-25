import {StyleSheet, Text, View} from "react-native";
import React from "react";

const AddInspiration: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Add Inspiration Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { AddInspiration };
