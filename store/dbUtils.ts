import * as SQLite from 'expo-sqlite';
import { Inspiration } from '../types';

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

        console.log('Table created successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

export const addInspiration = async (inspiration: Inspiration): Promise<void> => {
    const {quote, image_url} = inspiration;

    try {
        const result = await db.runAsync(
            `INSERT INTO inspirations (quote, image_url)
             VALUES (?, ?)`,
            [quote, image_url]
        );

        if (result.lastInsertRowId) {
            console.log(`Inspiration added with ID: ${result.lastInsertRowId}`);
        }
    } catch (error) {
        console.error('Error adding inspiration:', error);
    }
};

export const getInspirations = async (): Promise<Inspiration[]> => {
    try {
        const results = await db.getAllAsync<Inspiration>('SELECT * FROM inspirations');
        return results;
    } catch (error) {
        console.error('Error fetching inspirations:', error);
        return [];
    }
};
