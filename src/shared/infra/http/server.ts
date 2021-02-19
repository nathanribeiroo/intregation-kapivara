import 'reflect-metadata';

import '@config/env';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from '@shared/infra/http/routes';

import '../mongoose';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: err.message,
    });
});

app.listen(process.env.PORT || 3333, () => {
    console.log('\n========================================');
    console.log(' ✅ KAPIVARA INTREGATION SERVER: ONLINE');
    console.log('========================================\n');
});
