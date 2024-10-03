const express = require('express');
const app = express();
app.use(express.json()); 
app.use("/", require('./routes/index'))

app.listen(process.env.PORT || 8080, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8080));
});