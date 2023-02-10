import * as sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();

const file = './db.sqlite';

// Connect to the db
const db: sqlite.Database = new sqlite3.Database(file, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Successful connection to the database');
});

// Promise callback function
function sqlite_all(sql: string, params: (string | number)[] = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject('Read error' + err.message);
      resolve(rows);
    });
  });
}

function sqlite_run(sql: string, params: (string | number)[] = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err) => {
      if (err) reject(err.message);
      resolve(true);
    });
  });
}

function sqlite_get(sql: string, params: (string | number)[] = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, row) => {
      if (err) reject('Read error' + err.message);
      resolve(row);
    });
  });
}

// Initializing the task table
function createTable() {
  console.log('Create Table task');
  db.run(
    'CREATE TABLE IF NOT EXISTS task (name TEXT, body TEXT, completed INTEGER)'
  );
}

// Read all tasks
async function readTasks() {
  const sql = 'SELECT rowid AS id,name, body, completed FROM task';
  const result = await sqlite_all(sql);

  return result;
}

async function insertTask(name: string, body: string) {
  console.log('Insert task');

  const sql = 'INSERT INTO task(name, body, completed) VALUES (?,?,?)';
  const params = [name, body, 0];

  await sqlite_run(sql, params);
}

async function deleteTask(id: string) {
  console.log('Delete task');

  let sql = 'SELECT * FROM task WHERE rowid= ?';
  const task = await sqlite_get(sql, [id]);

  if (!task) {
    return console.log('Task not exist');
  } else {
    sql = 'DELETE FROM task WHERE rowid = ?';
    await sqlite_run(sql, [id]);
    console.log('Delete OK');
  }
}

async function patchTaskCompleted(id: string, value: string) {
  console.log('Change task completed');

  const sql = 'UPDATE task SET completed = ? WHERE id = ?';
  const params = [value, id];

  await sqlite_run(sql, params);
  console.log('Change OK');
}

export { createTable, readTasks, insertTask, deleteTask, patchTaskCompleted };
