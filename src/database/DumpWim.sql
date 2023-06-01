CREATE DATABASE  IF NOT EXISTS `Warehouse` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Warehouse`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: Warehouse
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `rep` varchar(45) DEFAULT NULL,
  `contact_phone` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `eircode` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `CustomerID_UNIQUE` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (7,'Corner shop ','Tim O\'Malley','0578252134','45 Main street Portlaoise','R35HS78','TimOmalley@cornershop.com'),(8,'Tesco','Jimmy three Shoes','0755252134','Boghlone Portlaoise','R35HS78','JimmyThreeShoes@tesco.com'),(9,'Maggie\'s Cafe','Maggie Jones','0851234567','42 Main Street, Carlow','D02 Y456','MaggieJones@maggies.com'),(10,'The Green Grocer','Tom Smith','0869876543','15 High Street, Newbridge','F92 P987','TomSmith@gmail.com'),(11,'The Book Nook','Sarah Brown','0895554321','7 Market Square, Mullingar ','V93 F457','SarahBrown@thebooknook.com'),(12,'Sweet Treats Bakery','Emma Johnson','0833333333','2 Abbey Street, Dublin','R32 K789','EmmaJohnson@sweettreats.com'),(20,'Dunnes stores','Miley Byrne','058143274','Mill lane, Dublin','K32OH82','Miley@dunnes.ie'),(49,'Hooda','Ronnie Pickering','0431435636','16 Shrewsbury lane, Dublin','R90DF90','ronnie@Hooda.com');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `contact_phone` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `eircode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_id_UNIQUE` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (2,'Mark Mundy','MarkMunday@wim.ie','082632775','24 Upton stree','P6eLk2D'),(3,'Thomas Thumb','ThomasThumb@wim.ie','08925626276','4 Blueberry Hill','H25SD2G'),(4,'Vicker John Dilby','VickerJohnDilby@wim.ie','0864003454','5 Laurel drive','B43KD4R'),(5,'Big Ron Jimery','BigRonJimery@wim.ie','0578252134 ','17 Blossom court, ','D93DF8L'),(6,'Christopher Robin','Christopher@100Acres.com','0935672724','100 Acre woods','P89LS45');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `quantity_in_stock` int DEFAULT NULL,
  `sold_by` enum('case','unit','kg') DEFAULT NULL,
  `case_size` int DEFAULT NULL,
  `unit_rrp` decimal(5,2) DEFAULT NULL,
  `restock_level` int DEFAULT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `purchase_price` decimal(4,2) DEFAULT NULL,
  `sale_price` decimal(4,2) DEFAULT NULL,
  `quantity_on_hold` int DEFAULT '0',
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Coca cola','carbonated soft drink manufactured by the Coca-Cola Company',2,'case',12,2.50,60,'383441',7.20,9.45,0),(2,'Fanta','carbonated soft drink manufactured by the Coca-Cola Company',0,'case',12,2.30,50,'364641',6.45,8.79,0),(3,'7UP','Refreshing lemon-lime soda with a bubbly, citrusy zest and fizz.',2,'case',12,2.40,50,'382631',6.67,8.09,2),(4,'Cheetos','Crunchy cheese-flavored snack with a satisfyingly cheesy taste.',75,'case',24,2.99,50,'363741',32.28,40.51,0),(5,'Bananas','Naturally sweet and nutritious tropical fruit, perfect for a quick snack or adding to smoothies.',56,'kg',0,1.99,30,'',0.96,1.25,0),(6,'Doritos','Crunchy tortilla chips with bold flavors and a satisfying crunch.',0,'case',40,3.50,30,'446582',28.40,37.94,0),(7,'Cadbury Dairy Milk Chocolate Bar','Smooth and creamy milk chocolate bar made with the finest ingredients.',47,'case',46,1.99,50,'652959',18.56,24.80,0),(9,'Uncle Ben\'s Curry Sauce','Delicious curry sauce with a perfect blend of spices, ideal for creating flavorful dishes.',55,'case',16,3.99,30,'794623',12.78,17.31,0),(10,'Pedigree Chum','Nourishing and flavorful dog food with high-quality ingredients for your furry companion.',36,'case',24,2.45,50,'987654',11.42,15.93,0),(11,'Daz','Powerful laundry detergent that removes tough stains and keeps clothes brilliantly clean.',30,'case',12,5.99,50,'765432',22.43,29.47,0),(12,'Lynx','Popular mens grooming product known for its invigorating fragrance and long-lasting freshness.',20,'case',20,4.99,10,'654321',23.00,34.40,0);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders`
--

DROP TABLE IF EXISTS `purchase_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_orders` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `status` enum('ordered','received','returned') DEFAULT NULL,
  `received_date` datetime DEFAULT NULL,
  `ordered_date` datetime DEFAULT NULL,
  `received_by_employee` int DEFAULT NULL,
  `ordered_by_employee` int DEFAULT NULL,
  PRIMARY KEY (`purchase_id`),
  UNIQUE KEY `purchase_id_UNIQUE` (`purchase_id`),
  KEY `received_by_employee` (`received_by_employee`),
  KEY `ordered_by_employee` (`ordered_by_employee`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `purchase_orders_ibfk_1` FOREIGN KEY (`received_by_employee`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `purchase_orders_ibfk_2` FOREIGN KEY (`ordered_by_employee`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `purchase_orders_ibfk_3` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders`
--

LOCK TABLES `purchase_orders` WRITE;
/*!40000 ALTER TABLE `purchase_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders_product`
--

DROP TABLE IF EXISTS `purchase_orders_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_orders_product` (
  `purchase_product_id` int NOT NULL AUTO_INCREMENT,
  `purchase_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`purchase_product_id`),
  UNIQUE KEY `purchase_product_id_UNIQUE` (`purchase_product_id`),
  KEY `product_id` (`product_id`),
  KEY `purchase_id` (`purchase_id`),
  CONSTRAINT `purchase_orders_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `purchase_orders_product_ibfk_2` FOREIGN KEY (`purchase_id`) REFERENCES `purchase_orders` (`purchase_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders_product`
--

LOCK TABLES `purchase_orders_product` WRITE;
/*!40000 ALTER TABLE `purchase_orders_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_orders_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_orders`
--

DROP TABLE IF EXISTS `sale_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `placed_date` datetime DEFAULT NULL,
  `shipped_date` datetime DEFAULT NULL,
  `status` enum('received','picked','sent','returned') DEFAULT NULL,
  `picked_by_employee` int DEFAULT NULL,
  `ordered_by_employee` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `picked_date` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `picked_by_employee` (`picked_by_employee`),
  KEY `ordered_by_employee` (`ordered_by_employee`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `sale_orders_ibfk_1` FOREIGN KEY (`picked_by_employee`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `sale_orders_ibfk_2` FOREIGN KEY (`ordered_by_employee`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `sale_orders_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_orders`
--

LOCK TABLES `sale_orders` WRITE;
/*!40000 ALTER TABLE `sale_orders` DISABLE KEYS */;
INSERT INTO `sale_orders` VALUES (75,'2023-05-30 14:25:02',NULL,'sent',NULL,2,8,'2023-05-30 14:25:05'),(76,'2023-05-30 15:27:49',NULL,'sent',NULL,2,10,'2023-05-30 15:27:55'),(77,'2023-05-30 15:28:21',NULL,'sent',NULL,2,12,'2023-05-30 15:28:43'),(78,'2023-05-30 14:30:13',NULL,'sent',NULL,2,12,'2023-05-30 14:30:48'),(79,'2023-05-30 14:32:43',NULL,'sent',NULL,2,9,'2023-05-30 14:33:15'),(80,'2023-05-30 14:45:25',NULL,'sent',NULL,2,8,'2023-05-30 14:45:40'),(81,'2023-05-30 14:46:57',NULL,'sent',NULL,2,9,'2023-05-30 14:47:06'),(82,'2023-05-30 16:36:13',NULL,'sent',NULL,2,9,'2023-05-30 16:36:47'),(83,'2023-05-30 19:50:04',NULL,'sent',NULL,2,12,'2023-05-30 19:50:13'),(84,'2023-05-30 19:50:30',NULL,'sent',NULL,2,12,'2023-05-30 20:29:55'),(85,'2023-05-30 19:50:39',NULL,'sent',NULL,2,10,'2023-05-30 19:50:55'),(86,'2023-05-30 20:37:39',NULL,'sent',NULL,2,9,'2023-05-31 09:17:47'),(87,'2023-05-31 09:23:10',NULL,'picked',NULL,2,11,'2023-05-31 09:23:20');
/*!40000 ALTER TABLE `sale_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_orders_product`
--

DROP TABLE IF EXISTS `sale_orders_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_orders_product` (
  `order_product_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`order_product_id`),
  UNIQUE KEY `order_product_id_UNIQUE` (`order_product_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `order_id_idx` (`order_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `sale_orders` (`order_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_orders_product`
--

LOCK TABLES `sale_orders_product` WRITE;
/*!40000 ALTER TABLE `sale_orders_product` DISABLE KEYS */;
INSERT INTO `sale_orders_product` VALUES (71,4,75,0),(72,4,76,2),(73,4,77,4),(74,7,78,2),(75,6,78,4),(76,3,79,0),(77,2,79,5),(78,2,80,50),(79,1,80,80),(80,6,81,26),(81,1,82,8),(82,2,82,5),(83,3,82,40),(84,2,83,2),(85,5,83,6),(86,10,83,4),(87,4,84,4),(88,7,84,3),(89,5,85,2),(90,5,86,4),(91,4,86,0),(92,6,87,0),(93,3,87,2);
/*!40000 ALTER TABLE `sale_orders_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `rep` varchar(45) DEFAULT NULL,
  `contact_phone` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `eircode` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`),
  UNIQUE KEY `supplier_id_UNIQUE` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'JML supplies','Alan Dente','096325222','Balamory','T87HD82','ALD@JML.com'),(2,'B&M ','Richard Hunter','09434123643','Unit 4, Clara industrial estate','R34ID89','dick@bandm.com'),(3,'4Aces','Don Key','089245236','Tougher, Naas','P23HK25','Don@4aces.com');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-01 11:01:09
