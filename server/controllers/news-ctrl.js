import { News } from "../models.js";

export const getNews = (req, res) => {
    try {
        News.find({}, (err, result) => {
            if (!result) res.status(404).send({ msg: "News doesn't exist." })
            else res.status(200).send(result.reverse());
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const postNews = (req, res) => {
    const data = req.body;
    try {
        const news = new News(data);
        news.save()
            .then(result => res.status(201).send({ msg: "News created.", doc: result }))
            .catch(err => res.status(500).send({ msg: "News could not be created." }));
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const patchNews = (req, res) => {
    const data = req.body;
    try {
        News.updateOne({ _id: data._id }, data, (err, result) => {
            if (!result) res.status(404).send({ msg: "News doesn't exist." })
            else res.status(200).send({ msg: "News updated." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const deleteNews = (req, res) => {
    const { _id } = req.params;
    try {
        News.deleteOne({ _id }, (err, result) => {
            if (!result) res.status(404).send({ msg: "News doesn't exist." })
            else res.status(200).send({ _id, msg: "News deleted." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};
