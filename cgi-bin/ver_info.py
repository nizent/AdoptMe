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
# comuna, calle, tipo, cantidad, primera foto
sql="SELECT D.id, C.id, C.nombre, D.nombre_calle, M.id FROM domicilio D, comuna C, mascota_domicilio M WHERE C.id=D.comuna_id AND M.domicilio_id=D.id GROUP BY D.id ORDER BY M.id DESC LIMIT 5"
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
    <link rel="stylesheet" type="text/css" href="../estilo.css?version=51">
</head>
'''
b1 = '''
<body>
<div class="master tabla">



        <table>
        <tr>
    <th>Comuna</th>
    <th>Calle</th>
    <th>Tipo-Cantidad</th>
    <th>Foto</th>
'''
print(head)
print(b1)
for d in data:

    sql2="SELECT T.nombre, COUNT(T.nombre) FROM mascota_domicilio M, tipo_mascota T WHERE T.id=M.tipo_mascota_id AND M.domicilio_id = "+str(d[0])+" GROUP BY T.nombre"
    t=c.execute(sql2)
    t=c.fetchall()

    str1=""
    for s in t:
        str1+=str(s[0])+" : "+str(s[1])+"<br>"

    sql3="SELECT F.ruta_archivo FROM foto_mascota F, mascota_domicilio M WHERE F.mascota_domicilio_id="+str(d[4])
    t=c.execute(sql3)
    t=c.fetchall()
    str2=t[0][0]
    row = f'''
            <tr>
                <th>{str(d[2])}</th>
                <th>{str(d[3])}</th>
                <th>{str1}</th>
                <th><img alt="imagen" src={str2} width="160" height="120"></th>
            </tr>
        '''
    print(row)
b2='''
</table>
</div>
</body>
</html>
'''
print(b2)