// const express = require('express');
// const moment = require('moment-timezone');
// const path = require('path');

// const app = express();
// // app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Route to handle form submission and time conversion
// app.post('/convert', (req, res) => {
//     const { day, hour, minute, ampm } = req.body;
    
//     // Combine hour, minute, and ampm to create time string
//     const time = `${hour}:${minute} ${ampm}`;
    
//     // Parse the day and time input
//     const dayOfWeek = moment().day(day); // This gets the next occurrence of the given day
//     const timePST = moment.tz(`${dayOfWeek.format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD h:mm A', 'America/Los_Angeles');
    
//     // Convert PST to IST
//     const timeIST = timePST.clone().tz('Asia/Kolkata').format('dddd, h:mm A');

//     // Pass data to the result.html file via query parameters
//     res.redirect(`/result.html?timePST=${encodeURIComponent(timePST.format('dddd, h:mm A'))}&timeIST=${encodeURIComponent(timeIST)}`);
// });


// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });


const express = require('express');
const moment = require('moment-timezone');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/convert', (req, res) => {
    const { day, hour, minute, ampm } = req.body;
    
    // Combine hour, minute, and ampm to create time string
    const time = `${hour}:${minute} ${ampm}`;
    
    // Parse the day and time input
    const dayOfWeek = moment().day(day); // This gets the next occurrence of the given day
    const timePST = moment.tz(`${dayOfWeek.format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD h:mm A', 'America/Los_Angeles');
    
    // Convert PST to IST
    const timeIST = timePST.clone().tz('Asia/Kolkata').format('dddd, h:mm A');

    res.render('result', { timePST: timePST.format('dddd, h:mm A'), timeIST });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
