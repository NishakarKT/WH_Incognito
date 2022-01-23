import { QuickInfo } from "../models.js";

export const getQuickInfo = (req, res) => {
    try {
        QuickInfo.find({}, (err, result) => {
            if (!result) res.status(404).send({ msg: "Quick Info doesn't exist." })
            else res.status(200).send(result);
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const postQuickInfo = (req, res) => {
    const data = req.body;
    try {
        const quickInfo = new QuickInfo(data);
        quickInfo.save()
            .then(result => res.status(201).send({ msg: "Quick Info created.", doc: result }))
            .catch(err => res.status(500).send({ msg: "Quick Info could not be created." }));
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const patchQuickInfo = (req, res) => {
    const data = req.body;
    try {
        QuickInfo.updateOne({ _id: data._id }, data, (err, result) => {
            if (!result) res.status(404).send({ msg: "Quick Info doesn't exist." })
            else res.status(200).send({ msg: "Quick Info updated." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const deleteQuickInfo = (req, res) => {
    const { _id } = req.params;
    try {
        QuickInfo.deleteOne({ _id }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Quick Info doesn't exist." })
            else res.status(200).send({ _id, msg: "Quick Info deleted." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};
