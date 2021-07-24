-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 20, 2021 at 12:31 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kontekstualkopi`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `updatedAt` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `phone`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(8, 'admin', '081234567890', 'admin', '$2b$10$MQbw6uIwTagX.7uO6sSUluM9ICdQaghA34SEhcGGDpLyV06a9UK6i', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` int(5) NOT NULL,
  `accountName` varchar(25) NOT NULL,
  `bankName` varchar(25) NOT NULL,
  `bankNumber` varchar(25) NOT NULL,
  `bankCode` varchar(5) NOT NULL,
  `bankIcon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `accountName`, `bankName`, `bankNumber`, `bankCode`, `bankIcon`) VALUES
(1, 'Ade Prasetyo', 'Mandiri', '123456789', '008', 'https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/Mandiri-512.png'),
(2, 'Ade Prasetyo', 'BNI', '1234567890', '009', 'https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BNI-512.png');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(10) NOT NULL,
  `name` varchar(25) NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `updatedAt` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(3, 'MACHINE', '2021-05-08T10:15:27+07:00', '2021-05-08T10:15:27+07:00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(10) NOT NULL,
  `products` text NOT NULL,
  `courier` varchar(5) NOT NULL,
  `customerName` varchar(25) NOT NULL,
  `customerPhone` int(25) NOT NULL,
  `customerCity` varchar(25) NOT NULL,
  `customerSubdistrict` varchar(25) NOT NULL,
  `customerSubdistrictId` varchar(5) NOT NULL,
  `customerAddress` longtext NOT NULL,
  `customerNote` varchar(100) NOT NULL,
  `price` int(25) NOT NULL,
  `noResi` varchar(25) NOT NULL,
  `status` varchar(25) NOT NULL,
  `paymentBankId` int(5) NOT NULL,
  `paymentProof` text NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `updatedAt` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `products`, `courier`, `customerName`, `customerPhone`, `customerCity`, `customerSubdistrict`, `customerSubdistrictId`, `customerAddress`, `customerNote`, `price`, `noResi`, `status`, `paymentBankId`, `paymentProof`, `createdAt`, `updatedAt`) VALUES
('K613KPI10', '[{\"productId\":11,\"variantId\":0,\"quantity\":2},{\"productId\":11,\"variantId\":1,\"quantity\":1}]', 'jne', 'Ade Prasetyo', 2147483647, 'Banyumas', 'Banyumas', '574', 'Berkoh', '', 27910000, '', 'review', 2, '/uploads/image-from-rawpixel-id-2230133-png.png', '2021-06-10T04:28:35+07:00', '2021-06-10T04:28:35+07:00'),
('K714KPI21', '[{\"productId\":11,\"variantId\":0,\"quantity\":1}]', 'jne', 'Ade Prasetyo', 2147483647, 'Banyumas', 'Banyumas', '574', 'Berkoh', 'gaslur', 8210000, '', 'waiting', 2, '', '2021-06-11T19:41:03+07:00', '2021-06-11T19:41:03+07:00'),
('K815KPI32', '[{\"productId\":11,\"variantId\":0,\"quantity\":1}]', 'jne', 'Ade Prasetyo', 2147483647, 'Banyumas', 'Banyumas', '574', 'Berkoh', 'aawawaw', 8210000, '', 'waiting', 2, '', '2021-06-11T19:52:51+07:00', '2021-06-11T19:52:51+07:00'),
('K916KPI43', '[{\"productId\":11,\"variantId\":0,\"quantity\":5}]', 'jne', 'Ade Prasetyo', 2147483647, 'Banyumas', 'Banyumas', '574', 'Berkoh', 'utang olih', 40210000, '', 'waiting', 2, '', '2021-06-11T21:06:13+07:00', '2021-06-11T21:06:13+07:00');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `variants` longtext NOT NULL,
  `name` varchar(25) NOT NULL,
  `categoryId` int(10) NOT NULL,
  `description` text NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `updatedAt` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `slug`, `variants`, `name`, `categoryId`, `description`, `createdAt`, `updatedAt`) VALUES
(18, 'mesin-roasting-potrable-seri-not-250', '[{\"id\":0,\"name\":\"BIRU\",\"weight\":\"10000\",\"price\":\"8000000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/1b05969a8e5a897413392891e0e52950-250gr2.jpg\",\"files\":{}},{\"id\":1,\"name\":\"HIJAU\",\"weight\":\"10000\",\"price\":\"8000000\",\"discount\":\"0\",\"stock\":0,\"files\":{},\"img\":\"/uploads/54cde578cc54f56539cb70ec09bdb917-250gr3.jpg\"}]', 'Mesin Roasting Potrable S', 3, 'Mesin berukuran kompak dan ringan, dengan konsep yang menyerupai mesin roasting manual skala besar. Fleksibel dioperasikan dengan menggunakan gas kaleng atau tabung LPG 3-12kg. Kontrol yang mudah dengan fitur pengaturan api, pengaturan air flow, dan display digital yang menunjukkan suhu bean dalam drum selama proses roasting.\nKeseluruhan ruang sangrai (drum, faceplate dan pintu drum) dari bahan stainless steel 304, sehingga higienis dan mudah perawatannya. Desain pintu drum yang dilengkapi jendela kaca borosilikat untuk memantau perubahan warna biji kopi, juga dilengkapi kipas pendingin untuk mempercepat proses pendinginan biji kopi kurang dari 3 menit. Konsumsi listrik yang hemat hanya 35 watt, dengan motor drum yang sudah dilengkapi safety coupling sebagai pengaman.\nKonstruksi mesin yang kokoh, handal, dan konsisten sehingga dapat digunakan sebagai sample \nroaster.Spesifikasi \nKapasitas maks: 120 gr\nMaterial drum: Solid stainless steel 304, tebal 2 mm.\nKecepatan drum: 50 RPM dengan fitur pengaman – safety coupling\nTegangan: 220V / 50 Hz\nDaya: 35 Watt\n', '2021-07-20T03:18:14+07:00', '2021-07-20T03:18:14+07:00'),
(19, 'mesin-roasting-seri-not-01', '[{\"id\":0,\"name\":\"NOT01\",\"weight\":\"40000\",\"price\":\"15000000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/d30555aceb979504ea5eb46b78d6fd88-1kg1.jpg\",\"files\":{}}]', 'Mesin Roasting Seri NOT 0', 3, '**Paket ini tidak termasuk Cooling Table/Meja Pendingin\n\nKelebihan utama mesin W600i SE :\n1. Isolasi panas yang lebih bagus sehingga panas lebih maksimal.\n2. Tombol on/off yg dilengkapi pemantik elektrik.\n3. Bahan drum stainless dan perforated sehingga hasil lebih merata dan kopi tidak mudah gosong (walaupun drum berlubang tapi api tidak akan mengenai kopinya).\n4. Dinamo yg lebih bertenaga dan lebih silent.\n5. Kontrol airflow lebih leluasa.\n6. Tempat penampungan kotoran dan asap terpisah.\n7. Tempat penampung chaff/kulit ari.\n8. Hopper yang lebih lega dan praktis.\n9. Pernah mati lampu? Tenang, masih bisa lanjut!!!\n10. Sistem pendinginan yang lebih powerful. Mendinginkan kopi dalam waktu (tanda plus minus)2 menit.\n\nDengan segala kelebihan yang kita sempurnakan akan membuat produksi kopi anda terjamin.\n\nSpesifikasi :\nModel : NOT 01\nDrum capacity : 1kg (Max. 1,2kg)/batch.\nType : Semi Direct Roast\nHeat Resource : GAS (LPG)\nElectric Lighter : Yes\nWarming Time : 10 Minute\nRoasting Time :10 – 20 Minute\nDrum Thermometer : Yes (analog)\nBean Thermometer : Yes (analog)\nWeight : 40 kg\nCooling bin : No\nRoast Drum : Stainless Stell\nOutside drum : Double Jacket with heat resistant layer.\nAirflow Controller : Panjang : 38 cm & Diameter : 13 cm\nPower : 12v, 3A\nDimensi (LxWxH) : 81 cm x 33 cm x 71 cm\nMastech MS6514 : No\nDrum Dinamo Electricity : 25 W / 220 V\nAirflow Electricity : 30 W / 12 V (DC)\n', '2021-07-20T03:20:30+07:00', '2021-07-20T03:20:30+07:00'),
(20, 'natural-banjar-arabica-roast-bean', '[{\"id\":0,\"name\":\"ARABICA\",\"weight\":\"250\",\"price\":\"90000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/80c5c9a770a81c75ecf51802fa5fc321-NATURALBANJAR.jpg\",\"files\":{}}]', 'Natural Banjar Arabica Ro', 3, 'Natural Banjars\n\nRegion:\nBanjar Negara, Sarwodadi\n\nVarietal:\nArabica\n\nElevation:\n900 – 1200m ASL\n\nProcess:\nNatural\n', '2021-07-20T03:23:09+07:00', '2021-07-20T03:23:09+07:00'),
(21, 'full-wash-banjar-arabica-roast-bean', '[{\"id\":0,\"name\":\"FWBANJAR\",\"weight\":\"250\",\"price\":\"80000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/82e6fd0050a6c6d158c577bad33df991-FULLWASHBANJAR.jpg\",\"files\":{}}]', 'Full Wash Banjar Arabica ', 3, 'Fw Banjar\n\nRegion:\nBanjar Negara, Sarwodadi\n\nVarietal:\nArabica\n\nElevation:\n900 – 1200m ASL\n\nProcess:\nFull Wash\n', '2021-07-20T03:24:14+07:00', '2021-07-20T03:24:14+07:00'),
(22, 'honey-banjar-arabica-roast-bean', '[{\"id\":0,\"name\":\"HONEYBANJAR\",\"weight\":\"250\",\"price\":\"85000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/8c6058ced3bbca9d601e4dbbb8798df4-HONEYBANJAR.jpg\",\"files\":{}}]', 'Honey Banjar Arabica Roas', 3, 'Honey Banjar\n\nRegion:\nBanjar Negara, Sarwodadi\n\nVarietal:\nArabica\n\nElevation:\n900 – 1200m ASL\n\nProcess:\nHoney\n', '2021-07-20T03:25:00+07:00', '2021-07-20T03:25:00+07:00'),
(23, 'gayo-knawat-manis-madu-arabica-roast-bean', '[{\"id\":0,\"name\":\"ARABICA\",\"weight\":\"250\",\"price\":\"115000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/194fa7897641ee66d2ec7fa98ffb3b8a-gayo.jpg\",\"files\":{}}]', 'Gayo Knawat Manis Madu Ar', 3, 'Gayo Knawat Manis Madu\n\nRegion:\nAceh, Gayo, Kampung knawat\n\nVarietal:\nArabica\n\nElevation:\n1200m ASL\n\nProcess:\nBlack Honey\n', '2021-07-20T03:25:59+07:00', '2021-07-20T03:25:59+07:00'),
(24, 'halu-banana-arabica-roast-bean', '[{\"id\":0,\"name\":\"ARABICA\",\"weight\":\"250\",\"price\":\"110000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/3d79e398e2e0b05b31b8d3ff0c275b32-halubanana.jpg\",\"files\":{}}]', 'Halu Banana Arabica Roast', 3, 'Halu Banana\n\nRegion:\nGunung Halu, Jawa Barat\n\nVarietal:\nArabica\n\nElevation:\n1200m ASL\n\nProcess:\nRed Honey\n', '2021-07-20T03:26:49+07:00', '2021-07-20T03:26:49+07:00'),
(25, 'malabar-arabica-roast-bean', '[{\"id\":0,\"name\":\"MALABAR\",\"weight\":\"250\",\"price\":\"120000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/0d0f5ebfbd9dcb97d61540bc63a0dddd-malabar.jpg\",\"files\":{}}]', 'Malabar Arabica Roast Bea', 3, 'Malabar\n\nRegion:\nJava Preanger\n\nVarietal:\nArabica\n\nElevation:\n900 – 100m ASL\n\nProcess:\nNatural\n', '2021-07-20T03:27:36+07:00', '2021-07-20T03:27:36+07:00'),
(26, 'robusta-roast-bean', '[{\"id\":0,\"name\":\"1KG\",\"weight\":\"1000\",\"price\":\"100000\",\"discount\":\"0\",\"stock\":0,\"img\":\"/uploads/f6b12231167099ed266d437e9b1c0120-robusta.jpg\",\"files\":{}}]', 'Robusta Roast Bean', 3, 'Robusta Roast Bean\nPurbalingga 1kg\n\nRegion:\nCandiwulan, Kutasari, Purbalingga\n\nVarietal:\nRobusta\n\nElevation:\n500- 700m ASL\n\nProcess:\nNatural\n', '2021-07-20T03:28:29+07:00', '2021-07-20T03:28:29+07:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
