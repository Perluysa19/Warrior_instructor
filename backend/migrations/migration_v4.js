import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'warrior',
  multipleStatements: true
};

// SQL statements for adding image field to warrior table
const sqlStatements = [
  // Add Warrior_image column to warrior table
  `ALTER TABLE warrior ADD COLUMN Warrior_image VARCHAR(255) DEFAULT NULL AFTER Admin_id`,
  
  // Update existing warriors with default image
  `UPDATE warrior SET Warrior_image = 'default-warrior.jpg' WHERE Warrior_image IS NULL`
];

export async function runMigration() {
  let connection;
  try {
    console.log('🔄 Iniciando migración v4: Agregando campo de imagen a guerreros...');
    
    connection = await mysql.createConnection(dbConfig);
    
    for (const sql of sqlStatements) {
      console.log('Ejecutando:', sql.substring(0, 50) + '...');
      await connection.execute(sql);
    }
    
    console.log('✅ Migración v4 completada exitosamente');
    console.log('📸 Campo Warrior_image agregado a la tabla warrior');
    
  } catch (error) {
    console.error('❌ Error en la migración v4:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration()
    .then(() => {
      console.log('🎉 Migración completada');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error en la migración:', error);
      process.exit(1);
    });
} 