import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';
import config from '../config/config.js';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const db = {};

let sequelize;
if (config[env].use_env_variable) {
  sequelize = new Sequelize(process.env[config[env].use_env_variable], config[env]);
} else {
  sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);
}

// Dynamically import all model files
const files = fs.readdirSync(dirname);

await Promise.all(
  files
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        !file.includes('.test.js')
      );
    })
    .map(async file => {
      try {
        const filePath = path.join(dirname, file);
        const fileURL = pathToFileURL(filePath).href;

        const module = await import(fileURL);

        if (typeof module.default === 'function') {
          const model = module.default(sequelize, Sequelize.DataTypes);
          db[model.name] = model;
        } else {
          console.warn(`Skipping model ${file}: No default function export.`);
        }
      } catch (err) {
        console.error(`Error importing model ${file}:`, err);
      }
    })
);

// Associate models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
