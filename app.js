function createItem(item) {
    let itemContainer = document.createElement("div");
    itemContainer.classList.add("item");

    let itemTitleWrapper = document.createElement("span");
    itemTitleWrapper.classList.add("item-title", "title");

    let itemTitle = document.createTextNode(item);
    itemTitleWrapper.appendChild(itemTitle);

    let deleteIcon = document.createElement("img");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.src = "trash_icon.svg";
    deleteIcon.alt = "trash-icon";
    deleteIcon.addEventListener("click", clearOne)
    itemContainer.appendChild(itemTitleWrapper);
    itemContainer.appendChild(deleteIcon);

    let groceryItemsContainer = document.getElementsByClassName("grocery-items")[0];

    groceryItemsContainer.appendChild(itemContainer);
}

let groceryItems = [];
checkLocalStorage();

function addToLocalStorage(item) {
    groceryItems[groceryItems.length] = item;
    localStorage.setItem("groceriesList", JSON.stringify(groceryItems));
}

function checkLocalStorage() {
    if (localStorage.getItem("groceriesList")) {
        groceryItems = JSON.parse(localStorage.getItem("groceriesList"));
        return;
    }
    groceryItems = [];
}

function updateList() {
    let lengthOfList = groceryItems.length;
    let counter = 0;
    while (counter != lengthOfList) {
        createItem(groceryItems[counter]);
        counter++;
    }
}

updateList();


let formAlertBox = document.getElementsByClassName("form-alert-box")[0];
let listAlertBox = document.getElementsByClassName("list-alert-box")[0];

function formFeedbackMessage(itemName = "") {
    let formItemPrefix = document.getElementsByClassName("form-item-prefix")[0];
    let formMessage = document.getElementsByClassName("form-msg")[0];
    if (itemName.length > 0) {
        formAlertBox.classList.remove("danger");
        formAlertBox.classList.add("opacity-one", "slide-right", "pass");
        formItemPrefix.textContent = itemName;
        formMessage.textContent = "Added to the list";
    } else {
        formAlertBox.classList.remove("pass");
        formAlertBox.classList.add("opacity-one", "slide-right", "danger");
        formItemPrefix.textContent = "";
        formMessage.textContent = "Provide an item to add to the list";
    }

    setTimeout(() => {
        formAlertBox.classList.remove("slide-right", "opacity-one");
    }, 3000);
}

function listFeedbackMessage(itemName = "") {
    let listItemPrefix = document.getElementsByClassName("list-item-prefix")[0];
    let listMessage = document.getElementsByClassName("list-msg")[0];
    listAlertBox.classList.add("opacity-one", "slide-right", "pass");
    if (itemName) {
        listItemPrefix.textContent = itemName;
        listMessage.textContent = "Removed from the list";
    } else {
        listItemPrefix.textContent = "";
        listMessage.textContent = "List Cleared";
    }
    setTimeout(() => {
        listAlertBox.classList.remove("slide-right", "opacity-one");
    }, 3000);
}

function clearOne(e) {
    let itemsContainer = e.target.parentNode.parentNode;
    let itemWrapper = e.target.parentNode;
    let itemName = itemWrapper.getElementsByClassName("item-title")[0].textContent;
    console.log(itemName)
    let index = groceryItems.indexOf(itemName);
    groceryItems = groceryItems.filter((item) => {
        return item != itemName;
    })
    localStorage.setItem("groceriesList", JSON.stringify(groceryItems));
    listFeedbackMessage(itemName);
    itemsContainer.removeChild(itemWrapper);
}

const groceryListContainer = document.getElementsByClassName("grocery-items")[0];
const clearAllButton = document.getElementsByClassName("clear-button")[0];
clearAllButton.addEventListener("click", clearAll);
function clearAll() {
    if (!groceryItems.length) {
        return;
    }
    while (groceryListContainer.firstChild) {
        groceryListContainer.removeChild(groceryListContainer.firstChild);
    }
    localStorage.clear();
    checkLocalStorage();
    listFeedbackMessage();
}

const groceryListForm = document.forms[0];

groceryListForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputString = e.currentTarget[0].value;
    if (inputString.length > 0) {
        addToLocalStorage(inputString);
        createItem(inputString);
    }
    formFeedbackMessage(inputString);
    e.currentTarget[0].value = "";
})


/*

(One function for both alert boxes - less readable)

function feedbackMessage(alert, message, container, itemName = "") {
    let prefix = container;
    let suffix = container + "-alert-box";
    const messageBox = document.getElementsByClassName(suffix)[0];
    const itemPrefix = document.getElementsByClassName(container + "-item-prefix")[0];
    const msgString = document.getElementsByClassName(container + "-msg")[0];
    messageBox.classList.add("opacity-one", "slide-right", alert);
    itemPrefix.textContent = "";
    msgString.textContent = "";
    msgString.textContent = message;

    if (itemName.length > 0) {
        itemPrefix.textContent = itemName;
        msgString.textContent = message;
    }

    setTimeout(() => {
        messageBox.classList.remove("slide-right", "opacity-one");
    }, 3000)

}
*/