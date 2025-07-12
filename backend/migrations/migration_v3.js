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

// SQL statements for table creation
const sqlStatements = [
  // Drop tables in reverse order of creation (to avoid foreign key constraints)
  `DROP TABLE IF EXISTS warrior_power;`,
  `DROP TABLE IF EXISTS game_player_warrior;`,
  `DROP TABLE IF EXISTS player_game;`,
  `DROP TABLE IF EXISTS warrior;`,
  `DROP TABLE IF EXISTS power;`,
  `DROP TABLE IF EXISTS race;`,
  `DROP TABLE IF EXISTS magic;`,
  `DROP TABLE IF EXISTS warrior_type;`,
  `DROP TABLE IF EXISTS game;`,
  `DROP TABLE IF EXISTS player;`,
  `DROP TABLE IF EXISTS admin;`,

  // Drop procedures
  `DROP PROCEDURE IF EXISTS sp_assign_power_to_warrior;`,
  `DROP PROCEDURE IF EXISTS sp_create_game;`,
  `DROP PROCEDURE IF EXISTS sp_create_player;`,
  `DROP PROCEDURE IF EXISTS sp_create_warrior;`,
  `DROP PROCEDURE IF EXISTS sp_get_player_warriors;`,
  `DROP PROCEDURE IF EXISTS sp_get_warrior_powers;`,
  `DROP PROCEDURE IF EXISTS sp_join_game;`,
  `DROP PROCEDURE IF EXISTS sp_list_public_games;`,
  `DROP PROCEDURE IF EXISTS sp_register_warrior_to_game;`,

  // Create tables in proper order
  `CREATE TABLE admin (
    Admin_id int(11) NOT NULL,
    Admin_name varchar(20) NOT NULL,
    Admin_password varchar(255) NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 1,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (Admin_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,

  `CREATE TABLE player (
    Player_id int(11) NOT NULL,
    Player_name varchar(20) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (Player_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,

  `CREATE TABLE game (
    Game_id int(11) NOT NULL,
    Game_name varchar(30) NOT NULL,
    Game_Public tinyint(1) NOT NULL DEFAULT 1,
    Game_Code varchar(20) DEFAULT NULL,
    Player_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (Game_id),
    KEY Player_id (Player_id),
    FOREIGN KEY (Player_id) REFERENCES player (Player_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,

  `CREATE TABLE magic (
    Magic_id int(11) NOT NULL,
    Magic_type varchar(30) NOT NULL,
    Admin_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (Magic_id),
    KEY Admin_id (Admin_id),
    FOREIGN KEY (Admin_id) REFERENCES admin (Admin_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,

  `CREATE TABLE power (
    Power_id int(11) NOT NULL,
    Power_name varchar(30) NOT NULL,
    Admin_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (Power_id),
    KEY Admin_id (Admin_id),
    FOREIGN KEY (Admin_id) REFERENCES admin (Admin_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,

  `CREATE TABLE race (
    Race_id int(11) NOT NULL,
    Race_name varchar(30) NOT NULL,
    Admin_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (Race_id),
    KEY Admin_id (Admin_id),
    FOREIGN KEY (Admin_id) REFERENCES admin (Admin_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,

  `CREATE TABLE warrior_type (
    Warrior_type_id int(11) NOT NULL,
    Warrior_type_name varchar(30) NOT NULL,
    Admin_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (Warrior_type_id),
    KEY Admin_id (Admin_id),
    FOREIGN KEY (Admin_id) REFERENCES admin (Admin_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,

  `CREATE TABLE warrior (
    Warrior_id int(11) NOT NULL,
    Warrior_name varchar(30) NOT NULL,
    Warrior_level int(11) NOT NULL,
    Race_id int(11) NOT NULL,
    Warrior_type_id int(11) NOT NULL,
    Magic_id int(11) DEFAULT NULL,
    Admin_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (Warrior_id),
    KEY Race_id (Race_id),
    KEY Warrior_type_id (Warrior_type_id),
    KEY Magic_id (Magic_id),
    KEY Admin_id (Admin_id),
    FOREIGN KEY (Race_id) REFERENCES race (Race_id),
    FOREIGN KEY (Warrior_type_id) REFERENCES warrior_type (Warrior_type_id),
    FOREIGN KEY (Magic_id) REFERENCES magic (Magic_id),
    FOREIGN KEY (Admin_id) REFERENCES admin (Admin_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,

  `CREATE TABLE player_game (
    Game_id int(11) NOT NULL,
    Player_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (Game_id, Player_id),
    KEY Player_id (Player_id),
    FOREIGN KEY (Game_id) REFERENCES game (Game_id),
    FOREIGN KEY (Player_id) REFERENCES player (Player_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,

  `CREATE TABLE game_player_warrior (
    Game_id int(11) NOT NULL,
    Player_id int(11) NOT NULL,
    Warrior_id int(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (Game_id, Player_id, Warrior_id),
    KEY Player_id (Player_id),
    KEY Warrior_id (Warrior_id),
    FOREIGN KEY (Game_id) REFERENCES game (Game_id),
    FOREIGN KEY (Player_id) REFERENCES player (Player_id),
    FOREIGN KEY (Warrior_id) REFERENCES warrior (Warrior_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,

  // Eliminado DROP, CREATE, INSERT y PROCEDURE de warrior_power

  // Set AUTO_INCREMENT values
  `ALTER TABLE admin MODIFY Admin_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6`,
  `ALTER TABLE player MODIFY Player_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4`,
  `ALTER TABLE game MODIFY Game_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3`,
  `ALTER TABLE magic MODIFY Magic_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4`,
  `ALTER TABLE power MODIFY Power_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5`,
  `ALTER TABLE race MODIFY Race_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4`,
  `ALTER TABLE warrior_type MODIFY Warrior_type_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4`,
  `ALTER TABLE warrior MODIFY Warrior_id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4`,

  // Create stored procedures
  `CREATE PROCEDURE sp_assign_power_to_warrior (IN warriorId INT, IN powerId INT, IN adminId INT)
BEGIN
    INSERT INTO warrior_power (Warrior_id, Power_id, Admin_id)
    VALUES (warriorId, powerId, adminId);
END`,

  `CREATE PROCEDURE sp_create_game (IN gameName VARCHAR(30), IN isPublic TINYINT(1), IN gameCode VARCHAR(20), IN playerId INT)
BEGIN
    INSERT INTO game (Game_name, Game_Public, Game_Code, Player_id)
    VALUES (gameName, isPublic, gameCode, playerId);
END`,

  `CREATE PROCEDURE sp_create_player (IN playerName VARCHAR(20))
BEGIN
     INSERT INTO player (Player_name) VALUES (playerName);
END`,

  `CREATE PROCEDURE sp_create_warrior (IN warriorName VARCHAR(30), IN warriorLevel INT, IN raceId INT, IN warriorTypeId INT, IN magicId INT, IN adminId INT)
BEGIN
    INSERT INTO warrior (
      Warrior_name, Warrior_level, Race_id, Warrior_type_id, Magic_id, Admin_id
    )
    VALUES (warriorName, warriorLevel, raceId, warriorTypeId, magicId, adminId);
END`,

  `CREATE PROCEDURE sp_get_player_warriors (IN playerId INT)
BEGIN
    SELECT w.*
    FROM warrior w
    INNER JOIN game_player_warrior gpw ON gpw.Warrior_id = w.Warrior_id
    WHERE gpw.Player_id = playerId;
END`,

  `CREATE PROCEDURE sp_get_warrior_powers (IN warriorId INT)
BEGIN
    SELECT p.Power_id, p.Power_name
    FROM power p
    INNER JOIN warrior_power wp ON wp.Power_id = p.Power_id
    WHERE wp.Warrior_id = warriorId;
END`,

  `CREATE PROCEDURE sp_join_game (IN gameId INT, IN playerId INT)
BEGIN
    INSERT INTO player_game (Game_id, Player_id)
    VALUES (gameId, playerId);
END`,

  `CREATE PROCEDURE sp_list_public_games ()
BEGIN
    SELECT * FROM game WHERE Game_Public = 1;
END`,

  `CREATE PROCEDURE sp_register_warrior_to_game (IN gameId INT, IN playerId INT, IN warriorId INT)
BEGIN
    INSERT INTO game_player_warrior (Game_id, Player_id, Warrior_id)
    VALUES (gameId, playerId, warriorId);
END`,
];

export async function runMigration() {
  let connection;
  try {
    // Create connection
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    // Execute all SQL statements
    for (const sql of sqlStatements) {
      try {
        await connection.query(sql);
        console.log('Executed SQL statement successfully');
      } catch (error) {
        console.error('Error executing SQL:', error.message);
        throw error;
      }
    }

    console.log('Database migration completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Migration failed:', error);
    return { success: false, error };
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}