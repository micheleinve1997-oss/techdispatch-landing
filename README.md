# TechDispatch Landing

Landing page separata e statica per TechDispatch.

## Uso locale

Apri `index.html` nel browser.

## Collegamento Google Sheet

Il form e gia pronto per compilare un Google Sheet. Serve solo creare il Web App Google e incollare il suo URL dentro `index.html` nel campo `data-endpoint` del form.

1. Apri Google Sheets e crea un file chiamato `TechDispatch - Richieste info`.
2. Crea le colonne della prima riga usando `google-sheet-template.csv`, oppure lascia fare allo script: le crea automaticamente al primo invio.
3. Vai su `Estensioni` -> `Apps Script`.
4. Incolla il contenuto di `google-apps-script.gs`.
5. Premi `Deploy` -> `New deployment` -> tipo `Web app`.
6. Imposta `Execute as: Me` e `Who has access: Anyone`.
7. Copia il Web App URL.
8. In `index.html`, sostituisci `data-endpoint=""` con `data-endpoint="URL_COPIATO_DA_GOOGLE"`.
9. Pubblica di nuovo su Vercel.

Colonne usate dal form:

- Data invio
- Nome e cognome
- Email aziendale
- Azienda
- Messaggio
- Pagina
- Origine
- User agent

## Deploy

Puoi pubblicare questa cartella come progetto separato su Vercel:

- Framework preset: `Other`
- Build command: vuoto
- Output directory: `.`
