const express = require("express");
const app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,  authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    next();
});

var port =  process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}!`));

let axios = require("axios")

app.post("/fetchData", async function(req,res){
    const { method, fetchURL, data, key, value } = req.body;
    console.log(req.body)
 
    try {
        let response ;
        if(method === "GET")
        {
            response = await axios.get(fetchURL,  {headers : {authorization : value}})
        }
        else if(method === "POST")
        {
            let body = JSON.parse(data)
            response = await axios.post(fetchURL, body, {headers : {authorization : value}} )
        }
        else if(method === "PUT")
        {
            let body = JSON.parse(data)
            response = await axios.put(fetchURL, body, {headers : {authorization : value}} )
            console.log(response.data)
        }
        else if(method === "DELETE")
        {
            response = await axios.delete(fetchURL, {headers : {authorization : value}} )
            console.log(response.data)
        }
        
        
        else {
            return res.status(400).send( "Invalid method" );
        }

        console.log(typeof(response.data))
        res.send(!isNaN(response.data) ? ("" + response.data) : response.data)  

    }
    catch (err)
    {

          console.log(err.response)
        if(err.response)
        {
            let {status, stautsText} = err.response;
            res.status(status).send(stautsText)
        }
        else
        {
            res.sendStatus(404)
        }
    }
} )