-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Okt 2020 pada 17.16
-- Versi server: 10.4.13-MariaDB
-- Versi PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jwdrive`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `billingplan`
--

CREATE TABLE `billingplan` (
  `id` int(5) NOT NULL,
  `name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `billingplan`
--

INSERT INTO `billingplan` (`id`, `name`) VALUES
(1, 'FREE'),
(2, 'MONTHLY'),
(3, 'YEARLY');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customers`
--

CREATE TABLE `customers` (
  `id` int(5) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `active`) VALUES
(1, 'Ade', 'ade@gmail.com', 1),
(2, 'Ade P', 'ade@gmail.com', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `memberships`
--

CREATE TABLE `memberships` (
  `id` int(10) NOT NULL,
  `userId` int(10) NOT NULL,
  `expiredDate` varchar(50) NOT NULL,
  `billingPlanId` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktur dari tabel `movies`
--

CREATE TABLE `movies` (
  `id` int(5) NOT NULL,
  `md5` varchar(25) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `driveId` text NOT NULL,
  `backupDriveId` text NOT NULL,
  `subtitles` text NOT NULL,
  `userId` int(5) NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `updatedAt` varchar(25) NOT NULL,
  `views` int(10) NOT NULL,
  `showDownload` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `movies`
--

INSERT INTO `movies` (`id`, `md5`, `title`, `driveId`, `backupDriveId`, `subtitles`, `userId`, `createdAt`, `updatedAt`, `views`, `showDownload`) VALUES
(46, 'd9d4f495e875a2e075a1a4a6e', 'Itaewon Class S1 E16', '1ce0SmkB7xAuJKm4NWsIXhntZ58Ck5C72', '1ce0SmkB7xAuJKm4NWsIXhntZ58Ck5C72', '[{\"label\":\"Indonesia\",\"src\":\"https://subscene.com/test\"}]', 9, '2020-08-19T03:59:24+07:00', '2020-08-19T03:59:24+07:00', 0, 0),
(48, '642e92efb79421734881b53e1', 'Itaewon Class S1 E16', '1ce0SmkB7xAuJKm4NWsIXhntZ58Ck5C72', '', '[{\"label\":\"Indonesia\",\"src\":\"https://subscene.com/test\"}]', 9, '2020-08-19T04:35:21+07:00', '2020-08-19T04:35:21+07:00', 0, 0),
(85, '3ef815416f775098fe9770040', 'Ganti Judul', '1A5hODt751_BMtsYCxvn7TiUXtUtBOKG5', '1u8oN7nAtbFwkTTgWLDb970FzWGq7vk3R', '[{\"label\":\"ID\",\"src\":\"http://localhost:3001/subtitle/upload/1600675786_Mulan.2020.WEB-DL.WEBRip.HDRip.1080p.720p.480p.WWW.IDFL.INFO.srt\"}]', 8, '2020-09-21T17:10:26+07:00', '2020-09-25T02:19:11+07:00', 0, 1),
(86, '93db85ed909c13838ff95ccfa', 'Dummy rabbit', '1CU3cq61J7A43naya0X0DUfTDsQkc-6Mg', '1-e3dxuhn3Gm6lQdWK08YVPPe6msuWzEU', '[{\"label\":\"ID\",\"src\":\"http://localhost:3001/subtitle/upload/Mulan.2020.WEB-DL.WEBRip.HDRip.1080p.720p.480p.WWW.IDFL.INFO.srt\"}]', 8, '2020-09-25T01:35:01+07:00', '2020-09-25T01:35:01+07:00', 0, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` set('admin','user') NOT NULL,
  `createdAt` varchar(25) NOT NULL,
  `updatedAt` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(8, 'ade@gmail.com', 'Ade', '$2b$10$6DblaNeBWkk3D1QtzqcM0eB75pBJvGuNjKT9WqVCqWLE/WJuJugJW', 'user', '2020-08-18T04:25:46+07:00', '2020-08-18T04:25:46+07:00'),
(9, 'admin@admin.com', 'Adeee', '$2b$10$6DblaNeBWkk3D1QtzqcM0eB75pBJvGuNjKT9WqVCqWLE/WJuJugJW', 'admin', '2020-08-18T04:25:57+07:00', '2020-08-18T04:44:08+07:00');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `billingplan`
--
ALTER TABLE `billingplan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `memberships`
--
ALTER TABLE `memberships`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `md5` (`md5`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `billingplan`
--
ALTER TABLE `billingplan`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `memberships`
--
ALTER TABLE `memberships`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
