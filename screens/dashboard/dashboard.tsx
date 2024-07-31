import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Inspiration } from '../../types';
import { useTheme } from '../../hooks';
import { ScreenBackground } from "../../components";

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

export const Dashboard: React.FC = () => {
    const themeContext = useTheme();
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const route = useRoute<DashboardScreenRouteProp>();
    const [inspirations, setInspirations] = useState<Inspiration[]>([]);

    useEffect(() => {
        if (route.params?.inspiration) {
            const newInspiration = route.params.inspiration;
            setInspirations((prev) => [...prev, newInspiration]);
        }
    }, [route.params?.inspiration]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Find Your Inspiration',
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('AddInspiration')}>
                    <Ionicons name="add-circle" size={30} color={themeContext?.theme.PRIMARY} style={styles.icon} />
                </TouchableOpacity>
            ),

        });
    }, [navigation, themeContext]);

    if (!themeContext) {
        throw new Error('Dashboard must be used within a ThemeProvider');
    }

    const { theme } = themeContext;
    return (
        <ScreenBackground>
            <View style={styles.container}>
                {inspirations.length === 0 ? (
                    <View style={styles.placeholderContainer}>
                        <Image source={require('../../assets/empty-placeholder.png')} style={styles.placeholderImage} />
                        <Text style={[styles.placeholderText, { color: theme.FONT_MAIN }]}>No inspirations yet</Text>
                    </View>
                ) : (
                    <FlatList
                        data={inspirations}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={[styles.inspirationCard, { backgroundColor: theme.SECONDARY }]}>
                                <Text style={{ color: theme.FONT_MAIN }}>{item.quote}</Text>
                                {item.image_url && (
                                    <Image source={{ uri: item.image_url }} style={styles.image} />
                                )}
                            </View>
                        )}
                    />
                )}
            </View>
        </ScreenBackground>
    );
};

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
    inspirationCard: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    icon: {
        marginRight: 10,
    },
});
