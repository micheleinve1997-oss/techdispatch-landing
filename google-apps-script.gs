const SHEET_NAME = "Richieste info";
const HEADERS = [
  "Data invio",
  "Nome e cognome",
  "Email aziendale",
  "Azienda",
  "Messaggio",
  "Pagina",
  "Origine",
  "User agent",
];

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const body = parseBody_(e);

  sheet.appendRow([
    body.data_invio ? new Date(body.data_invio) : new Date(),
    body.nome || "",
    body.email || "",
    body.azienda || "",
    body.messaggio || "",
    body.pagina || "",
    body.origine || "techdispatch-landing",
    body.user_agent || "",
  ]);

  return json_({ ok: true });
}

function doGet() {
  return json_({ ok: true, service: "TechDispatch landing form" });
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return {};
  }
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  const hasHeader = sheet.getLastRow() > 0;
  if (!hasHeader) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
