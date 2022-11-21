import fs from 'fs';
import path from 'path';


export function initStorageDir(storage_path: string): string | null {
    if (!process.env.STORAGE_URL) {
        throw new Error('STORAGE_URL is not defined');
    }

    const path_ext = path.join(process.env.STORAGE_URL, storage_path);
    if (!fs.existsSync(path_ext)) {
        fs.mkdirSync(path_ext, { recursive: true });
        return path_ext;
    }

    return null;
}

export function storageDirExists(storage_path: string): boolean {
    if (!process.env.STORAGE_URL) {
        throw new Error('STORAGE_URL is not defined');
    }

    const path_ext = path.join(process.env.STORAGE_URL, storage_path);
    return fs.existsSync(path_ext);
}
