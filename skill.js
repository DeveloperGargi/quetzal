var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.json());

function getDbConnection() {
    var config = {
        host: "localhost",
        user: "root",
        password: "manager",
        database: "quetzal"
    };    
    var con = mysql.createConnection(config);
    return con;  
}

//skill table service

app.get("/skills", (req, resp) => {
    var con = getDbConnection();
    con.connect((err) => {
        if(err) {
            resp.sendStatus(500);
            return;
        }
        var sql = "SELECT Skill_Id, Skill_Name,Status FROM skill";
        var params = [];
        con.query(sql, params, (err, result) => {
            con.end();
            if(err) {
                resp.sendStatus(500);
                return;
            }
            resp.send(result);   
        });
    });
});





//skilllist table service

app.get("/skillslist", (req, resp) => {
    var con = getDbConnection();
    con.connect((err) => {
        if(err) {
            resp.sendStatus(500);
            return;
        }
        var sql = "Skill_Name FROM skill";
        var params = [];
        con.query(sql, params, (err, result) => {
            con.end();
            if(err) {
                resp.sendStatus(500);
                return;
            }
            resp.send(result);   
        });
    });
});



//Skill table registration service 

app.post("/addskill", (req, resp) => {
    var con = getDbConnection();
    con.connect((err) => {
        if(err) {
            resp.sendStatus(500);
            return;
        }
        var params = [ req.body.Skill_Name ];
    var sql = "INSERT INTO Skill (Skill_Name) VALUES(?)";
        con.query(sql, params, (err, result) => {
            con.end();
            if(err) {
                resp.sendStatus(500);
                return;
            }
            var res = { "rowsInserted" : result.affectedRows };
            resp.send(result);   
        });
    });    
});



//Skill table search service 

app.post("/searchskill", (req, resp) => {
    var con = getDbConnection();
    con.connect((err) => {
        if(err) {
            resp.sendStatus(500);
            return;
        }
        var params = [ req.body.Skill_Name];
    var sql = "SELECT * FROM Skill WHERE Skill_Name LIKE ?";
        con.query(sql, params, (err, result) => {
            con.end();
            if(err) {
                resp.sendStatus(500);
                return;
            }
           
            resp.send(result);   
        });
    });    
});


//Skill table update service 

app.post("/editskill", (req, resp) => {
    var con = getDbConnection();
    con.connect((err) => {
        if(err) {
            resp.sendStatus(500);
            return;
        }
        var params = [req.body.Status ,req.body.Skill_Name];
    var sql = "UPDATE Skill SET Status=?WHERE Skill_Name=?";
        con.query(sql, params, (err, result) => {
            con.end();
            if(err) {
                resp.sendStatus(500);
                return;
            }
            var res = { "rowsUpdated" : result.affectedRows };
            resp.send(result);   
        });
    });    
});
