"use strict";

class Board {
    constructor(name) {
        this.name = name;
    }

    static addElement(child, parent = document.querySelector('#board .column-container')) {
        parent.appendChild(child);
    }

    static removeElement(e) {
        e.remove()
    }

    static createDeleteButton() {
        let deleteButton = document.createElement("button");
        deleteButton.className = "btn-delete";
        deleteButton.textContent = "x";
        return deleteButton;
    }
}

class Column extends Board {
    constructor(name) {
        super(name);
        this.element = this.createColumn();
    }

    createColumn() {
        let column = document.createElement("div");
        column.className = "column";
        column.appendChild(Board.createDeleteButton());
        column.appendChild(this.createColumnTitle());
        column.appendChild(Column.createColumnAddCardButton());
        column.appendChild(Column.createColumnCardList());
        return column;
    }

    createColumnTitle() {
        let columnTitle = document.createElement("h2");
        columnTitle.className = "column-title";
        columnTitle.textContent = this.name;
        return columnTitle;
    }

    static createColumnCardList() {
        let columnCardList = document.createElement("ul");
        columnCardList.className = "column-card-list";
        return columnCardList;
    }

    static createColumnAddCardButton() {
        let columnAddCard = document.createElement("button");
        columnAddCard.className = "add-card";
        columnAddCard.textContent = "+";
        return columnAddCard;
    }
}

class Card extends Board {
    constructor(name) {
        super(name);
        this.element = this.createCard();
    }

    createCard() {
        let card = document.createElement("li");
        card.className = "card";
        card.appendChild(Board.createDeleteButton());
        card.appendChild(this.createCardDescription());
        return card;
    }

    createCardDescription() {
        let cardDescription = document.createElement("p");
        cardDescription.className = "card-description";
        cardDescription.textContent = this.name;
        return cardDescription;
    }
}

(function setEventListeneres() {
    const mainBoard = document.querySelector('.board');
    mainBoard.addEventListener('click', (e) => {
        if (e.target.matches('.btn-delete')) {
            const elementClicked = e.target;
            Board.removeElement(elementClicked.parentNode);
        } else if (e.target.matches('.add-card')) {
            const elementClicked = e.target;
            const card = new Card(prompt("Название задачи"));
            Board.addElement(card.element, elementClicked.parentNode.children[3]);
        } else if (e.target.matches('.create-column')) {
            const column = new Column(prompt('Название статуса'));
            Board.addElement(column.element);
        }
    });
    mainBoard.addEventListener('dblclick', (e) => {
        if (e.target.matches('.card')) {
            const nextColumn = e.target.parentNode.parentNode.nextSibling;
            if (nextColumn) {
                nextColumn.querySelector('.column-card-list').appendChild(e.target);
            }
        }
    });
})();

function setup(columnName, cardName) {
    const newColumn = new Column(columnName);
    Board.addElement(newColumn.element);
    if (cardName) {
        const card = new Card(cardName);
        Board.addElement(card.element, newColumn.element.childNodes[3]);
    }
}

setup('Сделать', 'Новая задача');
setup('В работе', 'Создать чего-нибудь');
setup('Готово');
