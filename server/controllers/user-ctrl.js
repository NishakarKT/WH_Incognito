import { User } from "../models.js";
import getSheet from "../utils/sheet-ut.js";

export const getUser = (req, res) => {
    const { email } = req.params;

    try {
        User.findOne({ email }, (err, result) => {
            if (!result) res.status(404).send({ msg: "User doesn't exist." })
            else res.status(200).send(result);
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const getUsers = (req, res) => {
    try {
        User.find({}, (err, result) => {
            if (!result) res.status(404).send({ msg: "User doesn't exist." })
            else res.status(200).send(result);
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const postUser = async (req, res) => {
    const { email } = req.body;

    const sheet = await getSheet(process.env.SHEET_ID, "Students");
    const user = sheet.find(row => row[0] === email);
    const userDataTemp = {
        name: "",
        roll: "",
        email: "",
        gender: "male",
        profilePic: "",
        bio: "",
        quote: "",
        course: "",
        department: "",
        hall: "",
        contact: {
            number: "",
            facebook: "",
            linkedin: "",
            instagram: "",
            twitter: "",
            youtube: "",
            github: "",
            reddit: "",
            pinterest: "",
        }
    };

    if (user) {
        const [, name, roll] = user;
        try {
            const user = new User({ ...userDataTemp, name, roll, email });
            user.save()
                .then(result => res.status(201).send(result))
                .catch(err => res.status(403).send({ msg: "Database error." }))
        } catch (err) { res.status(500).send({ msg: "Database error." }) };
    }
    else res.status(401).send({ msg: "You provided an unregistered institute's email address." })
};

export const patchUser = (req, res) => {
    const data = req.body;
    try {
        User.updateOne({ _id: data._id }, { $set: data }, (err, result) => {
            if (!result) res.status(404).send({ msg: "User doesn't exist." })
            else res.status(200).send({ msg: "User updated." });
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};