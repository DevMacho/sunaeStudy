import { Post } from '../db/model.js'


const errorMessage = { message : "Cannot find the page."}


export async function getPosts(req, res){
    Post.find((err, posts) => {
        res.status(200).json(posts.reverse())
    })
}

export async function writePost(req, res, next){
    const author = req.id;
    const {title, content, imageUrl} = req.body;
    const newPost = new Post({
        id: Date.now().toString(),
        title,
        content,
        imageUrl,
        createdAt: new Date(),
        author,
        view : 0,
        heart: 0,
        heartedUser : []
    })
    newPost.save()
    .then(()=>{
        Post.find((err, posts) => {
            res.status(201).json(posts.reverse())
        })
    })
}

export async function editPost(req, res, next){
    const id = req.params.id;
    Post.findOne({id}).then((post) => {
        if(post == null){
            return res.status(401).json({message : "해당 포스트를 찾을 수 없습니다."})
        }
        const author = req.id;
        if(author != post.author){
            return res.status(401).json({message : "해당 포스트의 수정 권한이 없습니다."})
        }
        const {title, content, imageUrl} = req.body;
        if(post){
            post.title = title;
            post.content = content;
            post. imageUrl = imageUrl;
            post.save();
            res.status(200).json(post);
        } else {
            res.status(404).json(errorMessage);
        }
    })
}


export async function deletePost(req, res, next){
    const id = req.params.id;
    Post.findOne({id}).then(post => {
        if(post == null){
            return res.status(404).json(errorMessage);
        }
        const author = req.id;
        if(post.author != author){
            return res.status(401).json({message : "해당 포스트의 삭제 권한이 없습니다."});
        }
        Post.deleteOne({id}, (err) => {
            if(err) console.log(err);
            console.log("Successful deletion");
          })
        res.sendStatus(204);
    })
}

export async function giveHeartToPost(req, res, next){
    const id = req.params.id;
    Post.findOne({id}).then((post) => {
        if(post == null){
            return res.status(401).json({message : "해당 포스트를 찾을 수 없습니다."})
        }
        const currentUser = req.id;
        if(post){
            if(post.heartedUser.includes(currentUser)){
                post.heart--;
                post.heartedUser = post.heartedUser.filter((u)=> u != currentUser);
                post.save();
                return res.status(201).json(post);
            }
            post.heart++;
            post.heartedUser = [currentUser, ...post.heartedUser];
            post.save();
            res.status(201).json(post);
        } else {
            res.status(404).json(errorMessage);
        }
    })
}

export async function viewPost(req, res, next){
    const id = req.params.id;
    Post.findOne({id}).then((post) => {
        if(post == null){
            return res.status(401).json({message : "해당 포스트를 찾을 수 없습니다."})
        }
        if(post){
            post.view++;
            post.save();
            res.status(201).json(post);
        } else {;
            res.status(404).json(errorMessage)
        }
    })
}