import { Post } from "../models.js";

export const getPosts = (req, res) => {
    const { email } = req.params;
    try {
        Post.find(email === "all" ? {} : { host: email }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Posts don't exist." })
            else res.status(200).send(result.reverse());
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const postPost = (req, res) => {
    const data = req.body;
    try {
        const post = new Post(data);
        post.save()
            .then(result => res.status(201).send({ msg: "Post created.", doc: result }))
            .catch(err => res.status(500).send({ msg: "Post could not be created." }));
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};