-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-09-2020 a las 00:57:33
-- Versión del servidor: 5.5.39
-- Versión de PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `node_mysql_crud_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE IF NOT EXISTS `clases` (
`idClase` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `idProfesor` varchar(25) DEFAULT NULL,
  `idDireccion` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`idClase`, `nombre`, `idProfesor`, `idDireccion`) VALUES
(1, 'Matematicas', 'admin', 1),
(2, 'Lenguajes', 'admin', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE IF NOT EXISTS `comentarios` (
`id_comentario` int(11) NOT NULL,
  `des_comentario` varchar(250) NOT NULL,
  `id_usuarioDestino` varchar(30) NOT NULL,
  `id_usuarioOrigen` varchar(30) NOT NULL,
  `ratingNeg` int(11) NOT NULL,
  `ratingPos` int(11) NOT NULL,
  `fecha_alta` varchar(50) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id_comentario`, `des_comentario`, `id_usuarioDestino`, `id_usuarioOrigen`, `ratingNeg`, `ratingPos`, `fecha_alta`) VALUES
(1, 'admin', 'bala', 'admin', 10, 15, '2020-08-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursoporalumno`
--

CREATE TABLE IF NOT EXISTS `cursoporalumno` (
  `idAlumno` varchar(30) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `fechaDesde` varchar(50) NOT NULL,
  `fechaHasta` varchar(50) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursoporalumno`
--

INSERT INTO `cursoporalumno` (`idAlumno`, `idCurso`, `fechaDesde`, `fechaHasta`, `activo`) VALUES
('bala', 1, '2022-03-08T03:00:00.000+00:00', '2020-09-25T03:00:00.000+00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE IF NOT EXISTS `cursos` (
`id_curso` int(11) NOT NULL,
  `nombre_curso` varchar(50) NOT NULL,
  `id_instituto` int(11) NOT NULL,
  `src` varchar(250) NOT NULL,
  `idDireccion` int(11) NOT NULL,
  `whatsApp` varchar(50) NOT NULL,
  `idProfesor` varchar(50) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `nombre_curso`, `id_instituto`, `src`, `idDireccion`, `whatsApp`, `idProfesor`) VALUES
(1, 'Matematicas Y Geometrias', 1, '', 1, '12122131', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursospordondedaclases`
--

CREATE TABLE IF NOT EXISTS `cursospordondedaclases` (
  `idcurso_FK` int(11) NOT NULL,
  `idDondeDaClase_FK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursospordondedaclases`
--

INSERT INTO `cursospordondedaclases` (`idcurso_FK`, `idDondeDaClase_FK`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursospormaterias`
--

CREATE TABLE IF NOT EXISTS `cursospormaterias` (
  `idMateria_FK` int(11) NOT NULL,
  `idCurso_FK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursospormaterias`
--

INSERT INTO `cursospormaterias` (`idMateria_FK`, `idCurso_FK`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursosportipoclases`
--

CREATE TABLE IF NOT EXISTS `cursosportipoclases` (
  `idClase_FK` int(11) NOT NULL,
  `idCursos_FK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cursosportipoclases`
--

INSERT INTO `cursosportipoclases` (`idClase_FK`, `idCursos_FK`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE IF NOT EXISTS `direccion` (
`idDireccion` int(11) NOT NULL,
  `calle` varchar(150) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `localidad` varchar(150) NOT NULL,
  `latitud` varchar(10) NOT NULL,
  `longitud` varchar(10) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`idDireccion`, `calle`, `numero`, `localidad`, `latitud`, `longitud`) VALUES
(1, 'Alsina', '1000', 'CABA', '13', '14'),
(2, 'Solis', '1400', 'CABA', '13', '34');

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
  `idDondeDaClases_Fk` int(11) NOT NULL,
  `idProfesor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `dondedaclasesporprofesor`
--

INSERT INTO `dondedaclasesporprofesor` (`idDondeDaClases_Fk`, `idProfesor`) VALUES
(1, 'admin');

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
  `idUsuario` varchar(50) NOT NULL,
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

INSERT INTO `foro` (`id_foro`, `idUsuario`, `nombre_foro`, `pregunta`, `esProfesor`, `respuestasCant`, `fecha_alta`, `resuelto`) VALUES
(1, 'admin', 'Duda Existencial', 'Como hacer??', 1, '114', '', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foroportag`
--

CREATE TABLE IF NOT EXISTS `foroportag` (
  `idForo_fk` int(11) NOT NULL,
  `idTag_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `foroportag`
--

INSERT INTO `foroportag` (`idForo_fk`, `idTag_fk`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instituoporprofesores`
--

CREATE TABLE IF NOT EXISTS `instituoporprofesores` (
  `idInstituto_FK` int(11) NOT NULL,
  `idProfesor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `instituoporprofesores`
--

INSERT INTO `instituoporprofesores` (`idInstituto_FK`, `idProfesor`) VALUES
(1, 'admin');

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
  `nombre` varchar(150) NOT NULL,
  `descripcion` varchar(250) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id_materia`, `nombre`, `descripcion`) VALUES
(1, 'Lengua', 'Dictado de Lengua'),
(2, 'Matematica', 'Dictado de matematicas'),
(3, 'Fisisca', 'Dictado de Fisica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiaporprofesor`
--

CREATE TABLE IF NOT EXISTS `materiaporprofesor` (
  `idMateria_FK` int(11) NOT NULL,
  `idProfesor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `materiaporprofesor`
--

INSERT INTO `materiaporprofesor` (`idMateria_FK`, `idProfesor`) VALUES
(1, 'admin'),
(2, 'idMat');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesorporclase`
--

CREATE TABLE IF NOT EXISTS `profesorporclase` (
  `idClase_FK` int(11) NOT NULL,
  `idProfesor` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `profesorporclase`
--

INSERT INTO `profesorporclase` (`idClase_FK`, `idProfesor`) VALUES
(1, 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rating`
--

CREATE TABLE IF NOT EXISTS `rating` (
`idRating` int(11) NOT NULL,
  `votos` varchar(15) NOT NULL,
  `rating` varchar(15) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `rating`
--

INSERT INTO `rating` (`idRating`, `votos`, `rating`) VALUES
(1, '56', '3'),
(2, '40', '4'),
(3, '67', '3');

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
(1, 'Virtual', 'Clase Virtuales'),
(2, 'Casa', 'Clase Casa'),
(3, 'Institución', 'Clase Instituto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `profesor` tinyint(1) NOT NULL,
  `nombre_usuario` varchar(150) NOT NULL,
  `src` varchar(250) NOT NULL,
  `instagram` varchar(100) NOT NULL,
  `whatsApp` varchar(100) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `telefono` varchar(150) NOT NULL,
  `mail` varchar(150) NOT NULL,
  `idDireccion` int(11) NOT NULL,
  `idTipoPerfil` int(11) NOT NULL,
  `idRating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `password`, `profesor`, `nombre_usuario`, `src`, `instagram`, `whatsApp`, `apellido`, `telefono`, `mail`, `idDireccion`, `idTipoPerfil`, `idRating`) VALUES
('admin', 'admin', 1, 'Wachin', '', '@LisandroRp', '0111566666', 'Turro', '0111566666', 'wachin@gmail.com', 1, 1, 1),
('bala', 'selacome', 0, 'Licha', '', '@Licha', '0111566666', 'MeLaComo', '0111566666', 'lichan@gmail.com', 2, 2, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
 ADD PRIMARY KEY (`idClase`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
 ADD PRIMARY KEY (`id_comentario`);

--
-- Indices de la tabla `cursoporalumno`
--
ALTER TABLE `cursoporalumno`
 ADD PRIMARY KEY (`idAlumno`,`idCurso`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
 ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `cursospordondedaclases`
--
ALTER TABLE `cursospordondedaclases`
 ADD PRIMARY KEY (`idcurso_FK`,`idDondeDaClase_FK`);

--
-- Indices de la tabla `cursospormaterias`
--
ALTER TABLE `cursospormaterias`
 ADD PRIMARY KEY (`idMateria_FK`,`idCurso_FK`);

--
-- Indices de la tabla `cursosportipoclases`
--
ALTER TABLE `cursosportipoclases`
 ADD PRIMARY KEY (`idClase_FK`,`idCursos_FK`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
 ADD PRIMARY KEY (`idDireccion`);

--
-- Indices de la tabla `dondedaclases`
--
ALTER TABLE `dondedaclases`
 ADD PRIMARY KEY (`id_dondeClases`);

--
-- Indices de la tabla `dondedaclasesporprofesor`
--
ALTER TABLE `dondedaclasesporprofesor`
 ADD PRIMARY KEY (`idDondeDaClases_Fk`,`idProfesor`);

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
 ADD PRIMARY KEY (`idForo_fk`,`idTag_fk`);

--
-- Indices de la tabla `instituoporprofesores`
--
ALTER TABLE `instituoporprofesores`
 ADD PRIMARY KEY (`idInstituto_FK`,`idProfesor`);

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
 ADD PRIMARY KEY (`idMateria_FK`,`idProfesor`);

--
-- Indices de la tabla `profesorporclase`
--
ALTER TABLE `profesorporclase`
 ADD PRIMARY KEY (`idClase_FK`);

--
-- Indices de la tabla `rating`
--
ALTER TABLE `rating`
 ADD PRIMARY KEY (`idRating`);

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
 ADD PRIMARY KEY (`idUsuario`), ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
MODIFY `idClase` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
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
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
MODIFY `idDireccion` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
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
-- AUTO_INCREMENT de la tabla `rating`
--
ALTER TABLE `rating`
MODIFY `idRating` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
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
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
