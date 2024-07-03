// const express = require('express');

// const app = express();
// const port = 3005;

// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
const express = require('express');
const app = express();
app.use(express.json());
app.use(middleware);
app.use(logger);

let courses = [{ id:1, name: "java" },{ id:2, name: "javaScript" },{ id:3, name: "python" }];

app.get('/courses',(req,res)=>{
    res.json(courses);
});

app.put('/courses/:id',(req,res)=>{
    try{
        let singleCourse = courses.find((course)=>{
            return course.id === +req.params.id
        })

        if(!singleCourse){
            req.status(404).send("course not found");
        }

        singleCourse.name = req.body.name;
        res.send(courses);

    } catch(err){
        res.status(500).send(err);
    }
})

app.put("/courses",(req,res)=>{
    console.log(req.body);
    for(let i=0;i<courses.length;i++){
        if(courses[i].id = 1){
            courses[i].name = req.body.name;
            break;
        }
    }
    res.send(courses);
})
app.post("/courses",(req,res)=>{
    console.log(req.body);
    let singleCourse = {
        id: courses.length +1,
        name: req.body.name
    }
    courses.push(singleCourse);
    res.send(courses);
})
app.delete("/courses",(req,res)=>{
    console.log(req.body);
    for(let i=0;i<courses.length;i++){
        if(courses[i].id==2){
            delete courses[i];
        }
    }
    res.send(courses);
})


function middleware(req,res,next){
    console.log("called");
    next();
}

//logger
// method,ip,hostname, date

function logger(req,res,next){
    console.log(req.method,req.ip,req.hostname,new Date());
    next();
}

app.listen(3000, () => {
    console.log("server started at 3000");
})







