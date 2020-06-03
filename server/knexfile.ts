import path from 'path'

module.exports = { // knex não suporta a sintaxe de ts
  client: 'sqlite3', // qual banco o knex vai usar
  connection: { //
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  },
  migrations: { //
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  seeds: { //
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  },
  useNullAsDefault: true, // define um valor padrão para os dados
}