import { connect } from 'mongoose';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL undefined in .env');
}

connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
