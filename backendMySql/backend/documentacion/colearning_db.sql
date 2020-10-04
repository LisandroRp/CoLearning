-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-10-2020 a las 22:41:12
-- Versión del servidor: 5.5.39
-- Versión de PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `colearning_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE IF NOT EXISTS `clases` (
`id_clase` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `id_usuario` int(25) DEFAULT NULL,
  `id_domicilio` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

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

CREATE TABLE IF NOT EXISTS `comentarios` (
`id_comentario` int(11) NOT NULL,
  `des_comentario` varchar(250) NOT NULL,
  `id_usuarioDestino` int(30) NOT NULL,
  `id_usuarioOrigen` int(30) NOT NULL,
  `ratingNeg` int(11) NOT NULL,
  `ratingPos` int(11) NOT NULL,
  `fecha_alta` varchar(50) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id_comentario`, `des_comentario`, `id_usuarioDestino`, `id_usuarioOrigen`, `ratingNeg`, `ratingPos`, `fecha_alta`) VALUES
(1, 'admin', 2, 1, 10, 15, '2020-08-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursoporalumno`
--

CREATE TABLE IF NOT EXISTS `cursoporalumno` (
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

CREATE TABLE IF NOT EXISTS `cursos` (
`id_curso` int(11) NOT NULL,
  `nombre_curso` varchar(50) NOT NULL,
  `id_instituto` int(11) NOT NULL,
  `src` varchar(250) NOT NULL,
  `id_domicilio` int(11) NOT NULL,
  `whatsApp` varchar(50) NOT NULL,
  `id_profesor` varchar(50) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `nombre_curso`, `id_instituto`, `src`, `id_domicilio`, `whatsApp`, `id_profesor`) VALUES
(1, 'Matematicas Y Geometrias', 1, '', 1, '12122131', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursospordondedaclases`
--

CREATE TABLE IF NOT EXISTS `cursospordondedaclases` (
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

CREATE TABLE IF NOT EXISTS `cursospormaterias` (
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

CREATE TABLE IF NOT EXISTS `cursosportipoclases` (
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

CREATE TABLE IF NOT EXISTS `domicilio` (
`id_domicilio` int(11) NOT NULL,
  `calle` varchar(150) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `localidad` varchar(150) NOT NULL,
  `latitud` varchar(10) NOT NULL,
  `longitud` varchar(10) NOT NULL,
  `des_domicilio` varchar(150) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `domicilio`
--

INSERT INTO `domicilio` (`id_domicilio`, `calle`, `numero`, `localidad`, `latitud`, `longitud`, `des_domicilio`) VALUES
(1, 'Alsina', '1000', 'CABA', '13', '14', 'Alsina 1000 CABA'),
(2, 'Solis', '1400', 'CABA', '13', '34', 'Solis 1400 CABA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dondedaclases`
--

CREATE TABLE IF NOT EXISTS `dondedaclases` (
`id_dondeClases` int(11) NOT NULL,
  `des_dondeClases` varchar(150) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `dondedaclases`
--

INSERT INTO `dondedaclases` (`id_dondeClases`, `des_dondeClases`) VALUES
(1, 'En casas'),
(2, 'En Instituto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dondedaclasesporprofesor`
--

CREATE TABLE IF NOT EXISTS `dondedaclasesporprofesor` (
  `id_dondeDaClases_fk` int(11) NOT NULL,
  `id_usuario_fk` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dondedaclasesporprofesor`
--

INSERT INTO `dondedaclasesporprofesor` (`id_dondeDaClases_fk`, `id_usuario_fk`) VALUES
(1, 1),
(2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employees`
--

CREATE TABLE IF NOT EXISTS `employees` (
`id` bigint(20) unsigned NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `designation` varchar(100) NOT NULL,
  `salary` decimal(11,2) unsigned DEFAULT '0.00',
  `status` tinyint(3) unsigned DEFAULT '0',
  `is_deleted` tinyint(3) unsigned DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`id`, `first_name`, `last_name`, `email`, `phone`, `organization`, `designation`, `salary`, `status`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Alejandro', 'Foglino', 'alefoglino@gasd.com', '1111111', 'BH', 'BH', '12.00', 1, 1, '2020-09-01 00:00:00', '2020-09-01 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foro`
--

CREATE TABLE IF NOT EXISTS `foro` (
`id_foro` int(11) NOT NULL,
  `id_usuario` int(50) NOT NULL,
  `nombre_foro` varchar(50) NOT NULL,
  `pregunta` varchar(150) NOT NULL,
  `esProfesor` tinyint(1) NOT NULL,
  `respuestasCant` varchar(10) NOT NULL,
  `fecha_alta` varchar(50) NOT NULL,
  `resuelto` tinyint(1) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `foro`
--

INSERT INTO `foro` (`id_foro`, `id_usuario`, `nombre_foro`, `pregunta`, `esProfesor`, `respuestasCant`, `fecha_alta`, `resuelto`) VALUES
(1, 1, 'Duda Existencial', 'Como hacer??', 1, '114', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foroportag`
--

CREATE TABLE IF NOT EXISTS `foroportag` (
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
-- Estructura de tabla para la tabla `instituoporprofesores`
--

CREATE TABLE IF NOT EXISTS `instituoporprofesores` (
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

CREATE TABLE IF NOT EXISTS `instituto` (
`id_instituto` int(11) NOT NULL,
  `nombre_instituto` varchar(150) NOT NULL,
  `src` varchar(250) NOT NULL,
  `whatsApp` varchar(50) NOT NULL,
  `idDireccion` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `instituto`
--

INSERT INTO `instituto` (`id_instituto`, `nombre_instituto`, `src`, `whatsApp`, `idDireccion`) VALUES
(1, 'Leila', '', '12122131', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE IF NOT EXISTS `materia` (
`id_materia` int(11) NOT NULL,
  `nombre_materia` varchar(150) NOT NULL,
  `des_materia` varchar(250) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id_materia`, `nombre_materia`, `des_materia`) VALUES
(1, 'Lengua', 'Dictado de Lengua'),
(2, 'Matematica', 'Dictado de matematicas'),
(3, 'Fisisca', 'Dictado de Fisica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiaporprofesor`
--

CREATE TABLE IF NOT EXISTS `materiaporprofesor` (
  `id_materia_fk` int(11) NOT NULL,
  `id_usuario_fk` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `materiaporprofesor`
--

INSERT INTO `materiaporprofesor` (`id_materia_fk`, `id_usuario_fk`) VALUES
(1, 1),
(2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moneda`
--

CREATE TABLE IF NOT EXISTS `moneda` (
`id_moneda` int(11) NOT NULL,
  `des_moneda` varchar(20) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `moneda`
--

INSERT INTO `moneda` (`id_moneda`, `des_moneda`) VALUES
(1, 'Pesos'),
(2, 'Dolar'),
(3, 'Euro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesorporclase`
--

CREATE TABLE IF NOT EXISTS `profesorporclase` (
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

CREATE TABLE IF NOT EXISTS `rating` (
`id_rating` int(11) NOT NULL,
  `votos` varchar(15) NOT NULL,
  `rating` varchar(15) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `rating`
--

INSERT INTO `rating` (`id_rating`, `votos`, `rating`) VALUES
(1, '56', '3'),
(2, '40', '4'),
(3, '67', '3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestaforo`
--

CREATE TABLE IF NOT EXISTS `respuestaforo` (
`id_respuestaForo` int(11) NOT NULL,
  `id_usuario_fk` int(11) NOT NULL,
  `res_buenas` int(11) NOT NULL,
  `res_mejores` int(11) NOT NULL,
  `res_cantidad` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

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

CREATE TABLE IF NOT EXISTS `tag` (
`id_tag` int(11) NOT NULL,
  `nombre_tag` varchar(50) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `tag`
--

INSERT INTO `tag` (`id_tag`, `nombre_tag`) VALUES
(1, 'React Native'),
(2, 'Java'),
(3, '.Net');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoclase`
--

CREATE TABLE IF NOT EXISTS `tipoclase` (
`id_tipoClases` int(11) NOT NULL,
  `des_tipoClases` varchar(50) NOT NULL,
  `descripcion` varchar(250) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `tipoclase`
--

INSERT INTO `tipoclase` (`id_tipoClases`, `des_tipoClases`, `descripcion`) VALUES
(1, 'En su Casa', 'Clase dictada en su Casa'),
(2, 'A Domicilio', 'Clase dictada en domicilio'),
(3, 'Instituto', 'Clase dictada en instituto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `password`, `esProfesor`, `nombre_usuario`, `src`, `instagram`, `whatsApp`, `apellido`, `telefono`, `email`, `id_domicilio_fk`, `id_tipoPerfil_fk`, `id_rating_fk`) VALUES
(1, 'admin', 1, 'Wachin', '', '@LisandroRp', '0111566666', 'Turro', '0111566666', 'wachin1@gmail.com', 1, 1, 1),
(2, 'admipepen', 1, 'admipepen', '', '@LisandroRp', '0111566666', 'Turro', '0111566666', 'wachin@gmail.com', NULL, NULL, NULL),
(3, 'selacome', 0, 'Licha', '', '@Licha', '0111566666', 'MeLaComo', '0111566666', 'lichan@gmail.com', 2, 2, 2),
(4, 'lisandro', 1, 'rodriguezPradoLisandro', '', '@licha', '1111212', 'Rodriguez', '1212121', 'prado@gmail.com', 1, 1, 1),
(6, 'admipepen', 1, 'admipepen', '', '@LisandroRp', '0111566666', 'Turro', '0111566666', 'wachines@gmail.com', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariopormoneda`
--

CREATE TABLE IF NOT EXISTS `usuariopormoneda` (
  `id_usuario_fk` int(11) NOT NULL,
  `id_moneda_fk` int(11) NOT NULL,
  `monto` float DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuariopormoneda`
--

INSERT INTO `usuariopormoneda` (`id_usuario_fk`, `id_moneda_fk`, `monto`) VALUES
(4, 2, 100),
(1, 2, 10);

--
-- Índices para tablas volcadas
--

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
 ADD PRIMARY KEY (`id_clase_fk`);

--
-- Indices de la tabla `rating`
--
ALTER TABLE `rating`
 ADD PRIMARY KEY (`id_rating`);

--
-- Indices de la tabla `respuestaforo`
--
ALTER TABLE `respuestaforo`
 ADD PRIMARY KEY (`id_respuestaForo`), ADD UNIQUE KEY `id_usuario_fk` (`id_usuario_fk`);

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
 ADD PRIMARY KEY (`id_usuario`), ADD UNIQUE KEY `email` (`email`), ADD UNIQUE KEY `email_2` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
MODIFY `id_clase` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `domicilio`
--
ALTER TABLE `domicilio`
MODIFY `id_domicilio` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `dondedaclases`
--
ALTER TABLE `dondedaclases`
MODIFY `id_dondeClases` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `employees`
--
ALTER TABLE `employees`
MODIFY `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `foro`
--
ALTER TABLE `foro`
MODIFY `id_foro` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `instituto`
--
ALTER TABLE `instituto`
MODIFY `id_instituto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
MODIFY `id_materia` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `moneda`
--
ALTER TABLE `moneda`
MODIFY `id_moneda` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `rating`
--
ALTER TABLE `rating`
MODIFY `id_rating` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `respuestaforo`
--
ALTER TABLE `respuestaforo`
MODIFY `id_respuestaForo` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tag`
--
ALTER TABLE `tag`
MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tipoclase`
--
ALTER TABLE `tipoclase`
MODIFY `id_tipoClases` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
MODIFY `id_usuario` int(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
