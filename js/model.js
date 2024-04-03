const budget = [];
console.log(budget);

function createRecord({ type, title, value }) {
	// Расчет id
	let id = 1;
	if (budget.length > 0) {
		const lastElement = budget[budget.length - 1];
		const lastElID = lastElement.id;
		id = lastElID + 1;
	}

	// Формируем запись
	const record = {
		id: id,
		type,
		title: title.trim(),
		value: +value,
	};

	// Добавляем запись в данные
	budget.push(record);
	console.log(budget);

	return record;
}

function deleteRecord(id) {
	const index = budget.findIndex(function (element) {
		if (+id === element.id) {
			return true;
		}
	});

	// Remove from array
	budget.splice(index, 1);
}

function calcBudget() {
	// Считаем общий доход
	const totalIncome = budget.reduce(function (total, element) {
		if (element.type === 'inc') {
			return total + element.value;
		} else {
			return total;
		}
	}, 0);

	// Считаем общий расход
	const totalExpense = budget.reduce(function (total, element) {
		if (element.type === 'exp') {
			return total + element.value;
		} else {
			return total;
		}
	}, 0);

	const totalBudget = totalIncome - totalExpense;

	let expensePercents = 0;
	if (totalIncome) {
		expensePercents = Math.round((totalExpense * 100) / totalIncome);
	}

	return {
		totalIncome: totalIncome,
		totalExpense: totalExpense,
		totalBudget: totalBudget,
		expensePercents: expensePercents,
	};
}

function getTestData() {
	const testData = [
		{ type: 'inc', title: 'Фриланс', value: 1500 },
		{ type: 'inc', title: 'Зарплата', value: 2000 },
		{ type: 'inc', title: 'Бизнес', value: 2000 },
		{ type: 'inc', title: 'Рента', value: 1000 },
		{ type: 'exp', title: 'Продукты', value: 300 },
		{ type: 'exp', title: 'Кафе', value: 200 },
		{ type: 'exp', title: 'Транспорт', value: 200 },
		{ type: 'exp', title: 'Квартира', value: 500 },
	];

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	const randomIndex = getRandomInt(testData.length);
	const randomData = testData[randomIndex];

	return randomData;
}

function getMonthYear() {
	const now = new Date();

	const year = now.getFullYear(); // 2023

	const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
		month: 'long',
	});
	const month = timeFormatter.format(now);

	return {
		month,
		year,
	};
}

export { createRecord, deleteRecord, calcBudget, getTestData, getMonthYear };
