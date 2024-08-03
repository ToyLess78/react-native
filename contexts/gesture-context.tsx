import React, { createContext, useContext, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

type GestureContextType = {
    activeSwipeable: React.RefObject<Swipeable> | null;
    setActiveSwipeable: React.Dispatch<React.SetStateAction<React.RefObject<Swipeable> | null>>;
};

const GestureContext = createContext<GestureContextType | undefined>(undefined);

export const useGestureContext = () => {
    const context = useContext(GestureContext);
    if (!context) {
        throw new Error('useGestureContext must be used within a GestureProvider');
    }
    return context;
};

export const GestureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeSwipeable, setActiveSwipeable] = useState<React.RefObject<Swipeable> | null>(null);

    return (
        <GestureContext.Provider value={{ activeSwipeable, setActiveSwipeable }}>
            {children}
        </GestureContext.Provider>
    );
};
