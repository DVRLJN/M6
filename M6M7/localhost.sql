-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 11-01-2023 a las 17:23:00
-- Versión del servidor: 5.7.34
-- Versión de PHP: 8.0.8

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: "m6m7"
--
CREATE DATABASE IF NOT EXISTS "m6m7" DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE "m6m7";

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla "images"
--

CREATE TABLE "images" (
  "idImage" int(11) NOT NULL,
  "imagen" varchar(100) NOT NULL,
  "idProduct" int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla "images"
--

INSERT INTO "images" ("idImage", "imagen", "idProduct") VALUES
(33, 'uploads/timberland_226547_A27QD_20200730T160459_01.jpg', 10),
(34, 'uploads/timberland_226547_A27QD_20200730T160501_02.jpg', 10),
(35, 'uploads/timberland_226547_A27QD_20200730T160504_03.jpg', 10),
(36, 'uploads/timberland_226547_A27QD_20200730T160506_04.jpg', 10),
(53, 'uploads/adidas_geezy.jpg', 15),
(54, 'uploads/adidas_geezy1.jpg', 15),
(55, 'uploads/adidas_geezy2.jpg', 15),
(56, 'uploads/adidas_geezy3.jpg', 15),
(57, 'uploads/air-jordan-1-university-blue-release-info-01.jpg', 16),
(58, 'uploads/air-jordan-1-university-blue-release-info-02.jpg', 16),
(59, 'uploads/air-jordan-1-university-blue-release-info-03.jpg', 16),
(60, 'uploads/air-jordan-1-university-blue-release-info-01.jpg', 16),
(61, 'uploads/realflexgreyorange.jpg', 17),
(62, 'uploads/realflexgreyorange4.jpg', 17),
(63, 'uploads/realflexgreyorange6.jpg', 17),
(64, 'uploads/realflexgreyorange7.jpg', 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla "localizacion"
--

CREATE TABLE "localizacion" (
  "id" int(11) NOT NULL,
  "idProduct" int(11) NOT NULL,
  "latitude" float NOT NULL,
  "longitude" float NOT NULL,
  "calle" varchar(50) NOT NULL,
  "numCalle" int(11) NOT NULL,
  "cp" int(11) NOT NULL,
  "ciudad" varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla "localizacion"
--

INSERT INTO "localizacion" ("id", "idProduct", "latitude", "longitude", "calle", "numCalle", "cp", "ciudad") VALUES
(10, 10, 41.3753, 2.16438, 'Av. del Paral·lel', 106, 8015, 'Barcelona'),
(13, 15, 41.4162, 2.2121, 'C/ de Cristóbal de Moura', 217, 8019, 'Barcelona'),
(14, 16, 41.405, 2.19246, 'Avinguda Diagonal', 200, 8018, 'Barcelona'),
(15, 17, 41.4162, 2.2121, 'C/ de Cristóbal de Moura', 217, 8019, 'Barcelona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla "product"
--

CREATE TABLE "product" (
  "IdProduct" int(11) NOT NULL,
  "nombre" varchar(100) NOT NULL,
  "precio" float NOT NULL,
  "descripcion" varchar(300) NOT NULL,
  "categoria" varchar(10) NOT NULL,
  "subCategoria" varchar(10) NOT NULL,
  "IdUser" int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla "product"
--

INSERT INTO "product" ("IdProduct", "nombre", "precio", "descripcion", "categoria", "subCategoria", "IdUser") VALUES
(10, 'Timberland - Brooklyn 6 Inch A27QD Wheat Nubuck ', 750, 'Edición Limitada', 'hombre', 'camisas', 33),
(15, 'Yeezy Gray', 800, 'Edición Limitada', 'hombre', 'camisas', 33),
(16, 'Air Jordan 1 University Blue Release', 800, 'Edición Limitada', 'hombre', 'camisas', 33),
(17, 'Real Flex Grey Orange', 900, 'Edición Limitada', 'hombre', 'camisas', 33);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla "users"
--

CREATE TABLE "users" (
  "IdUser" int(11) NOT NULL,
  "nombre" varchar(20) NOT NULL,
  "email" varchar(20) NOT NULL,
  "pass" varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla "users"
--

INSERT INTO "users" ("IdUser", "nombre", "email", "pass") VALUES
(33, 'Darlyn', 'darlyn@gmail.com', '$2y$10$IJhY2u29o.yzUNcpvBqKT.m0wyYJ6ZKFSaCPPZrIDWdg3sMWJgJg.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla "images"
--
ALTER TABLE "images"
  ADD PRIMARY KEY ("idImage"),
  ADD KEY "FK_IdProduct" ("idProduct");

--
-- Indices de la tabla "localizacion"
--
ALTER TABLE "localizacion"
  ADD PRIMARY KEY ("id"),
  ADD KEY "idLoc_FK_idProduct" ("idProduct");

--
-- Indices de la tabla "product"
--
ALTER TABLE "product"
  ADD PRIMARY KEY ("IdProduct"),
  ADD KEY "FK_IdUser" ("IdUser");

--
-- Indices de la tabla "users"
--
ALTER TABLE "users"
  ADD PRIMARY KEY ("IdUser");

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla "images"
--
ALTER TABLE "images"
  MODIFY "idImage" int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla "localizacion"
--
ALTER TABLE "localizacion"
  MODIFY "id" int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla "product"
--
ALTER TABLE "product"
  MODIFY "IdProduct" int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla "users"
--
ALTER TABLE "users"
  MODIFY "IdUser" int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla "images"
--
ALTER TABLE "images"
  ADD CONSTRAINT "FK_IdProduct" FOREIGN KEY ("idProduct") REFERENCES "product" ("IdProduct");

--
-- Filtros para la tabla "localizacion"
--
ALTER TABLE "localizacion"
  ADD CONSTRAINT "idLoc_FK_idProduct" FOREIGN KEY ("idProduct") REFERENCES "product" ("IdProduct");
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
