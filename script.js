const infoForm = document.querySelector("#info-form");
const statusBox = document.querySelector("#form-status");

function setStatus(message, type) {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.dataset.status = type || "";
}

infoForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const endpoint = infoForm.dataset.endpoint?.trim();
  if (!endpoint) {
    setStatus("Modulo pronto: manca solo il collegamento al Google Sheet.", "error");
    return;
  }

  const submitButton = infoForm.querySelector("button[type='submit']");
  const formData = new FormData(infoForm);
  const payload = Object.fromEntries(formData.entries());

  payload.data_invio = new Date().toISOString();
  payload.pagina = window.location.href;
  payload.user_agent = window.navigator.userAgent;

  submitButton.disabled = true;
  setStatus("Invio in corso...", "loading");

  try {
    await fetch(endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    infoForm.reset();
    setStatus("Richiesta inviata. I dati sono stati registrati nel Google Sheet.", "success");
  } catch (error) {
    setStatus("Invio non riuscito. Controlla il collegamento al Google Sheet.", "error");
  } finally {
    submitButton.disabled = false;
  }
});
