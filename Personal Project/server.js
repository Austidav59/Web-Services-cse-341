const express = require('express');
const app = express();
const database = require("./modules/connect")
app.use("/", require('./routes/index'))

app.use("/mom", require('./routes/index'))

app.listen(process.env.PORT || 3000, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});