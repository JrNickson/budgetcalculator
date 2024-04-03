import * as model from './model.js';
import * as view from './view.js';

// Start
init();

// Functions
function init() {
	displayMonth();
	insertTestData();
	view.renderBudget(model.calcBudget());
	addEventListeners();
}

function displayMonth() {
	const { month, year } = model.getMonthYear();
	view.renderMonth(month, year);
}

function insertTestData() {
	const randomData = model.getTestData();
	view.renderTestData(randomData);
}

function createRecord(e) {
	e.preventDefault();

	// Проверка формы на заполненность
	const checkResult = view.checkEmptyFields();
	if (!checkResult) return;

	// Поулчение данных из формы
	const data = view.getFormData();

	// Формируем запись
	const record = model.createRecord(data);

	// Отображаем разметку на странице
	view.renderRecord(record);

	// Посчитать бюджет
	view.renderBudget(model.calcBudget());

	view.clearForm();
	insertTestData();
}

function deleteRecord(e) {
	// Remove from page
	const id = view.removeRecord(e);

	// Remove from array
	model.deleteRecord(id);

	// Посчитать бюджет
	view.renderBudget(model.calcBudget());
}

function addEventListeners() {
	// Добавление
	view.elements.form.addEventListener('submit', createRecord);

	// Удаление
	document.body.addEventListener('click', function (e) {
		// Кнопка удалить
		if (e.target.closest('button.item__remove')) {
			deleteRecord(e);
		}
	});
}
