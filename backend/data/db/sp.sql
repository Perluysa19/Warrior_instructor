    
DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_assign_power_to_warrior` (IN `warriorId` INT, IN `powerId` INT, IN `adminId` INT)   BEGIN
    INSERT INTO warrior_power (Warrior_id, Power_id, Admin_id)
    VALUES (warriorId, powerId, adminId);
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_game` (IN `gameName` VARCHAR(30), IN `isPublic` TINYINT(1), IN `gameCode` VARCHAR(20), IN `playerId` INT)   BEGIN
    INSERT INTO game (Game_name, Game_Public, Game_Code, Player_id)
    VALUES (gameName, isPublic, gameCode, playerId);
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_player` (IN `playerName` VARCHAR(20))   BEGIN
     INSERT INTO player (Player_name) VALUES (playerName);
   END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_warrior` (
  IN `warriorName` VARCHAR(30),
  IN `raceId` INT,
  IN `warriorTypeId` INT,
  IN `magicId` INT,
  IN `adminId` INT
) BEGIN
  INSERT INTO warrior (
    Warrior_name, Race_id, Warrior_type_id, Magic_id, Admin_id
  )
  VALUES (warriorName, raceId, warriorTypeId, magicId, adminId);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_player_warriors` (IN `playerId` INT)   BEGIN
    SELECT w.*
    FROM warrior w
    INNER JOIN game_player_warrior gpw ON gpw.Warrior_id = w.Warrior_id
    WHERE gpw.Player_id = playerId;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_warrior_powers` (IN `warriorId` INT)   BEGIN
    SELECT p.Power_id, p.Power_name
    FROM power p
    INNER JOIN warrior_power wp ON wp.Power_id = p.Power_id
    WHERE wp.Warrior_id = warriorId;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_join_game` (IN `gameId` INT, IN `playerId` INT)   BEGIN
    INSERT INTO player_game (Game_id, Player_id)
    VALUES (gameId, playerId);
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_list_public_games` ()   BEGIN
    SELECT * FROM game WHERE Game_Public = 1;
  END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_register_warrior_to_game` (IN `gameId` INT, IN `playerId` INT, IN `warriorId` INT)   BEGIN
    INSERT INTO game_player_warrior (Game_id, Player_id, Warrior_id)
    VALUES (gameId, playerId, warriorId);
  END$$

DELIMITER ;

