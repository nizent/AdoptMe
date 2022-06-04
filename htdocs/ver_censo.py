#!C:\Users\nicol\AppData\Local\Programs\Python\Python38-32\python.exe
# -*- coding: utf-8 -*-

import cgi
import pymysql

# conexion a base de datos
conn = pymysql.connect(
    db='tarea2',
    user='root',
    passwd='',
    host='localhost',
    charset='utf8')
c = conn.cursor()
datos=cgi.FieldStorage()
mascota_domicilio_id=datos['mascota_domicilio_id'].value
# comuna, calle, tipo, cantidad, primera foto

head = '''
    <!DOCTYPE html>
<!--suppress ALL -->
<head>
    <meta charset="UTF-8">
    <title>Hackbox</title>
    <script src="../listado.js?version=51"></script>
    <link rel="stylesheet" type="text/css" href="../estilo.css?version=51">
</head>
'''
b1 = '''
<body>
'''
print(head)
print(b1)
i=0
l=1
old=-1
j=0
sql=f'''SELECT R.nombre, C.nombre, D.nombre_calle, D.numero, D.sector, D.nombre_contacto, D.email, D.celular FROM mascota_domicilio M, domicilio D, region R, comuna C WHERE C.region_id=R.id AND C.id=D.comuna_id AND D.id=M.domicilio_id AND M.id={mascota_domicilio_id}'''
dt=c.execute(sql)
dt=c.fetchall()[0]
b4=""
b4+=f'''<div id="dom{str(j)}" class="master menu2"> Region: {str(dt[0])}<br>
        Comuna: {str(dt[1])}<br>
        Nombre calle: {str(dt[2])}<br>
        Numero: {str(dt[3])}<br>
        Sector: {str(dt[4])}<br>
        Nombre contacto: {str(dt[5])}<br>
        Email: {str(dt[6])}<br>
        Celular: {str(dt[7])}<br>
  '''
sql=f'''SELECT T.nombre, M.edad, M.color, M.raza, M.esterilizado, M.vacunas_al_dia, M.id, D.fecha_ingreso FROM mascota_domicilio M, domicilio D, tipo_mascota T WHERE M.id={mascota_domicilio_id} AND M.domicilio_id=D.id AND M.tipo_mascota_id=T.id'''
dt=c.execute(sql)
dt=c.fetchall()
k=1
l=len(dt)
for d in dt:
        sql2=f''' SELECT ruta_archivo FROM foto_mascota WHERE mascota_domicilio_id={str(d[6])}'''
        f=c.execute(sql2)
        f=c.fetchall()
        print(f'''''')
        b4+=f''' Mascota {str(k)}<br>
            Tipo de mascota: {str(d[0])}<br>
            Edad: {str(d[1])} años<br>
            Color: {str(d[2])}<br>
            Raza: {str(d[3])}<br>
            Esterilizado: {str(d[4])}<br>
            Vacunas al dia: {str(d[5])}<br>
            '''
        b4+=f'''
            <img src="{f[0][0]}" width="320" height="240">
            <br>
            Fecha: {str(d[7])}<br>
            Total mascotas: 1<br>
            Total fotos: {l}<br>
            '''
        k+=1
j+=1
b5='''
</div>
</body>
</html>
'''
print(b4)
botones=f'''<div class="entrada botones" id="botones">
                <button class="boton_azul" type="button" onclick="window.parent.location.href='../listado.html'">Volver al listado</button>
                <button class="boton_verde" type="button" onclick="window.parent.location.href='../index.html'">Portada</button>
            </div>'''
print(botones)
print(b5)