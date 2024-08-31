const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit-payment', (req, res) => {
  const paymentData = req.body;
  const paymentDataString = JSON.stringify(paymentData, null, 2);

  fs.appendFile('paymentData.json', paymentDataString + ',\n', (err) => {
    if (err) {
      return res.status(500).send('Error saving payment data');
    }
    res.send('Payment data saved successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
