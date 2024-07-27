const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let mockEvents = [
  { event_id: 1, event_name: 'Event 1' },
  { event_id: 2, event_name: 'Event 2' },
  { event_id: 3, event_name: 'Event 3' }
];

app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

app.get('/items', (req, res) => {
  console.log('GET /items request received');
  res.send(mockEvents);
});

app.post('/items', (req, res) => {
  console.log('POST /items request received with data:', req.body);
  const newEvent = { event_id: mockEvents.length + 1, ...req.body };
  mockEvents.push(newEvent);
  res.status(201).send(newEvent);
});

app.put('/items/:id', (req, res) => {
  console.log('PUT /items/:id request received with data:', req.body);
  const eventId = parseInt(req.params.id, 10);
  mockEvents = mockEvents.map(event => 
    event.event_id === eventId ? { ...event, ...req.body } : event
  );
  res.send(mockEvents.find(event => event.event_id === eventId));
});

app.delete('/items/:id', (req, res) => {
  console.log('DELETE /items/:id request received');
  const eventId = parseInt(req.params.id, 10);
  mockEvents = mockEvents.filter(event => event.event_id !== eventId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
