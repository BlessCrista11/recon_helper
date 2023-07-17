const url = 'data.json';

const btnBlock = document.querySelector('.btn-block');
const editBtn = document.querySelector('.edit_btn');
const deleteBtn = document.querySelector('.delete_btn');
const mainBtn = document.querySelector('.main_btn');
const addBarcode = document.querySelector('.add-barcode');
const deleteBarcode = document.querySelector('.delete-barcode');
const barcode = document.querySelector('#barcode');
const selectDelete = document.querySelector('.select_delete');
const nav = document.querySelector('nav');
const footer = document.querySelector('footer');
const barcode_wrapper = document.querySelector('.barcode_wrapper');

const closeAllWindow = () => {
	btnBlock.style.display = 'none';
	deleteBarcode.style.display = 'none';
	addBarcode.style.display = 'none';
	barcode.style.display = 'none';
};

mainBtn.addEventListener('click', () => {
	closeAllWindow();
	getDataLS();
	createLineButtons(localStorageData);

	btnBlock.style.display = 'block';
});

editBtn.addEventListener('click', () => {
	closeAllWindow();
	getDataLS();
	addBarcode.style.display = 'block';
});

deleteBtn.addEventListener('click', () => {
	closeAllWindow();
	getDataLS();
	fillpossibleDeletionList();
	deleteBarcode.style.display = 'block';
});

barcode.addEventListener('click', () => {
	nav.style.display = 'block';
	footer.style.display = 'block';

	closeAllWindow();
	btnBlock.style.display = 'block';
	barcode_wrapper.style.display = ' none';
});

const getDataLS = () => {
	localStorageData = JSON.parse(localStorage.getItem('userData'));
};

let localStorageData = JSON.parse(localStorage.getItem('userData'));

const getData = () => {
	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			setBaseDataToLocalStorage(data);
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
};

const setBaseDataToLocalStorage = data => {
	if (localStorage.getItem('userData') === null) {
		const userData = {};
		Object.assign(userData, data);
		localStorage.setItem('userData', JSON.stringify(userData));
		console.log(localStorageData);
		createLineButtons(data);
	} else {
		createLineButtons(localStorageData);
	}
};

const createLineButtons = data => {
	btnBlock.innerHTML = '';
	for (let item in data) {
		btnBlock.innerHTML += `
    <div id="${item}" class="text-block">${item}</div>
    `;
	}

	addBtnListener();
};

const fillpossibleDeletionList = () => {
	selectDelete.innerHTML = '';

	for (let item in localStorageData) {
		selectDelete.innerHTML += `
		<option value="${item}">${item}</option>
    
    `;
	}
};

const createImg = lineName => {
	nav.style.display = 'none';
	footer.style.display = 'none';
	barcode_wrapper.style.display = ' block';

	JsBarcode('#barcode', `${lineName}`, {
		format: 'code128',
		displayValue: true,
		fontSize: 40,
		margin: 0,
		width: 4,
		height: 200,
	});

	console.log(barcode);
};

const addBtnListener = () => {
	const tech = document.querySelector('.tech');
	let btns = document.querySelectorAll('.text-block');

	for (let i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', () => {
			closeAllWindow();
			createImg(btns[i].innerText);
		});
	}
};

getData();

const submitAddItem = document.querySelector('.submit_add_item');
const addTextBarcode = document.querySelector('#add_text_barcode');

const addToLocalStorage = (localStorageData, addItem) => {
	let newData = localStorageData;
	let checkedInput = checkInputData();

	if (checkedInput) {
		newData[addItem] = addItem;
	}

	localStorage.setItem('userData', JSON.stringify(newData));
};

const addToJSON = () => {
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

const submitDeleteItem = document.querySelector('.submit_delete_item');

submitDeleteItem.addEventListener('click', () => {
	const deleteItem = selectDelete.value;

	deleteFromLocalStorage(localStorageData, deleteItem);
	selectDelete.innerHTML = '';
	mainBtn.click();
});

const deleteFromLocalStorage = (localStorageData, deleteItem) => {
	const newData = {};
	for (const key in localStorageData) {
		if (key !== deleteItem) {
			newData[key] = key;
		}
	}
	localStorage.setItem('userData', JSON.stringify(newData));

	createLineButtons(newData);
};
