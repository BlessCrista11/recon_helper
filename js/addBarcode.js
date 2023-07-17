const submitAddItem = document.querySelector('.submit_add_item');
const addTextBarcode = document.querySelector('#add_text_barcode');
const mainBtn = document.querySelector('.main_btn');

import { localStorageData } from './script.js';

export const addToLocalStorage = (localStorageData, addItem) => {
	let newData = localStorageData;
	let checkedInput = checkInputData();

	if (checkedInput) {
		newData[addItem] = addItem;
	}

	localStorage.setItem('userData', JSON.stringify(newData));
};

export const addToJSON = () => {
	console.log('json');
};

submitAddItem.addEventListener('click', () => {
	const addItem = addTextBarcode.value;

	addToLocalStorage(localStorageData, addItem);
	addTextBarcode.value = '';
	mainBtn.click();
});

const checkInputData = () => {
	const inputDataToArray = [...addTextBarcode.value];

	if (inputDataToArray.length > 8) return 0;

	if (addTextBarcode.value === '') {
		console.log('no text');
		alert('no text');
		return 0;
	}

	for (let i = 0; i < inputDataToArray.length; i++) {
		if (inputDataToArray[i] === '`') {
			console.log('wrong char');
			alert('wrong char');
			return 0;
		}
	}

	for (const key in localStorageData) {
		if (key === addTextBarcode.value) {
			console.log('estb');
			alert('уже есть');
			return 0;
		}
	}

	return 1;
};
