import React, { createContext, ReactNode, useContext, useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';

interface GestureContextType {
    activeSwipeable: React.MutableRefObject<React.RefObject<Swipeable> | null>;
    setActiveSwipeable: (swipeable: React.RefObject<Swipeable> | null) => void;
    closeActiveSwipeable: () => void;
}

const GestureContext = createContext<GestureContextType | undefined>(undefined);

export const GestureProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const activeSwipeableRef = useRef<React.RefObject<Swipeable> | null>(null);

    const setActiveSwipeable = (swipeable: React.RefObject<Swipeable> | null) => {
        if (activeSwipeableRef.current && activeSwipeableRef.current !== swipeable) {
            activeSwipeableRef.current.current?.close();
        }
        activeSwipeableRef.current = swipeable;
    };

    const closeActiveSwipeable = () => {
        if (activeSwipeableRef.current) {
            activeSwipeableRef.current.current?.close();
        }
        activeSwipeableRef.current = null;
    };

    return (
        <GestureContext.Provider value={{ activeSwipeable: activeSwipeableRef, setActiveSwipeable, closeActiveSwipeable }}>
            {children}
        </GestureContext.Provider>
    );
};

export const useGestureContext = () => {
    const context = useContext(GestureContext);
    if (!context) {
        throw new Error('useGestureContext must be used within a GestureProvider');
    }
    return context;
};