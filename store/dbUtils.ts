import * as SQLite from 'expo-sqlite';
import { Inspiration } from '../types';
import { showAlert } from '../helpers';
import { ALERT_TYPE } from 'react-native-alert-notification';

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
        showAlert(ALERT_TYPE.DANGER, 'Error', 'Error initializing database');
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
        showAlert(ALERT_TYPE.DANGER, 'Error', 'Error adding inspiration');
    }
    return undefined;
};

export const getInspirations = async (): Promise<Inspiration[]> => {
    try {
        return await db.getAllAsync<Inspiration>('SELECT * FROM inspirations');
    } catch (error) {
        showAlert(ALERT_TYPE.DANGER, 'Error', 'Error fetching inspirations');
        return [];
    }
};

export const updateInspiration = async (id: number, inspiration: Partial<Inspiration>): Promise<void> => {
    const { quote, image_url } = inspiration;

    if (!quote || !image_url) {
        showAlert(ALERT_TYPE.WARNING, 'Warning', 'Quote and image URL are required to update an inspiration');
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
            showAlert(ALERT_TYPE.WARNING, 'Warning', `No inspiration found with ID: ${id}`);
        }
    } catch (error) {
        showAlert(ALERT_TYPE.DANGER, 'Error', `Error updating inspiration with ID: ${id}`);
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
            showAlert(ALERT_TYPE.WARNING, 'Warning', `No inspiration found with ID: ${id}`);
        }
    } catch (error) {
        showAlert(ALERT_TYPE.DANGER, 'Error', `Error deleting inspiration with ID: ${id}`);
    }
};
