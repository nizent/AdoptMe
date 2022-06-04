#!C:\Users\nicol\AppData\Local\Programs\Python\Python38-32\python.exe
# -*- coding: utf-8 -*-

import cgi
import cgitb; cgitb.enable()
cgitb.enable(display=0, logdir='.')
import pymysql

# conexion a base de datos
conn = pymysql.connect(
    db='tarea2',
    user='root',
    passwd='',
    host='localhost',
    charset='utf8')
c = conn.cursor()

# revisar si nos hicieron submit
mensaje = ""
datos = cgi.FieldStorage()
if len(datos) > 0:

    #           domicilio
    # id(auto) INT; fecha_ingreso OK DATETIME; comuna_id OK INT;
    # nombre_calle VARCHAR; numero VARCHAR; sector VARCHAR;
    # nombre_contacto VARCHAR; email VARCHAR; celular VARCHAR;
    # insertar datos domicilio, empezar con este, que no requiere ids variables

    region=datos['region'].value
    region_id=c.execute("SELECT id FROM region WHERE nombre=='"+region+"'")
    region_id=region[0][0]

    comuna=datos['comuna'].value
    id_comuna=c.execute("SELECT id FROM comuna WHERE region_id=="+str(region_id[0][0])+"AND nombre=='"+str(comuna[0][0])+"'")
    sql = "INSERT INTO domicilio (fecha_ingreso, comuna_id, nombre_calle,numero,sector,nombre_contacto,email,celular) VALUES (getdate(),"+str(id_comuna)+",%s,%s,%s,%s,%s)"

    #           mascota_domicilio
    # id(auto) INT; tipo_mascota_id INT; edad INT ;
    # color VARCHAR; raza VARCHAR; esterilizado INT;
    # vacunas_al_dia INT; domicilio_id INT;

    #           foto_mascota
    # id(auto) INT; ruta_archivo VARCHAR; nombre_archivo VARCHAR;
    # mascota_domicilio_id INT;

    # FIJA      comuna
    # id(auto) INT; nombre VARCHAR; region_id INT;

    # FIJA      region
    # id(auto) INT; nombre VARCHAR;

    # FIJA      tipo_mascota
    # id(auto) INT; nombre VARCHAR;

    try:
        resultado = c.execute(sql, (datos['calle'].value, datos['numero'].value, datos['sector'].value, datos['nombre'].value, datos['email'].value, datos['celular'].value))
        conn.commit()
        if resultado == 1:
            mensaje = "insertada nueva persona: " +\
                       datos['nombre'].value + " " +\
                       datos['apellido'].value
        else:
            mensaje = "error, no se insertó persona en la base de datos"
    except pymysql.Error as e:
        mensaje = "Error con base de datos: {0} {1} ".format(e.args[0], e.args[1])


print("Content-type: text/html; charset=UTF-8")
print("")
print("""
<!DOCTYPE html>
<html>
<head>
<title>Mensaje</title>
</head>
<body>
<h1>Los datos fueron guardados exitosamente</h1>
</body>
</html>
""")

