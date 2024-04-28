class task {
    constructor() {
        this.tables = {};
    }

    createTable(tableName, columns) {
        this.tables[tableName] = {
            columns: columns,
            rows: []
        };
    }

    insert(tableName, values) {
        if (!this.tables[tableName]) {
            console.error(`Table '${tableName}' does not exist`);
            return;
        }

        if (values.length !== this.tables[tableName].columns.length) {
            console.error(`Number of values doesn't match number of columns`);
            return;
        }

        this.tables[tableName].rows.push(values);
    }

    select(tableName, columns) {
        if (!this.tables[tableName]) {
            console.error(`Table '${tableName}' does not exist`);
            return;
        }

        const table = this.tables[tableName];
        const columnIndexMap = {};
        table.columns.forEach((column, index) => {
            columnIndexMap[column] = index;
        });

        const selectedColumns = columns.map(col => columnIndexMap[col]);
        return table.rows.map(row =>
            selectedColumns.map(index => row[index])
        );
    }
}

// Example usage:
const db = new Database();

db.createTable('users', ['id', 'name', 'age']);
db.insert('users', [1, 'Alice', 30]);
db.insert('users', [2, 'Bob', 35]);

console.log(db.select('users', ['name', 'age'])); 