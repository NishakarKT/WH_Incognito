import { SocEvent } from "../models.js";

export const getSocEvents = (req, res) => {
    try {
        SocEvent.find({}, (err, result) => {
            if (!result) res.status(404).send({ msg: "Soc Events don't exist." })
            else res.status(200).send(result.reverse());
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const postSocEvent = (req, res) => {
    const data = req.body;
    try {
        const socEvent = new SocEvent(data);
        socEvent.save()
            .then(result => res.status(201).send({ msg: "Soc Event created.", doc: result }))
            .catch(err => res.status(500).send({ msg: "Soc Event could not be created." }));
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const patchSocEvent = (req, res) => {
    const data = req.body;
    try {
        SocEvent.updateOne({ _id: data._id }, data, (err, result) => {
            if (!result) res.status(404).send({ msg: "Soc Event doesn't exist." })
            else res.status(200).send({ msg: "Soc Event updated." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const deleteSocEvent = (req, res) => {
    const { _id } = req.params;
    try {
        SocEvent.deleteOne({ _id }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Soc Event doesn't exist." })
            else res.status(200).send({ _id, msg: "Soc Event deleted." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};
