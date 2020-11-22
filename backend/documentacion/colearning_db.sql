-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-11-2020 a las 01:30:01
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `colearning_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chats`
--

CREATE TABLE `chats` (
  `id_chat` int(11) NOT NULL,
  `id_usuarioOrigen` int(11) NOT NULL,
  `id_usuarioDestino` int(11) NOT NULL,
  `ultimoMensaje` text NOT NULL,
  `horaUltimoMensaje` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `chats`
--

INSERT INTO `chats` (`id_chat`, `id_usuarioOrigen`, `id_usuarioDestino`, `ultimoMensaje`, `horaUltimoMensaje`) VALUES
(1, 2, 1, 'hola', '15:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `id_clase` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `id_usuario` int(25) DEFAULT NULL,
  `id_domicilio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`id_clase`, `nombre`, `id_usuario`, `id_domicilio`) VALUES
(1, 'Matematicas', 1, 1),
(2, 'Lenguajes', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_comentario` int(11) NOT NULL,
  `des_comentario` varchar(250) NOT NULL,
  `id_usuarioDestino` int(30) NOT NULL,
  `id_usuarioOrigen` int(30) NOT NULL,
  `rating_comentario` int(11) NOT NULL,
  `fecha_alta` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id_comentario`, `des_comentario`, `id_usuarioDestino`, `id_usuarioOrigen`, `rating_comentario`, `fecha_alta`) VALUES
(1, 'Muy buen profesor.', 4, 1, 4, '05/10/2020'),
(2, 'Muy buen profesor, totalmente recomendado', 4, 5, 5, '08/10/2020');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursoporalumno`
--

CREATE TABLE `cursoporalumno` (
  `id_alumno` int(30) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `fechaDesde` varchar(50) NOT NULL,
  `fechaHasta` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursoporalumno`
--

INSERT INTO `cursoporalumno` (`id_alumno`, `id_curso`, `fechaDesde`, `fechaHasta`, `activo`) VALUES
(2, 1, '2022-03-08T03:00:00.000+00:00', '2020-09-25T03:00:00.000+00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id_curso` int(11) NOT NULL,
  `nombre_curso` varchar(50) NOT NULL,
  `id_instituto` int(11) NOT NULL,
  `src` varchar(250) NOT NULL,
  `id_domicilio` int(11) NOT NULL,
  `whatsApp` varchar(50) NOT NULL,
  `id_profesor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `nombre_curso`, `id_instituto`, `src`, `id_domicilio`, `whatsApp`, `id_profesor`) VALUES
(1, 'Matematicas Y Geometrias', 1, '', 1, '12122131', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursospordondedaclases`
--

CREATE TABLE `cursospordondedaclases` (
  `id_curso_fk` int(11) NOT NULL,
  `id_dondeDaClase_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursospordondedaclases`
--

INSERT INTO `cursospordondedaclases` (`id_curso_fk`, `id_dondeDaClase_fk`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursospormaterias`
--

CREATE TABLE `cursospormaterias` (
  `id_materia_fk` int(11) NOT NULL,
  `id_curso_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursospormaterias`
--

INSERT INTO `cursospormaterias` (`id_materia_fk`, `id_curso_fk`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursosportipoclases`
--

CREATE TABLE `cursosportipoclases` (
  `id_clase_fk` int(11) NOT NULL,
  `id_curso_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursosportipoclases`
--

INSERT INTO `cursosportipoclases` (`id_clase_fk`, `id_curso_fk`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `domicilio`
--

CREATE TABLE `domicilio` (
  `id_domicilio` int(11) NOT NULL,
  `calle` varchar(150) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `localidad` varchar(150) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `des_domicilio` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `domicilio`
--

INSERT INTO `domicilio` (`id_domicilio`, `calle`, `numero`, `localidad`, `latitude`, `longitude`, `des_domicilio`) VALUES
(1, 'Alsina', '1000', 'CABA', -34.882385, -58.558372, 'Alsina 1000 CABA'),
(2, 'Solis', '1400', 'CABA', -34.882385, -58.558372, 'Solis 1400 CABA'),
(3, 'Néstor Kichner', '5610', 'Tristan Suarez', -34.882385, -58.558372, 'Néstor Kichner 5610, Tristán Suárez, Provincia de Buenos Aires'),
(4, 'Mariano Castex', '711', 'Canning', -34.852584, -58.503887, 'Mariano Castex 711, Canning, Provincia de Buenos Aires'),
(6, 'Los Chañares', '974-868', 'La Union', -34.879777, -58.538946, 'Los Chañares 974-868, La Union, Provincia de Buenos Aires');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dondedaclases`
--

CREATE TABLE `dondedaclases` (
  `id_dondeClases` int(11) NOT NULL,
  `des_dondeClases` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dondedaclases`
--

INSERT INTO `dondedaclases` (`id_dondeClases`, `des_dondeClases`) VALUES
(1, 'En su casa'),
(2, 'A Domicilio'),
(3, 'En Instituto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dondedaclasesporprofesor`
--

CREATE TABLE `dondedaclasesporprofesor` (
  `id_dondeDaClases_fk` int(11) NOT NULL,
  `id_usuario_fk` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dondedaclasesporprofesor`
--

INSERT INTO `dondedaclasesporprofesor` (`id_dondeDaClases_fk`, `id_usuario_fk`) VALUES
(1, 1),
(1, 4),
(1, 6),
(2, 2),
(2, 4),
(2, 6),
(3, 2),
(3, 3),
(3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `salary` decimal(11,2) UNSIGNED DEFAULT 0.00,
  `status` tinyint(3) UNSIGNED DEFAULT 0,
  `is_deleted` tinyint(3) UNSIGNED DEFAULT 0,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `email`, `phone`, `organization`, `designation`, `salary`, `status`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Alejandro', 'Foglino', 'alefoglino@gasd.com', '1111111', 'BH', 'BH', '12.00', 1, 1, '2020-09-01 00:00:00', '2020-09-01 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foro`
--

CREATE TABLE `foro` (
  `id_foro` int(11) NOT NULL,
  `id_usuario_fk` int(50) NOT NULL,
  `nombre_foro` varchar(50) NOT NULL,
  `pregunta` varchar(150) NOT NULL,
  `esProfesor` tinyint(1) NOT NULL,
  `respuestasCant` varchar(10) NOT NULL,
  `fecha_alta` varchar(50) NOT NULL,
  `resuelto` tinyint(1) NOT NULL,
  `esAnonimo` double NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `foro`
--

INSERT INTO `foro` (`id_foro`, `id_usuario_fk`, `nombre_foro`, `pregunta`, `esProfesor`, `respuestasCant`, `fecha_alta`, `resuelto`, `esAnonimo`, `descripcion`) VALUES
(1, 1, 'Duda Existencial', 'Cuáles son los trucos más sencillos para andar en skate?', 1, '114', '05/12/2019', 1, 1, ''),
(2, 4, 'Tenis', 'Quien es el más ganador de grand slams de la historia?', 1, '45', '24/06/2020', 0, 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foroportag`
--

CREATE TABLE `foroportag` (
  `id_foro_fk` int(11) NOT NULL,
  `id_tag_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `foroportag`
--

INSERT INTO `foroportag` (`id_foro_fk`, `id_tag_fk`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horariosdelprofesor`
--

CREATE TABLE `horariosdelprofesor` (
  `id_usuario_fk` int(11) NOT NULL,
  `dia` int(11) NOT NULL,
  `turno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horariosdelprofesor`
--

INSERT INTO `horariosdelprofesor` (`id_usuario_fk`, `dia`, `turno`) VALUES
(4, 0, 0),
(4, 3, 0),
(4, 5, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instituoporprofesores`
--

CREATE TABLE `instituoporprofesores` (
  `id_instituto_fk` int(11) NOT NULL,
  `id_usuario_fk` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `instituoporprofesores`
--

INSERT INTO `instituoporprofesores` (`id_instituto_fk`, `id_usuario_fk`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instituto`
--

CREATE TABLE `instituto` (
  `id_instituto` int(11) NOT NULL,
  `nombre_instituto` varchar(150) NOT NULL,
  `src` varchar(250) NOT NULL,
  `whatsApp` varchar(50) NOT NULL,
  `idDireccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `instituto`
--

INSERT INTO `instituto` (`id_instituto`, `nombre_instituto`, `src`, `whatsApp`, `idDireccion`) VALUES
(1, 'Leila', '', '12122131', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `id_materia` int(11) NOT NULL,
  `nombre_materia` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id_materia`, `nombre_materia`) VALUES
(1, 'Lengua'),
(2, 'Matematica'),
(4, 'React Native'),
(5, 'Física'),
(6, 'Química'),
(7, 'Tenis'),
(8, 'Danza'),
(9, 'Historia'),
(10, 'Ping Pong'),
(11, 'Programación'),
(12, 'Arte'),
(13, 'Guitarra'),
(14, 'Violín'),
(15, 'Canto'),
(16, 'Oratoria'),
(17, 'Actuación');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiaporprofesor`
--

CREATE TABLE `materiaporprofesor` (
  `id_materia_fk` int(11) NOT NULL,
  `id_usuario_fk` int(50) NOT NULL,
  `des_materia` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `materiaporprofesor`
--

INSERT INTO `materiaporprofesor` (`id_materia_fk`, `id_usuario_fk`, `des_materia`) VALUES
(1, 1, 'Clases de Lengua particulares y grupales para nivel secundario y primario'),
(1, 2, 'Clases de Lengua de Primaria'),
(2, 3, ''),
(2, 4, 'Secundario y Primario'),
(2, 6, 'Clases de Lengua Secundaria'),
(5, 3, ''),
(12, 6, ''),
(15, 2, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moneda`
--

CREATE TABLE `moneda` (
  `id_moneda` int(11) NOT NULL,
  `des_moneda` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `moneda`
--

INSERT INTO `moneda` (`id_moneda`, `des_moneda`) VALUES
(1, '$'),
(2, 'US$'),
(3, '€');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesorporclase`
--

CREATE TABLE `profesorporclase` (
  `id_clase_fk` int(11) NOT NULL,
  `id_usuario_fk` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `profesorporclase`
--

INSERT INTO `profesorporclase` (`id_clase_fk`, `id_usuario_fk`) VALUES
(1, 1),
(2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rating`
--

CREATE TABLE `rating` (
  `id_rating` int(11) NOT NULL,
  `votos` int(15) NOT NULL,
  `rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rating`
--

INSERT INTO `rating` (`id_rating`, `votos`, `rating`) VALUES
(1, 56, 3.8),
(2, 40, 4),
(3, 67, 5),
(4, 180, 2),
(6, 1538, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `id_respuesta` int(11) NOT NULL,
  `id_foro_fk` int(11) NOT NULL,
  `id_usuario_fk` int(11) NOT NULL,
  `nombre_respuesta` varchar(100) NOT NULL,
  `des_respuesta` varchar(150) NOT NULL,
  `esMejorRespuesta` tinyint(1) NOT NULL,
  `votos` int(11) NOT NULL,
  `fecha_alta` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`id_respuesta`, `id_foro_fk`, `id_usuario_fk`, `nombre_respuesta`, `des_respuesta`, `esMejorRespuesta`, `votos`, `fecha_alta`) VALUES
(1, 1, 2, 'El saber', 'Ley de la relatividad', 1, 56, '2020-10-01'),
(2, 2, 6, 'Roger el N1, Obvio', 'Ganó tantos que no los puedo poner aca', 0, 50, '22/09/2020');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestaforo`
--

CREATE TABLE `respuestaforo` (
  `id_respuestaForo` int(11) NOT NULL,
  `id_usuario_fk` int(11) NOT NULL,
  `res_buenas` int(11) NOT NULL,
  `res_mejores` int(11) NOT NULL,
  `res_cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `respuestaforo`
--

INSERT INTO `respuestaforo` (`id_respuestaForo`, `id_usuario_fk`, `res_buenas`, `res_mejores`, `res_cantidad`) VALUES
(1, 4, 100, 54, 150),
(2, 1, 100, 54, 150);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tag`
--

CREATE TABLE `tag` (
  `id_tag` int(11) NOT NULL,
  `nombre_tag` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tag`
--

INSERT INTO `tag` (`id_tag`, `nombre_tag`) VALUES
(1, 'React Native'),
(2, 'Java'),
(3, '.Net'),
(4, 'Musica'),
(5, 'Deportes'),
(6, 'Guitarra'),
(7, 'Primaria'),
(8, 'Universidad'),
(9, 'Argentina'),
(10, 'Noticias'),
(11, 'SQLite'),
(12, 'Celulares'),
(13, 'Apple'),
(14, 'IPhone'),
(15, 'IOs'),
(16, 'IPad'),
(17, 'Android'),
(18, 'Samsung'),
(19, 'Xiaomi'),
(20, 'Ingles'),
(21, 'PHP'),
(22, 'Ford'),
(23, 'Dodge'),
(24, 'Ron'),
(25, 'Secundaria'),
(26, 'Expo'),
(27, 'Gramática');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoclase`
--

CREATE TABLE `tipoclase` (
  `id_tipoClases` int(11) NOT NULL,
  `des_tipoClases` varchar(50) NOT NULL,
  `descripcion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipoclase`
--

INSERT INTO `tipoclase` (`id_tipoClases`, `des_tipoClases`, `descripcion`) VALUES
(1, 'Particular', 'Clase dictada en su Casa'),
(2, 'Grupal', 'Clase dictada en domicilio'),
(3, 'Virtual', 'Clase dictada en instituto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `esProfesor` tinyint(1) NOT NULL,
  `nombre_usuario` varchar(150) NOT NULL,
  `src` varchar(250) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `whatsApp` varchar(100) DEFAULT NULL,
  `apellido` varchar(150) NOT NULL,
  `telefono` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `id_domicilio_fk` int(11) DEFAULT NULL,
  `id_tipoPerfil_fk` int(11) DEFAULT NULL,
  `id_rating_fk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `password`, `esProfesor`, `nombre_usuario`, `src`, `instagram`, `whatsApp`, `apellido`, `telefono`, `email`, `id_domicilio_fk`, `id_tipoPerfil_fk`, `id_rating_fk`) VALUES
(1, 'brad', 1, 'Brad', NULL, 'AlejandroFoglino', '1144373492', 'Foglino', '63853787', 'bradF63@gmail.com', 1, 1, 1),
(2, 'leonardo', 1, 'Leonardo', NULL, 'LisandroRp', '1144373492', 'Rodriguez', '63853787', 'LeoR97@gmail.com', 2, 1, 2),
(3, 'johnny', 1, 'Johnny', NULL, 'JohnnyDepp', '1144373492', 'Guzman', '63853787', 'Johnny@gmail.com', 3, 1, 3),
(4, 'megan', 1, 'Megan', NULL, 'MeganGomez', '1144373492', 'Gomez', '63853787', 'Megan@gmail.com', 4, 1, 4),
(5, 'coral', 0, 'Coral', NULL, 'CoralSimanovich', '1144373492', 'Garcia', '63853787', 'Coral@gmail.com', 5, 1, 5),
(6, 'mark', 1, 'Mark', NULL, 'markwahlberg', '1144373492', 'Fernandez', '67856387', 'mark@gmail.com', 6, 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariopormoneda`
--

CREATE TABLE `usuariopormoneda` (
  `id_usuario_fk` int(11) NOT NULL,
  `id_moneda_fk` int(11) NOT NULL,
  `monto` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuariopormoneda`
--

INSERT INTO `usuariopormoneda` (`id_usuario_fk`, `id_moneda_fk`, `monto`) VALUES
(1, 2, 10),
(4, 2, 100);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id_chat`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`id_clase`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id_comentario`);

--
-- Indices de la tabla `cursoporalumno`
--
ALTER TABLE `cursoporalumno`
  ADD PRIMARY KEY (`id_alumno`,`id_curso`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `cursospordondedaclases`
--
ALTER TABLE `cursospordondedaclases`
  ADD PRIMARY KEY (`id_curso_fk`,`id_dondeDaClase_fk`);

--
-- Indices de la tabla `cursospormaterias`
--
ALTER TABLE `cursospormaterias`
  ADD PRIMARY KEY (`id_materia_fk`,`id_curso_fk`);

--
-- Indices de la tabla `cursosportipoclases`
--
ALTER TABLE `cursosportipoclases`
  ADD PRIMARY KEY (`id_clase_fk`,`id_curso_fk`);

--
-- Indices de la tabla `domicilio`
--
ALTER TABLE `domicilio`
  ADD PRIMARY KEY (`id_domicilio`);

--
-- Indices de la tabla `dondedaclases`
--
ALTER TABLE `dondedaclases`
  ADD PRIMARY KEY (`id_dondeClases`);

--
-- Indices de la tabla `dondedaclasesporprofesor`
--
ALTER TABLE `dondedaclasesporprofesor`
  ADD PRIMARY KEY (`id_dondeDaClases_fk`,`id_usuario_fk`);

--
-- Indices de la tabla `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `foro`
--
ALTER TABLE `foro`
  ADD PRIMARY KEY (`id_foro`);

--
-- Indices de la tabla `foroportag`
--
ALTER TABLE `foroportag`
  ADD PRIMARY KEY (`id_foro_fk`,`id_tag_fk`);

--
-- Indices de la tabla `horariosdelprofesor`
--
ALTER TABLE `horariosdelprofesor`
  ADD PRIMARY KEY (`id_usuario_fk`,`dia`,`turno`);

--
-- Indices de la tabla `instituoporprofesores`
--
ALTER TABLE `instituoporprofesores`
  ADD PRIMARY KEY (`id_instituto_fk`,`id_usuario_fk`);

--
-- Indices de la tabla `instituto`
--
ALTER TABLE `instituto`
  ADD PRIMARY KEY (`id_instituto`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`id_materia`);

--
-- Indices de la tabla `materiaporprofesor`
--
ALTER TABLE `materiaporprofesor`
  ADD PRIMARY KEY (`id_materia_fk`,`id_usuario_fk`);

--
-- Indices de la tabla `moneda`
--
ALTER TABLE `moneda`
  ADD PRIMARY KEY (`id_moneda`);

--
-- Indices de la tabla `profesorporclase`
--
ALTER TABLE `profesorporclase`
  ADD PRIMARY KEY (`id_clase_fk`,`id_usuario_fk`);

--
-- Indices de la tabla `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id_rating`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`id_respuesta`);

--
-- Indices de la tabla `respuestaforo`
--
ALTER TABLE `respuestaforo`
  ADD PRIMARY KEY (`id_respuestaForo`),
  ADD UNIQUE KEY `id_usuario_fk` (`id_usuario_fk`);

--
-- Indices de la tabla `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id_tag`);

--
-- Indices de la tabla `tipoclase`
--
ALTER TABLE `tipoclase`
  ADD PRIMARY KEY (`id_tipoClases`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Indices de la tabla `usuariopormoneda`
--
ALTER TABLE `usuariopormoneda`
  ADD PRIMARY KEY (`id_usuario_fk`,`id_moneda_fk`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chats`
--
ALTER TABLE `chats`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `id_clase` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `domicilio`
--
ALTER TABLE `domicilio`
  MODIFY `id_domicilio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `dondedaclases`
--
ALTER TABLE `dondedaclases`
  MODIFY `id_dondeClases` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `foro`
--
ALTER TABLE `foro`
  MODIFY `id_foro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `instituto`
--
ALTER TABLE `instituto`
  MODIFY `id_instituto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `id_materia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `moneda`
--
ALTER TABLE `moneda`
  MODIFY `id_moneda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rating`
--
ALTER TABLE `rating`
  MODIFY `id_rating` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `id_respuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `respuestaforo`
--
ALTER TABLE `respuestaforo`
  MODIFY `id_respuestaForo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
  MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `tipoclase`
--
ALTER TABLE `tipoclase`
  MODIFY `id_tipoClases` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
