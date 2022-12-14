import * as sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();

const file = './db.sqlite';

const db: sqlite.Database = new sqlite3.Database(file, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Successful connection to the database');
});

export function createTable() {
  console.log('Create Table task');
  db.run('CREATE TABLE IF NOT EXISTS task (name TEXT, body TEXT, completed INTEGER)');
}

export async function insertRow(name: string, body: string) {
  console.log('Insert task');
  db.run('INSERT INTO task(name, body, completed) VALUES (?,?,?)', [name, body, 0], (err) => {
    if (err) return console.log(err.message);
    console.log('Insert OK');
  });
  // return new Promise((resolve, reject) => {
  //   db.serialize(() => {
  //     db.run('INSERT INTO task(name, body, completed) VALUES (?,?,?)', [name, body, 0], (err) => {
  //       if (err) reject(err);
  //       resolve('Insert OK');
  //     });
  //   });
  // });
}

export async function readRow() {
  /* Promise */
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all('SELECT rowid AS id,name, body, completed FROM task', [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  });

  /* Async/Await: not working */
  // db.serialize(async () => {
  //   await db.all('SELECT rowid AS id,name FROM task', [], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     return rows;
  //   });
  // });
}

export async function deleteRow(id: string) {
  console.log('Delete task');
  db.get('SELECT * FROM task WHERE rowid= ?', id, (err, row) => {
    if (err) return console.log(err.message);
    if (!row) {
      return console.log('Task not exist');
    } else {
      db.run('DELETE FROM task WHERE rowid = ?', id, (err) => {
        if (err) return console.log(err.message);
        console.log('Delete OK');
      });
    }
  });
}

export async function patchTaskCompleted(id: string, value: string) {
  console.log('Change task completed');
  db.serialize(() => {
    db.run('UPDATE task SET completed = ? WHERE id = ?', [value, id], (err) => {
      if (err) return console.log(err.message);
      console.log('Change OK');
    });
  });
}
