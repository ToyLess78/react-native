import { useFonts } from 'expo-font';
import { useEffect, useState } from "react";

export const useLoadFonts = () => {
    const [fontsLoaded] = useFonts({
        'LobsterTwo-Regular': require('../assets/fonts/LobsterTwo-Regular.otf'),
        'LobsterTwo-Italic': require('../assets/fonts/LobsterTwo-Italic.otf'),
    });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (fontsLoaded) {
            setIsLoaded(true);
        }
    }, [fontsLoaded]);

    return isLoaded;
};
