const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('users', 'USER', 'PASS', {
  host: 'localhost',
  dialect: 'mysql'
});

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
});

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  });

app.post('/items', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});