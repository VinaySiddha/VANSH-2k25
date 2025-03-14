-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2025 at 10:22 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- Ensure consistent character encoding
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

--
-- Database: `event_registration`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `collegename` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `phonenumber` varchar(20) NOT NULL UNIQUE,
  `events` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `utrid` varchar(255) NOT NULL,
  `acknowledgment_id` varchar(50) DEFAULT NULL,
  `registration_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `collegename`, `email`, `phonenumber`, `events`, `total_amount`, `utrid`, `acknowledgment_id`, `registration_date`) VALUES
(2, 'YashwanthReddy', 'VGNT', 'yashwanthreddykoppula@gmail.com', '7780580764', 'V\'HACK 2k25', '0.00', '543991744440', 'vansh-vits@000002', '2025-03-14 09:16:54'),
(4, 'Pranav', 'Vignan Institute of Technology and Science', 'pranavbairy2@gmail.com', '9100026483', 'VHACK2k25', '300.00', '032639851952', 'vansh-vits@000004', '2025-03-14 09:28:16'),
(6, 'M_Jatin_Reddy', 'Vignan Institute of Technology and Science', 'jatinmungala195@gmail.com', '6303792869', 'VHACK2k25', '300.00', '254285965568', 'vansh-vits@000006', '2025-03-14 09:31:36'),
(15, 'MANEESHAREDDY123_', 'Vignan Institute of Technology and Science', 'dillimaneeshareddy215@gmail.com', '9100394563', 'MEHANDI', '50.00', '507398265394', 'vansh-vits@000015', '2025-03-14 09:43:46'),
(17, 'SaiTeja', 'Vignan Institute of Technology and Science', '22891a0533saiteja@gmail.com', '7013216952', 'VHACK2k25', '300.00', '101456513393', 'vansh-vits@000017', '2025-03-14 10:10:52'),
(18, 'SRILEKHA_123', 'Vignan Institute of Technology and Science', 'akulasrilekha08@gmail.com', '9381754093', 'RANGOLI', '200.00', '507301276928', 'vansh-vits@000018', '2025-03-14 10:16:58'),
(33, 'Akulalatha_08', 'Vignan Institute of Technology and Science', 'akulasrilekha08@gmail.com', '7989194622', 'MEHANDI', '50.00', '380511765491', 'vansh-vits@000033', '2025-03-14 11:07:11'),
(34, 'Chandrika', 'Vignan Institute of Technology and Science', 'chandrikasruthimanepalli@gmail.com', '9381616343', 'VHACK2k25', '300.00', '157388735819', 'vansh-vits@000034', '2025-03-14 11:51:03'),
(48, 'Chandankumar', 'Vignan Institute of Technology and Science', 'chandankumarpenukuduru1@gmail.com', '9908426843', 'CAD_DESIGNING', '100.00', '543901966856', 'vansh-vits@000048', '2025-03-14 12:46:56'),
(70, 'Adithya', 'AAA', 'a@gmail.com', '9000160281', 'CODERS', '100.00', '1222222222ssss', 'vansh-vits@000070', '2025-03-14 13:04:28'),
(76, 'Jayakrishna', 'Vignan Institute of Technology and Science', 'pillanagrovi.jayakrishna@gmail.com', '9182631885', 'CODERS', '100.00', '507303953804', 'vansh-vits@000076', '2025-03-14 13:21:10'),
(81, 'SaiDeepak', 'Vignan Institute of Technology and Science', 'kasulasaideepak@gmail.com', '6303866868', 'MR_MS_CODING', '100.00', '469295607753', 'vansh-vits@000081', '2025-03-14 13:42:24'),
(84, 'VijayChandra123', 'Vignan Institute of Technology and Science', '22891a6762vijaychandra@gmail.com', '7801013004', 'VHACK2k25', '300.00', '743629634195', 'vansh-vits@000084', '2025-03-14 14:13:56');

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

COMMIT;
