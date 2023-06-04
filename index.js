const express = require('express')
app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static('./public'))
app.set('view engine' , 'ejs')


const Recipie = mongoose.model('recipie',{
    name: String,
    description: String,
    ingredients : String
})


app.get('/',(req,res)=>{
    // res.send("Hello everything happens for a reason!")
     Recipie.find().then((recipies)=>{
        res.render('index',{recipies})
     }).catch((err)=>{res.send("error occured try again")})


})

app.get('/new',(req,res)=>{
    res.render('new')
})
app.post('/new', (req,res)=>{
    const obj = new Recipie({
        name:req.body.name,
        description : req.body.description,
        ingredients : req.body.ingredients

    })
    obj.save().then(()=>{res.redirect('/')}).catch((err)=>console.log(err))
})

app.get('/:id/edit', (req,res)=>{
    const id = req.params.id;
   Recipie.findById(id).then((recipie)=>{
    res.render('edit', {recipie})
   }).catch((err)=>{res.send("error occured try again")})
})

app.post('/:id/edit',(req,res)=>{
    const newobj = new Recipie({
        name:req.body.name,
        description:req.body.description,
        ingredients:req.body.ingredients
    })
    newobj.save().then(()=>{
        res.redirect('/')
    })
})
app.post('/:id/delete',(req,res)=>{
    const id = req.params.id;
    Recipie.findByIdAndDelete(id).then(()=>{
        res.redirect('/')
    }).catch((err)=>{res.send('oops something went wronh !')})
})
app.listen(3000,()=>{
    mongoose.connect('mongodb+srv://sai:sai123@sampledb.dllnroa.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("DB connected")
    }).catch((err)=>{
        console.log(err)
    })
    console.log("server running on port 3000")
})