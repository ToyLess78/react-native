import * as SQLite from 'expo-sqlite';
import { Inspiration } from '../types';
import { Alert } from 'react-native';

const db = SQLite.openDatabaseSync('inspirations.db');

export const initDb = async () => {
    try {
        await db.execAsync('PRAGMA journal_mode = WAL;');

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS inspirations
            (
                id         INTEGER PRIMARY KEY,
                quote      TEXT NOT NULL,
                image_url  TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            );
        `);
    } catch (error) {
        Alert.alert('Error initializing database:');
    }
};

export const addInspiration = async (inspiration: Omit<Inspiration, 'id'>): Promise<number | undefined> => {
    const { quote, image_url } = inspiration;
    try {
        const result = await db.runAsync(
            `INSERT INTO inspirations (quote, image_url) VALUES (?, ?)`,
            [quote, image_url]
        );
        if (result.lastInsertRowId) {
            return result.lastInsertRowId;
        }
    } catch (error) {
        Alert.alert('Error adding inspiration:');
    }
    return undefined;
};


export const getInspirations = async (): Promise<Inspiration[]> => {
    try {
        return await db.getAllAsync<Inspiration>('SELECT * FROM inspirations');
    } catch (error) {
        Alert.alert('Error fetching inspirations:');
        return [];
    }
};

export const updateInspiration = async (id: number, inspiration: Partial<Inspiration>): Promise<void> => {
    const { quote, image_url } = inspiration;

    if (!quote || !image_url) {
        Alert.alert('Quote and image URL are required to update an inspiration');
        return;
    }

    try {
        const result = await db.runAsync(
            `UPDATE inspirations
             SET quote = ?,
                 image_url = ?,
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [quote, image_url, id]
        );

        if (!result.changes) {
            Alert.alert(`No inspiration found with ID: ${id}`);
        }
    } catch (error) {
        Alert.alert(`Error updating inspiration with ID: ${id}`);
    }
};

export const deleteInspiration = async (id: number): Promise<void> => {
    try {
        const result = await db.runAsync(
            `DELETE
             FROM inspirations
             WHERE id = ?`,
            [id]
        );

        if (!result.changes) {
            Alert.alert(`No inspiration found with ID: ${id}`);
        }
    } catch (error) {
        Alert.alert(`Error deleting inspiration with ID: ${id}`);
    }
};


