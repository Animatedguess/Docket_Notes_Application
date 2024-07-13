const addButton = document.getElementById("addTask");
const container = document.getElementById("container");
let count = 1;
let isFirstClick = true;

let headTextData = {};
let noteTextData = {};


function saveItem() {
    const dataSet = {
        containerData: container.innerHTML,
        headText: { ...headTextData },
        noteText: { ...noteTextData },
        count: count
    };
    localStorage.setItem("data", JSON.stringify(dataSet));
    console.log("Data saved:", dataSet);
}

function showItem() {
    const Data = localStorage.getItem('data');
    const dataSet = JSON.parse(Data);
    if (dataSet.containerData.toString().trim()) {
        container.innerHTML = dataSet.containerData;
        headTextData = { ...dataSet.headText }; // Unnecessary JSON.parse
        noteTextData = { ...dataSet.noteText };
        count = dataSet.count;
    }
    reattach()
    attachClass1EventListeners()
}

function dataSave(note) {
    const index = note.id.split(",")[1];
    const headText = note.querySelector('.headText').value;
    const noteText = note.querySelector('.main').value;

    if (headTextData.hasOwnProperty(index)) {
        headTextData[index] = headText;
    } else {
        headTextData[index] = headText;
    }

    if (noteTextData.hasOwnProperty(index)) {
        noteTextData[index] = noteText;
    } else {
        noteTextData[index] = noteText;
    }
}

function dataRemove(note) {
    const index = parseInt(note.id.toString().split(",")[1]);
    delete headTextData[index];
    delete noteTextData[index];
}

function attachClass1EventListeners() {

    const class1Buttons = document.querySelectorAll('.class1');
    const class2Buttons = document.querySelectorAll('.class2');
    const class3Buttons = document.querySelectorAll('.class3');

    //save note button logic
    class1Buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const note = e.target.parentElement.parentElement.parentElement.parentElement;
            const headText = note.children[0].children[0];
            const noteText = note.children[1];
            headText.setAttribute("readonly", "true");
            noteText.setAttribute("readonly", "true");
            dataSave(note);
            saveItem();
        });
    });

    //update note button logic
    class2Buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const note = e.target.parentElement.parentElement.parentElement.parentElement;
            const headText = note.children[0].children[0];
            const noteText = note.children[1];
            headText.removeAttribute('readonly');
            noteText.removeAttribute('readonly');
            dataSave(note);
            saveItem();
        });
    });

    //remove note button logic
    class3Buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const note = e.target.parentElement.parentElement.parentElement.parentElement;
            container.removeChild(note);
            dataRemove(note);
            saveItem();
        });
    });
}

function reattach() {
    // Loop through each note
    const notes = document.querySelectorAll('.eachNote');
    notes.forEach(note => {
        const index = note.id.split(",")[1];
        const headText = note.querySelector('.headText');
        const noteText = note.querySelector('.main');

        // Reattach data from headTextData and noteTextData
        if (headTextData[index]) {
            headText.value = headTextData[index];
        }
        if (noteTextData[index]) {
            noteText.value = noteTextData[index];
        }
    });
}

addButton.addEventListener("click", function () {

    // addButton rotation code

    const button = this;
    button.classList.add('rotate');
    setTimeout(() => {
        button.classList.remove('rotate');
    }, 1000)

    // main logic start from here

    const newNote = document.createElement("div");
    newNote.setAttribute("class", "eachNote");
    newNote.setAttribute("id", "note," + count);
    newNote.innerHTML = `
        <div class="head">
            <textarea name="headText" class="headText" placeholder="title"></textarea>
            <div class="img">
                <button class="imgs class1"><img src="accept-1.png" alt=""></button>
                <button class="imgs class2"><img src="pencil-1.png" alt=""></button>
                <button class="imgs class3"><img src="business-1.png" alt=""></button>
            </div>
        </div>
        <textarea name="" class="main" placeholder="main Notes"></textarea>
    `;
    count++;
    container.appendChild(newNote);
    saveItem();
    attachClass1EventListeners();

    // location.reload();
})

showItem();
// attachClass1EventListeners()