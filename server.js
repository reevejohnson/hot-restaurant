// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservations (DATA)
// =============================================================
var reservations = [
    {
      'customerName': 'Reeve',
      'customerEmail': 'me@me.com',
      'phoneNumber': '2',
      'customerID': 'reeve'
    }
];

var waitlist = [
    {
      'customerName': 'Brittany',
      'customerEmail': 'me@me.com',
      'phoneNumber': '1',
      'customerID': 'brittany'
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

function postReservation() {
    app.post('/api/tables', function(req, res) {
        var newreservation = req.body;
        if(reservations.length >=5) {
            waitlist.push(newreservation);
            res.json(newreservation);
            return false;
        } else {
            reservations.push(newreservation);
            res.json(newreservation);
            return true;
        }
    })
}

postReservation();

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});