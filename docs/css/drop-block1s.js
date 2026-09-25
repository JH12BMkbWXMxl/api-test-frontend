const container = document.getElementById("list");
let draggedItem = null;

// Начало перетаскивания
container.addEventListener("dragstart", e => {
    // Проверяем, что тащим именно блок, а не случайный текст внутри
    const targetBlock = e.target.closest(".block");
    if (!targetBlock) return;

    draggedItem = targetBlock;
    // requestAnimationFrame нужен, чтобы класс .dragging не применился к "призраку" в руке у пользователя
    requestAnimationFrame(() => targetBlock.classList.add("dragging"));
});

// Окончание перетаскивания
container.addEventListener("dragend", e => {
    if (draggedItem) {
        draggedItem.classList.remove("dragging");
        draggedItem = null;
    }
});

// Перемещение над контейнером
container.addEventListener("dragover", e => {
    e.preventDefault(); // Разрешаем сброс (drop)
    if (!draggedItem) return;

    // Передаем e.clientY для вертикального списка (или e.clientX, если список горизонтальный)
    const afterElement = getDragAfterElement(container, e.clientY);

    if (!afterElement) {
        container.appendChild(draggedItem);
    } else {
        container.insertBefore(draggedItem, afterElement);
    }
});

// Функция определения элемента, перед которым нужно вставить draggedItem
function getDragAfterElement(container, y) {
    // Ищем только прямые дочерние элементы с классом .block
    const draggableElements = [...container.querySelectorAll(".block:not(.dragging)")];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            // Находим центр элемента по вертикали (y)
            const offset = y - box.top - box.height / 2;

            // Если курсор выше центра элемента, и это самый близкий элемент из всех
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY },
    ).element;
}

function getElements() {
    return {
        menu: document.getElementById("nav"),
        menuLink: document.getElementById("menuLink"),
    };
}

function toggleClass(element, className) {
    var classes = element.className.split(/\s+/);
    var length = classes.length;
    var i = 0;

    for (; i < length; i++) {
        if (classes[i] === className) {
            classes.splice(i, 1);
            break;
        }
    }
    // The className is not found
    if (length === classes.length) {
        classes.push(className);
    }

    element.className = classes.join(" ");
}

function toggleMenu() {
    var active = "active";
    var elements = getElements();

    toggleClass(elements.menu, active);
}

function handleEvent(e) {
    var elements = getElements();

    if (e.target.id === elements.menuLink.id) {
        toggleMenu();
        e.preventDefault();
    } else if (elements.menu.className.indexOf("active") !== -1) {
        toggleMenu();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", handleEvent);
});
