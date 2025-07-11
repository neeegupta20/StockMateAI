const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const {spawn}=require("child_process");

const app=express();
const PORT=3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post('/suggest',(req,res)=>{
    const {risk,duration}=req.body;
    
    if(!risk || !duration){
        return res.status(400).json({Error:"RISK OR DURATION MISSING."})
    }
    const py=spawn("/Users/nee.gupta20/opt/anaconda3/bin/python",["machineLearning/main.py",risk,duration]);
    let data="";
    let errorData="";

    py.stdout.on("data",chunk=>{
        data+=chunk.toString();
    })

    py.stderr.on("data",err=>{
        errorData+=err.toString();
    })

    py.on("close",code=>{
        if(code!==0) {
            console.error("Python Error:",errorData);
            return res.status(500).json({error: "Internal Python Rrror",details: errorData});
        }

        try{
            const parsed=JSON.parse(data);
            return res.json(parsed);
        }catch(err){
            console.error("JSON parse error:",err);
            return res.status(500).json({ error: "Invalid Python Response" });
        }
    });
    
})

app.listen(PORT);
const nifty50List=[
    "ADANIENT", "ADANIPORTS", "APOLLOHOSP", "ASIANPAINT", "AXISBANK",
    "BAJAJ-AUTO", "BAJFINANCE", "BAJAJFINSV", "BPCL", "BHARTIARTL",
    "BRITANNIA", "CIPLA", "COALINDIA", "DIVISLAB", "DRREDDY",
    "EICHERMOT", "GRASIM", "HCLTECH", "HDFCBANK", "HDFCLIFE",
    "HEROMOTOCO", "HINDALCO", "HINDUNILVR", "ICICIBANK", "ITC",
    "INDUSINDBK", "INFY", "JSWSTEEL", "KOTAKBANK", "LT",
    "M&M", "MARUTI", "NTPC", "NESTLEIND", "ONGC",
    "POWERGRID", "RELIANCE", "SBILIFE", "SBIN", "SUNPHARMA",
    "TCS", "TATACONSUM", "TATAMOTORS", "TATASTEEL", "TECHM",
    "TITAN", "UPL", "ULTRACEMCO", "WIPRO"
]