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
import datetime

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
sql="SELECT MONTH(D.fecha_ingreso) AS month, YEAR(D.fecha_ingreso) AS year, COUNT(CASE T.nombre WHEN 'perro' then 1 else null end), COUNT(CASE T.nombre WHEN 'gato' then 1 else null end) FROM tipo_mascota T, mascota_domicilio M, domicilio D WHERE M.tipo_mascota_id=T.id AND M.domicilio_id=D.id AND (T.nombre='perro' OR T.nombre='gato') GROUP BY month, year"
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