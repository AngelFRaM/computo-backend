import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server en puerto: ${PORT}`);
});
