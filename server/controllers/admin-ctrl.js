import { Admin } from "../models.js";
import getSheet from "../utils/sheet-ut.js";
import bcrypt from "bcryptjs";

export const getAdmin = (req, res) => {
    const { email } = req.params;

    try {
        Admin.findOne({ email }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Admin doesn't exist." })
            else res.status(200).send(result);
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const postAdmin = async (req, res) => {
    const { username, password } = req.body;

    const sheet = await getSheet(process.env.SHEET_ID, "Admins");
    const admin = sheet.find(row => row[1] === username);

    if (admin) {
        const [roll, , name, email, role, society] = admin;
        const hashedPass = await bcrypt.hash(password, 10);
        try {
            const admin = new Admin({ name, roll, username, hashedPass, email, role, society });
            admin.save()
                .then(result => res.status(201).send(result))
                .catch(err => res.status(403).send({ msg: "Database error." }))
        } catch (err) { res.status(500).send({ msg: "Database error." }) };
    }
    else res.status(401).send({ msg: "You provided an unregistered institute's email address." })
};