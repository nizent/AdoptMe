#!C:\Users\nicol\AppData\Local\Programs\Python\Python38-32\python.exe
# -*- coding: utf-8 -*-

import cgi, os
import cgitb
cgitb.enable(display=0, logdir='.')
import mysql.connector as pymysql
import re
import json
import html
import codecs
import sys
import hashlib

# conexion a base de datos
conn = pymysql.connect(
    db='tarea2',
    user='root',
    passwd='',
    host='localhost',
    charset='utf8')
c = conn.cursor()


print('Content-type: text/html; charset=UTF-8')
print('')

sql="SELECT C.nombre, COUNT(F.id) FROM comuna C, domicilio D, mascota_domicilio M, foto_mascota F WHERE D.comuna_id=C.id AND M.domicilio_id=D.id AND F.mascota_domicilio_id=M.id GROUP BY C.nombre"
data=c.execute(sql)
data=c.fetchall()
conn.commit()

#generar diccionario
k=0
msg={}
for comuna in data:
    msg[k]=list(comuna)
    k+=1
print(json.dumps(msg))
c.close()