-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: kontekstualkopi
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `updatedAt` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (8,'admin','081234567890','admin','$2b$10$MQbw6uIwTagX.7uO6sSUluM9ICdQaghA34SEhcGGDpLyV06a9UK6i','','');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banks`
--

DROP TABLE IF EXISTS `banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accountName` varchar(25) NOT NULL,
  `bankName` varchar(25) NOT NULL,
  `bankNumber` varchar(25) NOT NULL,
  `bankCode` varchar(5) NOT NULL,
  `bankIcon` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banks`
--

LOCK TABLES `banks` WRITE;
/*!40000 ALTER TABLE `banks` DISABLE KEYS */;
INSERT INTO `banks` VALUES (1,'Nyokro Hidayat','BRI','137701004348537','002','https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BRI-512.png');
/*!40000 ALTER TABLE `banks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `updatedAt` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (3,'MACHINE','2021-05-08T10:15:27+07:00','2021-05-08T10:15:27+07:00');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` varchar(10) NOT NULL,
  `products` text NOT NULL,
  `courier` varchar(5) NOT NULL,
  `customerName` varchar(25) NOT NULL,
  `customerPhone` int NOT NULL,
  `customerCity` varchar(25) NOT NULL,
  `customerSubdistrict` varchar(25) NOT NULL,
  `customerSubdistrictId` varchar(5) NOT NULL,
  `customerAddress` longtext NOT NULL,
  `customerNote` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `noResi` varchar(25) NOT NULL,
  `status` varchar(25) NOT NULL,
  `paymentBankId` int NOT NULL,
  `paymentProof` text NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `updatedAt` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('K613KPI10','[{\"productId\":11,\"variantId\":0,\"quantity\":2},{\"productId\":11,\"variantId\":1,\"quantity\":1}]','jne','Ade Prasetyo',2147483647,'Banyumas','Banyumas','574','Berkoh','',27910000,'','review',2,'/uploads/image-from-rawpixel-id-2230133-png.png','2021-06-10T04:28:35+07:00','2021-06-10T04:28:35+07:00'),('K714KPI21','[{\"productId\":11,\"variantId\":0,\"quantity\":1}]','jne','Ade Prasetyo',2147483647,'Banyumas','Banyumas','574','Berkoh','gaslur',8210000,'','waiting',2,'','2021-06-11T19:41:03+07:00','2021-06-11T19:41:03+07:00'),('K815KPI32','[{\"productId\":11,\"variantId\":0,\"quantity\":1}]','jne','Ade Prasetyo',2147483647,'Banyumas','Banyumas','574','Berkoh','aawawaw',8210000,'','waiting',2,'','2021-06-11T19:52:51+07:00','2021-06-11T19:52:51+07:00'),('K916KPI43','[{\"productId\":11,\"variantId\":0,\"quantity\":5}]','jne','Ade Prasetyo',2147483647,'Banyumas','Banyumas','574','Berkoh','utang olih',40210000,'','waiting',2,'','2021-06-11T21:06:13+07:00','2021-06-11T21:06:13+07:00');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(50) NOT NULL,
  `variants` longtext NOT NULL,
  `name` varchar(25) NOT NULL,
  `categoryId` int NOT NULL,
  `description` text NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `updatedAt` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (18,'mesin-roasting-portable-seri-not-250','[{\"id\":0,\"name\":\"BIRU\",\"weight\":\"10000\",\"price\":\"8000000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/1b05969a8e5a897413392891e0e52950-250gr2.jpg\",\"files\":{}},{\"id\":1,\"name\":\"HIJAU\",\"weight\":\"10000\",\"price\":\"8000000\",\"discount\":\"0\",\"stock\":0,\"files\":{},\"img\":\"/uploads/54cde578cc54f56539cb70ec09bdb917-250gr3.jpg\"}]','Mesin Roasting Portable S',3,'Mesin berukuran kompak dan ringan, dengan konsep yang menyerupai mesin roasting manual skala besar. Fleksibel dioperasikan dengan menggunakan gas kaleng atau tabung LPG 3-12kg. Kontrol yang mudah dengan fitur pengaturan api, pengaturan air flow, dan display digital yang menunjukkan suhu bean dalam drum selama proses roasting.\nKeseluruhan ruang sangrai (drum, faceplate dan pintu drum) dari bahan stainless steel 304, sehingga higienis dan mudah perawatannya. Desain pintu drum yang dilengkapi jendela kaca borosilikat untuk memantau perubahan warna biji kopi, juga dilengkapi kipas pendingin untuk mempercepat proses pendinginan biji kopi kurang dari 3 menit. Konsumsi listrik yang hemat hanya 35 watt, dengan motor drum yang sudah dilengkapi safety coupling sebagai pengaman.\nKonstruksi mesin yang kokoh, handal, dan konsisten sehingga dapat digunakan sebagai sample \nroaster.Spesifikasi \nKapasitas maks: 120 gr\nMaterial drum: Solid stainless steel 304, tebal 2 mm.\nKecepatan drum: 50 RPM dengan fitur pengaman – safety coupling\nTegangan: 220V / 50 Hz\nDaya: 35 Watt\n','2021-07-20T03:18:14+07:00','2021-07-20T03:18:14+07:00'),(19,'mesin-roasting-seri-not-01','[{\"id\":0,\"name\":\"NOT01\",\"weight\":\"40000\",\"price\":\"15000000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/d30555aceb979504ea5eb46b78d6fd88-1kg1.jpg\",\"files\":{}}]','Mesin Roasting Seri NOT 0',3,'**Paket ini tidak termasuk Cooling Table/Meja Pendingin\n\nKelebihan utama mesin W600i SE :\n1. Isolasi panas yang lebih bagus sehingga panas lebih maksimal.\n2. Tombol on/off yg dilengkapi pemantik elektrik.\n3. Bahan drum stainless dan perforated sehingga hasil lebih merata dan kopi tidak mudah gosong (walaupun drum berlubang tapi api tidak akan mengenai kopinya).\n4. Dinamo yg lebih bertenaga dan lebih silent.\n5. Kontrol airflow lebih leluasa.\n6. Tempat penampungan kotoran dan asap terpisah.\n7. Tempat penampung chaff/kulit ari.\n8. Hopper yang lebih lega dan praktis.\n9. Pernah mati lampu? Tenang, masih bisa lanjut!!!\n10. Sistem pendinginan yang lebih powerful. Mendinginkan kopi dalam waktu (tanda plus minus)2 menit.\n\nDengan segala kelebihan yang kita sempurnakan akan membuat produksi kopi anda terjamin.\n\nSpesifikasi :\nModel : NOT 01\nDrum capacity : 1kg (Max. 1,2kg)/batch.\nType : Semi Direct Roast\nHeat Resource : GAS (LPG)\nElectric Lighter : Yes\nWarming Time : 10 Minute\nRoasting Time :10 – 20 Minute\nDrum Thermometer : Yes (analog)\nBean Thermometer : Yes (analog)\nWeight : 40 kg\nCooling bin : No\nRoast Drum : Stainless Stell\nOutside drum : Double Jacket with heat resistant layer.\nAirflow Controller : Panjang : 38 cm & Diameter : 13 cm\nPower : 12v, 3A\nDimensi (LxWxH) : 81 cm x 33 cm x 71 cm\nMastech MS6514 : No\nDrum Dinamo Electricity : 25 W / 220 V\nAirflow Electricity : 30 W / 12 V (DC)\n','2021-07-20T03:20:30+07:00','2021-07-20T03:20:30+07:00'),(20,'natural-banjar-arabica-roast-bean','[{\"id\":0,\"name\":\"ARABICA\",\"weight\":\"250\",\"price\":\"90000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/80c5c9a770a81c75ecf51802fa5fc321-NATURALBANJAR.jpg\",\"files\":{}}]','Natural Banjar Arabica Ro',3,'Natural Banjars\n\nRegion:\nBanjar Negara, Sarwodadi\n\nVarietal:\nArabica\n\nElevation:\n900 – 1200m ASL\n\nProcess:\nNatural\n','2021-07-20T03:23:09+07:00','2021-07-20T03:23:09+07:00'),(21,'full-wash-banjar-arabica-roast-bean','[{\"id\":0,\"name\":\"FWBANJAR\",\"weight\":\"250\",\"price\":\"80000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/82e6fd0050a6c6d158c577bad33df991-FULLWASHBANJAR.jpg\",\"files\":{}}]','Full Wash Banjar Arabica ',3,'Fw Banjar\n\nRegion:\nBanjar Negara, Sarwodadi\n\nVarietal:\nArabica\n\nElevation:\n900 – 1200m ASL\n\nProcess:\nFull Wash\n','2021-07-20T03:24:14+07:00','2021-07-20T03:24:14+07:00'),(22,'honey-banjar-arabica-roast-bean','[{\"id\":0,\"name\":\"HONEYBANJAR\",\"weight\":\"250\",\"price\":\"85000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/8c6058ced3bbca9d601e4dbbb8798df4-HONEYBANJAR.jpg\",\"files\":{}}]','Honey Banjar Arabica Roas',3,'Honey Banjar\n\nRegion:\nBanjar Negara, Sarwodadi\n\nVarietal:\nArabica\n\nElevation:\n900 – 1200m ASL\n\nProcess:\nHoney\n','2021-07-20T03:25:00+07:00','2021-07-20T03:25:00+07:00'),(23,'gayo-knawat-manis-madu-arabica-roast-bean','[{\"id\":0,\"name\":\"ARABICA\",\"weight\":\"250\",\"price\":\"115000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/194fa7897641ee66d2ec7fa98ffb3b8a-gayo.jpg\",\"files\":{}}]','Gayo Knawat Manis Madu Ar',3,'Gayo Knawat Manis Madu\n\nRegion:\nAceh, Gayo, Kampung knawat\n\nVarietal:\nArabica\n\nElevation:\n1200m ASL\n\nProcess:\nBlack Honey\n','2021-07-20T03:25:59+07:00','2021-07-20T03:25:59+07:00'),(24,'halu-banana-arabica-roast-bean','[{\"id\":0,\"name\":\"ARABICA\",\"weight\":\"250\",\"price\":\"110000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/3d79e398e2e0b05b31b8d3ff0c275b32-halubanana.jpg\",\"files\":{}}]','Halu Banana Arabica Roast',3,'Halu Banana\n\nRegion:\nGunung Halu, Jawa Barat\n\nVarietal:\nArabica\n\nElevation:\n1200m ASL\n\nProcess:\nRed Honey\n','2021-07-20T03:26:49+07:00','2021-07-20T03:26:49+07:00'),(25,'malabar-arabica-roast-bean','[{\"id\":0,\"name\":\"MALABAR\",\"weight\":\"250\",\"price\":\"120000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/0d0f5ebfbd9dcb97d61540bc63a0dddd-malabar.jpg\",\"files\":{}}]','Malabar Arabica Roast Bea',3,'Malabar\n\nRegion:\nJava Preanger\n\nVarietal:\nArabica\n\nElevation:\n900 – 100m ASL\n\nProcess:\nNatural\n','2021-07-20T03:27:36+07:00','2021-07-20T03:27:36+07:00'),(26,'robusta-roast-bean','[{\"id\":0,\"name\":\"1KG\",\"weight\":\"1000\",\"price\":\"100000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/f6b12231167099ed266d437e9b1c0120-robusta.jpg\",\"files\":{}}]','Robusta Roast Bean',3,'Robusta Roast Bean\nPurbalingga 1kg\n\nRegion:\nCandiwulan, Kutasari, Purbalingga\n\nVarietal:\nRobusta\n\nElevation:\n500- 700m ASL\n\nProcess:\nNatural\n','2021-07-20T03:28:29+07:00','2021-07-20T03:28:29+07:00');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'kontekstualkopi'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-30  0:38:42
