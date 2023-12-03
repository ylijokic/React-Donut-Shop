import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import { createDonut, fetchDonuts, updateDonut, deleteDonut } from './donut';

const app = express();
const port = 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) {
    app.use(cors());
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/donut', async (req, res) => {
  try {
    const donuts = await fetchDonuts();
    res.send(donuts.Items);
  } catch (error) {
    res.status(400).send(`Error fetching donuts: ${error}`);
  }
});

app.post('/donut', async (req, res) => {
  try {
    const donut = req.body;
    const response = await createDonut(donut);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error creating donut: ${error}`);
  }
});

app.put('/donut', async (req, res) => {
  try {
    const donut = req.body;
    const response = await updateDonut(donut);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error updating donut: ${error}`);
  }
});

app.delete('/donut/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteDonut(id);
    res.send(response);
  } catch (error) {
    res.status(400).send(`Error deleting donut: ${error}`);
  }
});

if (process.env.DEVELOPMENT) {
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
}

export const handler = serverless(app);