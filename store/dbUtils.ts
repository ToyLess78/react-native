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
        return await db.getAllAsync<Inspiration>('SELECT * FROM inspirations');
    } catch (error) {
        console.error('Error fetching inspirations:', error);
        return [];
    }
};

export const updateInspiration = async (id: number, inspiration: Partial<Inspiration>): Promise<void> => {
    const { quote, image_url } = inspiration;

    if (!quote || !image_url) {
        console.error('Quote and image URL are required to update an inspiration');
        return;
    }

    try {
        const result = await db.runAsync(
            `UPDATE inspirations
             SET quote = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [quote, image_url, id]
        );

        if (result.changes > 0) {
            console.log(`Inspiration with ID: ${id} updated successfully`);
        } else {
            console.log(`No inspiration found with ID: ${id}`);
        }
    } catch (error) {
        console.error(`Error updating inspiration with ID: ${id}`, error);
    }
};


export const deleteInspiration = async (id: number): Promise<void> => {
    try {
        const result = await db.runAsync(
            `DELETE FROM inspirations WHERE id = ?`,
            [id]
        );

        if (result.changes > 0) {
            console.log(`Inspiration with ID: ${id} deleted successfully`);
        } else {
            console.log(`No inspiration found with ID: ${id}`);
        }
    } catch (error) {
        console.error(`Error deleting inspiration with ID: ${id}`, error);
    }
};


