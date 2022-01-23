import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
    keyFile: "api/googleapis.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

const getSheet = async (spreadsheetId, range) => {
    const client = await auth.getClient();
    const googlesheets = google.sheets({ version: "v4", auth: client });
    const sheet = await googlesheets.spreadsheets.values.get({ auth, spreadsheetId, range });

    return sheet.data.values;
};

export default getSheet;