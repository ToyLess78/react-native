import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Inspiration, RootStackParamList } from '../../types';
import { useTheme } from '../../hooks';
import { InspirationCard, ScreenBackground } from '../../components';
import styles from './styles';

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
                        <Text style={[styles.placeholderText, { color: theme.SECONDARY }]}>No inspirations yet</Text>
                    </View>
                ) : (
                    <FlatList
                        data={inspirations}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <InspirationCard
                                quote={item.quote || ''}
                                imageUrl={item.image_url || require('../../assets/no-image.jpg')}
                            />
                        )}
                    />
                )}
            </View>
        </ScreenBackground>
    );
};