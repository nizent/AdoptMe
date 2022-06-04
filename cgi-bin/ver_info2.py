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
# comuna, calle, tipo, cantidad, primera foto
sql="SELECT D.fecha_ingreso, C.nombre, D.nombre_calle, D.nombre_contacto, COUNT(M.id), COUNT(F.id), D.id FROM domicilio D, comuna C, mascota_domicilio M, foto_mascota F WHERE C.id=D.comuna_id AND M.domicilio_id=D.id AND F.mascota_domicilio_id=M.id GROUP BY D.id ORDER BY M.id DESC"
print("Content-type: text/html; charset=UTF-8")
data = c.execute(sql)
data=c.fetchall()
conn.commit()

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
<div id="tabla_paginas">
<div class="master tabla" id="sd">
        <table>
        <tr>
    <th>Fecha ingreso</th>
    <th>Comuna</th>
    <th>Nombre calle</th>
    <th>Nombre contacto</th>
    <th>Total mascotas</th>
    <th>Total fotos</th>
        </tr>
'''
print(head)
print(b1)
i=0
l=len(data)
old=-1
for d in data:
    index=int(i/5)
    if(index==0):
        row = f'''
                <tr id="data{i}" onclick="m({i},{l});">
                    <td>{str(d[0])}</td>
                    <td>{str(d[1])}</td>
                    <td>{str(d[2])}</td>
                    <td>{str(d[3])}</td>
                    <td>{str(d[4])}</td>
                    <td>{str(d[5])}</td>
                </tr>
            '''
    else:
        row = f'''
                <tr id="data{i}" style="display: none;" onclick="m({i},{l});">
                    <td>{str(d[0])}</td>
                    <td>{str(d[1])}</td>
                    <td>{str(d[2])}</td>
                    <td>{str(d[3])}</td>
                    <td>{str(d[4])}</td>
                    <td>{str(d[5])}</td>
                </tr>
            '''
    print(row)
    i+=1

b2='''
</table>
</div>
<div class="listado_de_paginas" style="text-align: center">
'''
print(b2)

b3=""
N=int(l/5)
if(N==l/5):
    N=N-1
for ix in range(0,N+1):
    b3+=f'''<a onclick="mostrar_data2({ix},{N},{l})">{ix+1} </a> '''
b4="<br>"
j=0
for d in data:
    id=d[6]
    sql=f'''SELECT R.nombre, C.nombre, D.nombre_calle, D.numero, D.sector, D.nombre_contacto, D.email, D.celular FROM domicilio D, region R, comuna C WHERE C.region_id=R.id AND C.id=D.comuna_id AND D.id={str(id)}'''
    dt=c.execute(sql)
    dt=c.fetchall()[0]

    b4+=f'''<div id="dom{str(j)}" class="master menu2" style="display:none;"> Region: {str(dt[0])}<br>
            Comuna: {str(dt[1])}<br>
            Nombre calle: {str(dt[2])}<br>
            Numero: {str(dt[3])}<br>
            Sector: {str(dt[4])}<br>
            Nombre contacto: {str(dt[5])}<br>
            Email: {str(dt[6])}<br>
            Celular: {str(dt[7])}<br>
      '''
    sql=f'''SELECT T.nombre, M.edad, M.color, M.raza, M.esterilizado, M.vacunas_al_dia, M.id FROM mascota_domicilio M, domicilio D, tipo_mascota T WHERE D.id={id} AND M.domicilio_id=D.id AND M.tipo_mascota_id=T.id'''
    dt=c.execute(sql)
    dt=c.fetchall()
    k=1
    zg=d
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
                <img id="{str(j)}{str(k)}" src="{f[0][0]}" width="320" height="240" onclick="agrandar('{str(j)}{str(k)}')">
                <br>
                Fecha: {str(zg[0])}<br>
                Total mascotas: {str(zg[4])}<br>
                Total fotos: {str(zg[5])}<br>
                '''
            k+=1
    j+=1
    b4+="</div>"
b5='''
</div>
</body>
</html>
'''
print(b3)
print("</div></div>")
print(b4)
botones=f'''<div class="entrada botones" id="botones" style="display: none;">
                <button class="boton_azul" type="button" onclick="volver_listado({l})">Volver al listado</button>
                <button class="boton_verde" type="button" onclick="window.parent.location.href='../index.html'">Portada</button>
            </div>'''
print(botones)
print(b5)