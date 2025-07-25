const express = require('express');
const moment = require('moment-timezone');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Get all time zones from moment-timezone
const timeZones = moment.tz.names();

app.get('/', (req, res) => {
    res.render('index', { timeZones, result: null });
});

app.post('/', (req, res) => {
    const { date, hour, minute, ampm, sourceTimeZone, targetTimeZones } = req.body;
    
    // Construct the source time
    const time = `${hour}:${minute} ${ampm}`;
    const sourceDateTime = moment.tz(`${date} ${time}`, 'YYYY-MM-DD h:mm A', sourceTimeZone);
    
    // Convert to selected target time zones
    const conversions = Array.isArray(targetTimeZones) ? targetTimeZones.map(tz => ({
        timeZone: tz,
        time: sourceDateTime.clone().tz(tz).format('dddd, MMMM Do YYYY, h:mm A')
    })) : [{
        timeZone: targetTimeZones,
        time: sourceDateTime.clone().tz(targetTimeZones).format('dddd, MMMM Do YYYY, h:mm A')
    }];

    const result = {
        source: {
            timeZone: sourceTimeZone,
            time: sourceDateTime.format('dddd, MMMM Do YYYY, h:mm A')
        },
        conversions
    };

    res.render('index', { timeZones, result });
});

app.get('*', (req, res) => {
    res.status(404).json({ message: 'NOT FOUND' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});