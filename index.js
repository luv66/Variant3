/**
 * Варіант 3: Task Tracker
 */

let tasks = [];

function addTask(title, description, priority, category, deadline) {
    const newTask = {
        id: Date.now(),
        title,
        description,
        priority, // low, medium, high
        category,
        deadline: new Date(deadline),
        status: 'todo', // за замовчуванням
        createdAt: new Date()
    };
    tasks.push(newTask);
    console.log(`Завдання "${title}" додано.`);
}

const filterTasks = (key, value) => tasks.filter(task => task[key] === value);

const sortTasks = (criteria) => {
    return [...tasks].sort((a, b) => {
        if (criteria === 'deadline' || criteria === 'createdAt') {
            return a[criteria] - b[criteria];
        }
        // Сортування за пріоритетом (high > medium > low)
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
};

function getStatistics() {
    const total = tasks.length;
    if (total === 0) return "Список завдань порожній.";

    const completed = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const overdue = tasks.filter(t => t.deadline < new Date() && t.status !== 'done').length;
    
    const percentDone = ((completed / total) * 100).toFixed(1);

    return {
        total,
        completed,
        inProgress,
        overdue,
        completionRate: `${percentDone}%`
    };
}

const searchTasks = (query) => {
    const q = query.toLowerCase();
    return tasks.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
    );
};

addTask("Вивчити JS", "Пройти тему масивів", "high", "Education", "2026-04-10");
addTask("Купити продукти", "Хліб, молоко", "medium", "Shopping", "2024-01-01"); // Прострочене

console.log("Статистика:", getStatistics());
// 6. Групування завдань за категоріями
const groupByCategory = () => {
    return tasks.reduce((groups, task) => {
        const category = task.category || 'Без категорії';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(task);
        return groups;
    }, {});
};

// --- ДЕМОНСТРАЦІЯ РОБОТИ ВСІХ ФУНКЦІЙ ---

console.log("\n--- Пошук (запит 'JS') ---");
console.table(searchTasks('JS'));

console.log("\n--- Сортування за пріоритетом (High -> Low) ---");
console.table(sortTasks('priority'));

console.log("\n--- Групування за категоріями ---");
console.log(groupByCategory());

console.log("\n--- Фільтрація (тільки 'Shopping') ---");
console.table(filterTasks('category', 'Shopping'));