const { response } = require('express')
const express = require('express')
const post = require('../models/post')
const router = express.Router()
const Post = require('../models/post')

router.get('/', async (req,res,next)=>{    
    try{
        const posts = await Post.find({}).lean()
        res.json(posts)
    }catch(err){
        res.send({message:err})
    }
})
router.get('/:id', async (req, res, next)=>{    
    try{
        const especificPost = await Post.findById(req.params.id)
        res.json(especificPost)
    }catch(err){
        res.json({message:err})
    }
})
router.delete('/:id', async(req,res,next)=>{
    try{
        const removePost = await Post.findByIdAndDelete(req.params.id)
        removePost
        .then(
            res.json(removePost)
        )
        .catch((err)=>{res.json({message:err})})
    }catch(err){
        res.json({message:err})
    }
    next()
})
router.patch('/:id', async (req,res,next)=>{
    try{
        const updatePost = await Post.updateOne(
            {_id: req.params.id},
            {$set: {description:req.body.description}}
        )
        res.json(updatePost)
    }catch(err){
        res.json({message:err})
    }
    next()
})
router.post('/', async (req,res,next)=>{
    const {listing_url,name, summary, space, neighborhood_overview, notes, description} = req.body
    const post = new Post({listing_url,name, summary, space, neighborhood_overview, notes, description})
    
    await post.save()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log(err)
        res.send.json({message: err})
    })
})

module.exports = router