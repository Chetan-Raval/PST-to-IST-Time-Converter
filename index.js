


const express = require('express');
const moment = require('moment-timezone');

const app = express();
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const { day, hour, minute, ampm } = req.body;

    const time = `${hour}:${minute} ${ampm}`;
    const dayOfWeek = moment().day(day);
    const timePST = moment.tz(`${dayOfWeek.format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD h:mm A', 'America/Los_Angeles');

    const timeIST = timePST.clone().tz('Asia/Kolkata').format('dddd, h:mm A');

    res.render('index', { timePST: timePST.format('dddd, h:mm A'), timeIST });
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
