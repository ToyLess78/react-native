import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../types';
import { useTheme } from '../../hooks';
import { InspirationCard, ScreenBackground } from '../../components';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { createInspiration, fetchInspirations } from '../../store/inspirationSlice';
import { sortInspirations } from '../../helpers';

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

export const Dashboard: React.FC = () => {
    const themeContext = useTheme();
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const route = useRoute<DashboardScreenRouteProp>();
    const dispatch = useDispatch<AppDispatch>();
    const inspirations = useSelector((state: RootState) => state.inspirations.inspirations);
    const status = useSelector((state: RootState) => state.inspirations.status);
    const error = useSelector((state: RootState) => state.inspirations.error);

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchInspirations());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (route.params?.inspiration) {
            const newInspiration = route.params.inspiration;
            dispatch(createInspiration(newInspiration));
        }
    }, [route.params?.inspiration, dispatch]);

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

    const toggleSortOrder = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortedInspirations = sortInspirations(inspirations, sortOrder);

    return (
        <ScreenBackground>
            <View style={styles.container}>
                {status === 'loading' && (
                    <Text style={[styles.loadingText, { color: theme.SECONDARY }]}>Loading...</Text>
                )}
                {status === 'failed' && (
                    <Text style={[styles.errorText, { color: theme.ERROR }]}>Error: {error}</Text>
                )}
                {inspirations.length === 0 && status !== 'loading' ? (
                    <View style={styles.placeholderContainer}>
                        <Image source={require('../../assets/empty-placeholder.png')} style={styles.placeholderImage} />
                        <Text style={[styles.placeholderText, { color: theme.SECONDARY }]}>No inspirations yet</Text>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
                            <Text style={[styles.sortButtonText, { color: theme.PRIMARY }]}>
                                Sort by date
                            </Text>
                            <Ionicons
                                name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
                                size={16}
                                color={theme.PRIMARY}
                            />
                        </TouchableOpacity>

                        <FlatList
                            data={sortedInspirations}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <InspirationCard
                                    quote={item.quote || ''}
                                    imageUrl={item.image_url || require('../../assets/no-image.jpg')}
                                />
                            )}
                        />
                    </View>
                )}
            </View>
        </ScreenBackground>
    );
};