const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
// compress all responses that go through the middleware
app.use(compression());
//app.use() loads a function to be used as middleware. In this context,
// it loads the result of express.static(path.join(__dirname, 'public')).
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
