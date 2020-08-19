
*********************** Antes de ejecutar los comando ***********************

Crear la base de datos por un cliente de mongoDB, en este caso el nombre del schema es "pelicula".

*********************** Dump collection mongo ***********************

1-Conectarse por CMD  por windows.

2-Posicinarse en la carpeta bin donde se encuentra instalado mongoDB.

3- Ejecutar el siguiente comando para el dump datos.


mongodump --db PFI_COLEARNING --out D:/APP/mongodump-2020-08-18

Ejemplo:

D:\C02536\APP\MongoDB\bin>mongodump --db PFI_COLEARNING --out D:/APP/mongodump-2020-08-18

2020-08-18T21:53:38.278-0300    writing PFI_COLEARNING.materia to
2020-08-18T21:53:38.455-0300    writing PFI_COLEARNING.rating to
2020-08-18T21:53:38.457-0300    writing PFI_COLEARNING.tipoClase to
2020-08-18T21:53:38.469-0300    writing PFI_COLEARNING.tag to
2020-08-18T21:53:38.875-0300    done dumping PFI_COLEARNING.materia (3 documents)
2020-08-18T21:53:38.875-0300    writing PFI_COLEARNING.materiaPorProfesor to
2020-08-18T21:53:39.045-0300    done dumping PFI_COLEARNING.rating (3 documents)
2020-08-18T21:53:39.045-0300    writing PFI_COLEARNING.usuario to
2020-08-18T21:53:39.049-0300    done dumping PFI_COLEARNING.usuario (2 documents)
2020-08-18T21:53:39.049-0300    writing PFI_COLEARNING.dondeDaClases to
2020-08-18T21:53:39.380-0300    done dumping PFI_COLEARNING.dondeDaClases (2 documents)
2020-08-18T21:53:39.380-0300    writing PFI_COLEARNING.comentarios to
2020-08-18T21:53:39.381-0300    done dumping PFI_COLEARNING.materiaPorProfesor (2 documents)
2020-08-18T21:53:39.382-0300    writing PFI_COLEARNING.dondeDaClasesPorProfesor to
2020-08-18T21:53:39.433-0300    done dumping PFI_COLEARNING.comentarios (1 document)
2020-08-18T21:53:39.434-0300    writing PFI_COLEARNING.cursoPorAlumno to
2020-08-18T21:53:39.439-0300    done dumping PFI_COLEARNING.dondeDaClasesPorProfesor (1 document)
2020-08-18T21:53:39.440-0300    writing PFI_COLEARNING.profesorPorClase to
2020-08-18T21:53:39.653-0300    done dumping PFI_COLEARNING.profesorPorClase (1 document)
2020-08-18T21:53:39.654-0300    writing PFI_COLEARNING.foroPorTag to
2020-08-18T21:53:39.702-0300    done dumping PFI_COLEARNING.tipoClase (3 documents)
2020-08-18T21:53:39.702-0300    writing PFI_COLEARNING.instituoPorProfesores to
2020-08-18T21:53:39.704-0300    done dumping PFI_COLEARNING.foroPorTag (1 document)
2020-08-18T21:53:39.705-0300    writing PFI_COLEARNING.foro to
2020-08-18T21:53:39.782-0300    done dumping PFI_COLEARNING.tag (3 documents)
2020-08-18T21:53:39.782-0300    writing PFI_COLEARNING.direccion to
2020-08-18T21:53:39.835-0300    done dumping PFI_COLEARNING.direccion (1 document)
2020-08-18T21:53:39.836-0300    writing PFI_COLEARNING.cursos to
2020-08-18T21:53:39.939-0300    done dumping PFI_COLEARNING.cursos (1 document)
2020-08-18T21:53:39.939-0300    writing PFI_COLEARNING.cursosPorDondeDaClases to
2020-08-18T21:53:39.971-0300    done dumping PFI_COLEARNING.cursoPorAlumno (1 document)
2020-08-18T21:53:39.973-0300    writing PFI_COLEARNING.instituto to
2020-08-18T21:53:39.974-0300    done dumping PFI_COLEARNING.instituoPorProfesores (1 document)
2020-08-18T21:53:39.976-0300    writing PFI_COLEARNING.cursosPorMaterias to
2020-08-18T21:53:39.978-0300    done dumping PFI_COLEARNING.foro (1 document)
2020-08-18T21:53:39.981-0300    writing PFI_COLEARNING.cursosPorTipoClases to
2020-08-18T21:53:40.043-0300    done dumping PFI_COLEARNING.cursosPorDondeDaClases (1 document)
2020-08-18T21:53:40.044-0300    writing PFI_COLEARNING.clases to
2020-08-18T21:53:40.050-0300    done dumping PFI_COLEARNING.instituto (1 document)
2020-08-18T21:53:40.050-0300    writing PFI_COLEARNING.counters to
2020-08-18T21:53:40.060-0300    done dumping PFI_COLEARNING.counters (0 documents)
2020-08-18T21:53:40.135-0300    done dumping PFI_COLEARNING.cursosPorTipoClases (1 document)
2020-08-18T21:53:40.190-0300    done dumping PFI_COLEARNING.clases (1 document)
2020-08-18T21:53:40.200-0300    done dumping PFI_COLEARNING.cursosPorMaterias (1 document)

***************** Opcional Export mongo **********************

Exportado de collections

D:\APP\MongoDB\bin>mongorestore --db PFI_COLEARNING  --collection usuarios --out

usuarios.json
2019-04-27T14:47:56.987-0300    connected to: localhost
2019-04-27T14:47:57.026-0300    exported 8 records

D:\APP\MongoDB\bin>mongorestore --db PFI_COLEARNING  --collection comentarios --out comentarios.json
2019-04-27T14:54:20.904-0300    connected to: localhost
2019-04-27T14:54:20.920-0300    exported 25 records

*********************** Resorte mongo ***********************

1-Conectarse por CMD  por windows.

2-Posicinarse en la carpeta bin donde se encuentra instalado mongoDB.

3- Ejecutar el siguiente comando para crear un el schema peliculas a partir de dump.

mongorestore --db PFI_COLEARNING --out D:/APP/mongodump-2020-08-18

Documentación  extraída del siguiente sitio oficial de mongodb:

https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/



