#!C:\Users\nicol\AppData\Local\Programs\Python\Python38-32\python.exe
# -*- coding: utf-8 -*-

import cgi, os
import cgitb
cgitb.enable(display=0, logdir='.')
import pymysql
import re

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

# VALIDAR DOMICILIO region, comuna, calle, numero, sector, nombre, email, celular
val=True
if datos["region"].value=="":
        val=False
        mensaje+="<br> Region no debe estar vacio"

if datos["comuna"].value=="":
        val=False
        mensaje+="<br> Comuna no debe estar vacio"

if(not (len(datos["calle"].value)>0 & len(datos["calle"].value)<=250)):
        val=False
        mensaje+="<br> Calle debe ser entre 1 y 250 caracteres"

if(not (len(datos["numero"].value)>0 & len(datos["numero"].value)<=20)):
        val=False
        mensaje+="<br> Numero debe ser entre 1 y 20 caracteres"

if(not (len(datos["sector"].value)<=100)):
        val=False
        mensaje+="<br> Sector debe ser menor a 100 caracteres"

if(not (len(datos["nombre"].value)>0 & len(datos["nombre"].value)<=200)):
        val=False
        mensaje+="<br> Nombre debe ser entre 1 y 200 caracteres"

#email, celular
regexemail = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'

if not re.search(regexemail,datos["email"].value):
        val=False
        mensaje+="<br> Email invalido"

regexphone="(\+569)?\s*?(\d{4})\s*?(\d{4})"

if not re.search(regexphone,datos["celular"].value):
        val=False
        mensaje+="<br> Celular invalido"

# VALIDAR MASCOTA tipo-mascotai, edad-mascotai, color-mascotai, raza-mascotai, esterilizado-mascotai, vacunas-mascotai
# VALIDAR IMAGENES

val_img=True
i=0
tm='tipo-mascota'+str(i)
val_tm=True
em='edad-mascota'+str(i)
val_em=True
cm='color-mascota'+str(i)
val_cm=True
rm='raza-mascota'+str(i)
val_rm=True
esm='esterilizado-mascota'+str(i)
val_esm=True
vm='vacunas-mascota'+str(i)
val_vm=True
while(tm in datos.keys()):
    if datos[tm].value=="":
        val_tm=False
        mensaje+="<br> Tipo mascota no debe estar vacio"
    if len(datos[em].value)>0:
        try:
            z=int(datos[em].value)
            if z<=0:
                val_em=False
                mensaje+="<br> La edad debe ser positiva"
        except pymysql.Error:
            val_em=False
            mensaje+="<br> La edad debe ser un numero"
    else:
        val_em=False
        mensaje+="<br> Agregue la edad"
    if(not (len(datos[cm].value)>0 & len(datos[cm].value)<=30)):
        val_cm=False
        mensaje+="<br> Color mascota debe ser entre 1 y 30 caracteres"
    if(not (len(datos[rm].value)>0 & len(datos[rm].value)<=30)):
        val_rm=False
        mensaje+="<br> Raza mascota debe ser entre 1 y 30 caracteres"
    if datos[esm].value=="":
        val_esm=False
        mensaje+="<br> Esterilizado mascota no debe estar vacio"
    #if datos[vm].value=="":
    #    val_vm=False
    #    mensaje+="<br> Vacunas mascota no debe estar vacio"
    j=0
    fo="foto-mascota"+str(i)+"_"+str(j)
    while(fo in datos.keys()):
            fr=datos[fo].filename
            if( not (('.jpg' in fr) | ('.png' in fr) | ('.jpx' in fr) | ('.gif' in fr))):
                val_img=False
                mensaje+="<br> Ingrese solo imagenes"
                break
            j=j+1
            fo="foto-mascota"+str(i)+"_"+str(j)
    i=i+1
    tm='tipo-mascota'+str(i)
    em='edad-mascota'+str(i)
    cm='color-mascota'+str(i)
    rm='raza-mascota'+str(i)
    esm='esterilizado-mascota'+str(i)
    vm='vacunas-mascota'+str(i)

if (len(datos) > 0) & val & val_img :
    region=datos['region'].value
    region_id=c.execute("SELECT id FROM region WHERE nombre='"+region+"'")
    region_id=c.fetchall()[0][0]
    comuna=datos['comuna'].value
    id_comuna=c.execute("SELECT id FROM comuna WHERE region_id="+str(region_id)+" AND nombre='"+comuna+"'")
    id_comuna=c.fetchall()[0][0]
    sql = "INSERT INTO domicilio (fecha_ingreso, comuna_id, nombre_calle,numero,sector,nombre_contacto,email,celular) VALUES (CURRENT_DATE(),"+str(id_comuna)+",%s,%s,%s,%s,%s,%s)"
    try:
        resultado = c.execute(sql, (datos['calle'].value, datos['numero'].value, datos['sector'].value, datos['nombre'].value, datos['email'].value, datos['celular'].value))
        conn.commit()
        #if resultado == 1:
         #   mensaje = "insertada nueva persona: " +\
          #             datos['nombre'].value + " " +\
           #            datos['apellido'].value
        #else:
         #   mensaje = "error, no se insertó persona en la base de datos"
    except pymysql.Error as e:
        mensaje += "Error con base de datos: {0} {1} ".format(e.args[0], e.args[1])
    # for cada mascota_domicilio
    i=0
    tm='tipo-mascota'+str(i)
    while(tm in datos.keys()):
        domicilio_id=c.execute("SELECT id FROM domicilio ORDER BY id DESC LIMIT 1")
        domicilio_id=c.fetchall()[0][0]
        tipo_mascota=datos['tipo-mascota'+str(i)].value
        tipo_mascota_id=c.execute("SELECT id FROM tipo_mascota WHERE nombre='"+tipo_mascota+"'")
        tipo_mascota_id=c.fetchall()[0][0]
        sql = "INSERT INTO mascota_domicilio (tipo_mascota_id, edad, color,raza,esterilizado,vacunas_al_dia,domicilio_id) VALUES ("+str(tipo_mascota_id)+",%s,%s,%s,%s,%s,"+str(domicilio_id)+")"
        try:
            resultado = c.execute(sql, (datos['edad-mascota'+str(i)].value, datos['color-mascota'+str(i)].value, datos['raza-mascota'+str(i)].value, datos['esterilizado-mascota'+str(i)].value, datos['vacunas-mascota'+str(i)].value))
            conn.commit()
        except pymysql.Error as e:
            mensaje += "Error con base de datos: {0} {1} ".format(e.args[0], e.args[1])
        mascota_domicilio_id=c.execute("SELECT id FROM mascota_domicilio ORDER BY id DESC LIMIT 1")
        mascota_domicilio_id=c.fetchall()[0][0]
        sql = "INSERT INTO foto_mascota (ruta_archivo,nombre_archivo,mascota_domicilio_id) VALUES (%s,%s,"+str(mascota_domicilio_id)+")"
        j=0
        fo="foto-mascota"+str(i)+"_"+str(j)
        while(fo in datos.keys()):
            file=datos[fo]
            if file.filename:
                try:
                    resultado = c.execute(sql, ("../img/"+file.filename, file.filename))
                    conn.commit()
                    fn = os.path.basename(file.filename) #obtener nombre base del archivo
                    open("../htdocs/img/"+fn, 'wb').write(file.file.read()) #guarda archivo en el servidor
                    if resultado == 1:
                        mensaje += "se subieron"
                    else:
                        mensaje += "error, no se insertó la wea en la base de datos"
                except pymysql.Error as e:
                    mensaje += "Error con base de datos: {0} {1} ".format(e.args[0], e.args[1])
                    mensaje += fn
                j=j+1
                fo="foto-mascota"+str(i)+"_"+str(j)
        i=i+1
        tm='tipo-mascota'+str(i)
print("Content-type: text/html; charset=UTF-8")
print("")
print("""
<!DOCTYPE html>
<html>
<head>
<title>Mensaje</title>
</head>
<body>
"""+mensaje+"""
<h1>Los datos fueron guardados exitosamente</h1>
""")
print(""" </body>
          </html>""")

