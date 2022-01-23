import { Messages } from "../models.js";

export const getMessages = (req, res) => {
    const { user } = req.params;
    try {
        Messages.find({ $or: [{ user1: user }, { user2: user }] }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Messages don't exist." })
            else res.status(200).send(result[0]);
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const postMessages = (req, res) => {
    const { newMessage } = req.body;
    try {
        const messages = new Messages({ user1: newMessage.from, user2: newMessage.to, messages: [newMessage] });
        messages.save()
            .then(result => res.status(201).send({ msg: "Messages created.", doc: result.messages }))
            .catch(err => res.status(500).send({ msg: "Messages could not be created." }));
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const patchMessages = (req, res) => {
    const { user1, user2, newMessage } = req.body;
    try {
        Messages.updateOne({ $or: [{ user1, user2 }, { user1: user2, user2: user1 }] }, { $push: { messages: newMessage } }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Messages don't exist." })
            else res.status(200).send({ msg: "Messages updated." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

