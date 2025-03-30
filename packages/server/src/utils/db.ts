import { AppDataSource } from "../../ormconfig";

export const initializeDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to postgres database', error);
    }
}
