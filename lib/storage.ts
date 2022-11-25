import fs from 'fs';
import path from 'path';
import prisma from './prismadb';

export interface PersistentFile {
    filepath: string;
    originalFilename: string;
}


export class Storage {
    storageURL: string;

    constructor() {
        if (!process.env.STORAGE_URL)
            throw new Error('STORAGE_URL environment variable is not set');
        this.storageURL = process.env.STORAGE_URL;
    }

    async addCity(city: string) {
        const city_ = await this.getCity(city);
        if (city_)
            return null;

        const path_ = path.join(this.storageURL, city);
        if (fs.existsSync(path_))
            return null;

        await prisma.city.create({
            data: {
                name: city,
                storage: path_
            }
        });

        fs.mkdirSync(path_, { recursive: true });
        return path_;    
    }

    async addDataset(city: string, dataset: string, files: PersistentFile[]) {
        const city_ = await this.getCity(city);
        if (!city_)
            return null;

        const path_ = path.join(this.storageURL, city, dataset);
        if (fs.existsSync(path_))
            return null;

        fs.mkdirSync(path_, { recursive: true });

        const sourceDir = path.join(path_, 'source');
        fs.mkdirSync(sourceDir, { recursive: true });
        
        files.forEach((file) => {
            this.addFile(sourceDir, file);
        });

        const dataset_ = await prisma.dataset.create({
            data: {
                name: dataset,
                storageBase: path_,
                storageSource: sourceDir,
                city: {
                    connect: {
                        id: city_.id
                    }
                }
            }
        });
    
        return dataset_;
    }

    storageItemExists(storagePath: string) {
        const path_ = path.join(this.storageURL, storagePath);
        return fs.existsSync(path_);
    }

    async getCity(city: string) {
        const path_ = path.join(this.storageURL, city);
        const city_ = await prisma.city.findUnique({
            where: {
                name: city
            }
        });

        if (!city_)
            return null;

        if (!fs.existsSync(path_))
            fs.mkdirSync(path_, { recursive: true });

        return city_;
    }

    async getCities() {
        return await prisma.city.findMany();
    }

    async getDatasets(city: string) {
        const datasets = await prisma.dataset.findMany({
            where: {
                city: {
                    name: city
                }
            }
        });

        return datasets;
    }


    async getDataset(city: string, dataset: string) {
        const path_ = path.join(this.storageURL, city, dataset);
        const dataset_ = await prisma.dataset.findUnique({
            where: {
                name: dataset
            }
        });

        if (!dataset_)
            return null;

        if (!fs.existsSync(path_))
            fs.mkdirSync(path_, { recursive: true });

        return dataset_;
    }

    private addFile(dir: string, file: PersistentFile) {
        const path_ = path.join(dir, file.originalFilename);
        fs.renameSync(file.filepath, path_);
        return file;
    }
}