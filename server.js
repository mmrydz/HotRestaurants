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
app.use(express.static(__dirname + "/assets"));

let tables = [
    {
        routeName: "tableroute",
        name: "name",
        phone: "number",
        email: "email",
        table: 1,
    }
]

let waitlist =
    [
        {
            routeName: "waitroute",
            name: "name",
            phone: "number",
            email: "email",
            table: 51,
            queuePosition: 1,
        }
    ]

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.get("/api/tables/:table", function(req, res) {
  var chosen = req.params.table;

  console.log(chosen);

  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }
});
app.get("/api/waitlist/:waitlist", function(req, res) {
  var chosen = req.params.waitlist;

  console.log(chosen);

  for (var i = 0; i < waitlist.length; i++) {
    if (chosen === waitlist[i].routeName) {
      return res.json(waitlist[i]);
    }
  }
});

app.post("/api/tables", function(req, res) {
  var newtable = req.body;

  newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();

  console.log(newtable);

  tables.push(newtable);

  res.json(newtable);
});

app.post("/api/waitlist", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newwait = req.body;

  // Using a RegEx Pattern to remove spaces from newwait
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newwait.routeName = newwait.name.replace(/\s+/g, "").toLowerCase();

  console.log(newwait);

  waitlist.push(newwait);

  res.json(newwait);
});

app.post("/api/clear", function(req, res) {
  // Empty out the arrays of data
  tablesData.length = 0;
  waitListData.length = 0;

  res.json({ ok: true });
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
