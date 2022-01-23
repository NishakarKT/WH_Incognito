import { Notification } from "../models.js";

export const getNotifications = (req, res) => {
    const { name, email } = req.params;
    try {
        Notification.find({ $or: [{ from: { name, email } }, { to: { name, email } }] }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Notifications don't exist." })
            else res.status(200).send(result.reverse());
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const postNotification = (req, res) => {
    const data = req.body;
    try {
        const notification = new Notification(data);
        notification.save()
            .then(result => res.status(201).send({ msg: "Notification created.", doc: result }))
            .catch(err => res.status(500).send({ msg: "Notification could not be created." }));
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};


export const deleteNotification = (req, res) => {
    const { _id } = req.params;
    try {
        Notification.deleteOne({ _id }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Notification doesn't exist." })
            else res.status(200).send({ _id, msg: "Notification deleted." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};
