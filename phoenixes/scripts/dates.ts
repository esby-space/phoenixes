const main = async () => {
    const response = await fetch("https://docs.google.com/document/d/e/2PACX-1vQkpPFE8B_mjflnCEKYI24mOXlAS8M-K_l8FKAP7VVrhfsRcayF5KGf35qpgbBL9LO1pg-MDqRLOp3w/pub"); 
    const container = document.querySelector("#dates") as HTMLElement;

    const parser = new DOMParser();
    const doc = parser.parseFromString(await response.text(), "text/html");
    const table = doc.querySelector("table");
    if (!table) return; 
    
    container.append(table);
};

main();

