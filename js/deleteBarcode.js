const submitDeleteItem = document.querySelector('.submit_delete_item');
const selectDelete = document.querySelector('.select_delete');
const mainBtn = document.querySelector('.main_btn');

const url = 'db.json';
import { localStorageData, createLineButtons, fillpossibleDeletionList, getDataLS } from './script.js';

submitDeleteItem.addEventListener('click', () => {
	const deleteItem = selectDelete.value;

	deleteFromLocalStorage(localStorageData, deleteItem);
	selectDelete.innerHTML = '';
	mainBtn.click();
});

export const deleteFromLocalStorage = (localStorageData, deleteItem) => {
	const newData = {};
	for (const key in localStorageData) {
		if (key !== deleteItem) {
			newData[key] = key;
		}
	}
	localStorage.setItem('userData', JSON.stringify(newData));

	createLineButtons(newData);
};
