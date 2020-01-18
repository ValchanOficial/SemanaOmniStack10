const app = require('./src/config/custom-express');
const config = require('./src/config/config');

app.listen(config.PORT, () => {
    console.log("Start: ADDRESS: " + config.getAddress()+" - PORT: "+config.PORT);
});