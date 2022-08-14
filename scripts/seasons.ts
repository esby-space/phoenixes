const addImages = (container: HTMLElement, pathFn: (i: number) => string, number: number) => {
    const columns = Array.from(container.querySelectorAll(".col"));
    let current = 0;
    for (let i = 1; i <= number; i++) {
        columns[current].innerHTML += pathFn(i);
        current = (current + 1) % columns.length;
    }
};

const initGallery = () => {
    let section2022 = document.querySelector("#section2022") as HTMLElement;
    addImages(section2022, (i) => `<img src="./images/2022/image${i}.png" class="rounded img-fluid">`, 20);  
};

initGallery();

