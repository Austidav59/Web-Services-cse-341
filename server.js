const express = require('express');
const { swaggerUi, specs } = require('./swagger');

const app = express();
app.use(express.json()); 

app.use("/", require('./routes/index'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT || 8080, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8080));
});