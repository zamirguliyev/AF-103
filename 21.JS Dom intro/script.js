let container = document.createElement("div");
container.className = "container";

let text = document.createElement("h2");
text.textContent = "960 x 360px";



let items = document.createElement("div");
items.className = "items";

for (let i = 0; i < 3; i++) {
    let item = document.createElement("div");
    item.className = "item";

    let text2 = document.createElement("h3")
    text2.className="text2"
    text2.textContent="290 x 180px"

    let title = document.createElement("h4");
    title.className="title"
    title.textContent = "Indoneetetus facillis";


    let paragraph = document.createElement("p");
    paragraph.className = "paragraph"
    paragraph.textContent = "Lorem ipsum dolor sit amet consectetur";


    let readMore = document.createElement("p")
    readMore.className ="readMore"
    readMore.textContent = "Read More"

    item.appendChild(text2)
    item.appendChild(title);
    item.appendChild(paragraph);
    paragraph.appendChild(readMore)
    items.appendChild(item);
}

container.appendChild(text);
container.appendChild(items);
document.body.appendChild(container);
