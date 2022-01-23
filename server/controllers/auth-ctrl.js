import jwt from "jsonwebtoken";
import sendMail from "../mail/mail.js";
import { generateOtp, verifyOtp } from "../utils/otp-ut.js";
import { User, Admin } from "../models.js";
import getSheet from "../utils/sheet-ut.js";
import bcrypt from "bcryptjs";

export const generateOTP = (req, res) => {
    const { email } = req.body;
    const otp = generateOtp(email);
    sendMail(email, "Email verification", "otp", { otp })
        .then(() => res.status(200).send({ msg: "OTP was sent successfully." }))
        .catch(() => res.status(401).send({ msg: "The provided email address is not a registered one." }));
};

export const verifyOTP = (req, res) => {
    const { otp, email } = req.body;
    const result = verifyOtp(email, otp);

    if (result) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
        res.status(200).send({ msg: "OTP verification successful!", token });
    }
    else res.status(404).send({ msg: "Invalid OTP. Please try again." });
}

export const tokenAuth = async (req, res) => {
    const { token } = req.params;
    try {
        const { email } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        User.findOne({ email }, (err, result) => {
            if (!result) res.status(404).send({ msg: "User doesn't exist." })
            else res.status(200).send(result);
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const adminTokenAuth = (req, res) => {
    const { adminToken } = req.params;
    try {
        const { email } = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);
        Admin.findOne({ email }, (err, result) => {
            if (!result) res.status(404).send({ msg: "Admin doesn't exist." })
            else res.status(200).send(result);
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const adminAuth = (req, res) => {
    const { username, password } = req.body;

    try {
        Admin.findOne({ username }, async (err, result) => {
            if (!result) {
                const sheet = await getSheet(process.env.SHEET_ID, "Admins");
                const user = sheet.find(row => row[1] === username);
                if (user) res.status(200).send({ email: user[3] });
                else res.status(404).send({ msg: "The username doesn't match with any of the registered admins!" });
            }
            else {
                const match = await bcrypt.compare(password, result.hashedPass);
                const token = await jwt.sign({ email: result.email }, process.env.JWT_SECRET_KEY);
                if (match) res.status(200).send({ admin: result, token });
                else res.status(403).send({ msg: "Incorrect password! Please try again." });
            };
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};