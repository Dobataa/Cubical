const express = require('express');

const config = require('./config/config');
const app = express();
const expressConfig = require('./config/express');
const routes = require('./routes');

expressConfig(app);
app.use(routes);


app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}..`));