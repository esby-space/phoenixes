"use strict";
const main = async () => {
    const response = await fetch("https://docs.google.com/document/d/e/2PACX-1vQkpPFE8B_mjflnCEKYI24mOXlAS8M-K_l8FKAP7VVrhfsRcayF5KGf35qpgbBL9LO1pg-MDqRLOp3w/pub");
    const text = await response.text();
    const element = document.createElement("div");
    element.innerHTML = text;
    const table = element.querySelector("table");
    if (!table)
        return;
    document.querySelector("#dates").append(table);
};
main();
