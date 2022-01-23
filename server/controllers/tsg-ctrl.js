import { TsgEvent } from "../models.js";

export const getTsgEvents = (req, res) => {
    try {
        TsgEvent.find({}, (err, result) => {
            if (!result) res.status(404).send({ msg: "TSG Events don't exist." })
            else res.status(200).send(result.reverse());
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const postTsgEvent = (req, res) => {
    const data = req.body;
    try {
        const tsgEvent = new TsgEvent(data);
        tsgEvent.save()
            .then(result => res.status(201).send({ msg: "TSG Event created.", doc: result }))
            .catch(err => res.status(500).send({ msg: "TSG Event could not be created." }));
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const patchTsgEvent = (req, res) => {
    const data = req.body;
    try {
        TsgEvent.updateOne({ _id: data._id }, data, (err, result) => {
            if (!result) res.status(404).send({ msg: "TSG Event doesn't exist." })
            else res.status(200).send({ msg: "TSG Event updated." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const deleteTsgEvent = (req, res) => {
    const { _id } = req.params;
    try {
        TsgEvent.deleteOne({ _id }, (err, result) => {
            if (!result) res.status(404).send({ msg: "TSG Event doesn't exist." })
            else res.status(200).send({ _id, msg: "TSG Event deleted." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

