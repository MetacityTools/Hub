import PersistentFile from 'formidable/PersistentFile';
import fs from 'fs';
import path from 'path';


export function initStorageCity(city: string): string | null {
    if (!process.env.STORAGE_URL) {
        throw new Error('STORAGE_URL is not defined');
    }

    const path_ext = path.join(process.env.STORAGE_URL, city);
    if (!fs.existsSync(path_ext)) {
        fs.mkdirSync(path_ext, { recursive: true });
        return path_ext;
    }

    return null;
}

export function initStorageDataset(city: string, dataset: string): string | null {
    if (!process.env.STORAGE_URL) {
        throw new Error('STORAGE_URL is not defined');
    }

    const path_ext = path.join(process.env.STORAGE_URL, city, dataset, "source");
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

export function filesToDirectory(files: File[], dir: string): void {
    files.forEach(file => {
        fs.renameSync((file as any).filepath, path.join(dir, (file as any).originalFilename));
    });
}