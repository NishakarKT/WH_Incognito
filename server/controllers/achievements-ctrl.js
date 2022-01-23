import { Achievement } from "../models.js";

export const getAchievements = (req, res) => {
    const { email } = req.params;
    try {
        Achievement.find(email === "all" ? {} : { achiever: email }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Achievements don't exist." })
            else res.status(200).send(result.reverse());
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const patchAchievement = (req, res) => {
    const data = req.body;
    data.event = JSON.parse(data.event);
    try {
        Achievement.updateOne({ _id: data._id }, data, (err, result) => {
            if (!result) res.status(404).send({ msg: "Achievement doesn't exist." })
            else res.status(200).send({ msg: "Achievement updated." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const postAchievement = (req, res) => {
    const data = req.body;
    data.event = JSON.parse(data.event);
    try {
        const achievement = new Achievement(data);
        achievement.save()
            .then(result => res.status(201).send({ msg: "Achievement created.", doc: result }))
            .catch(err => res.status(500).send({ msg: "Achievement could not be created." }));
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const deleteAchievement = (req, res) => {
    const { _id } = req.params;
    try {
        Achievement.deleteOne({ _id }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Achievement doesn't exist." })
            else res.status(200).send({ _id, msg: "Achievement deleted." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};
