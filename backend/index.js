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
    const {risk,duration,choice,stock_symbol}=req.body;
    
    if(risk==null || duration==null || choice==null){
        return res.status(400).json({Error:"RISK OR DURATION MISSING."})
    }

    const py=spawn("/Users/nee.gupta20/opt/anaconda3/bin/python",["machineLearning/main.py",risk,duration,choice,stock_symbol]);
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
            return res.status(500).json({error: "Python Error",details:errorData});
        }

        try{
            const parsed=JSON.parse(data);
            return res.json(parsed);
        }catch(err){
            console.error("JSON parse error:",err);
            return res.status(500).json({error: "Incorrect Python Response"});
        }
    });
})

app.listen(PORT);
