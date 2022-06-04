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

sql="SELECT T.nombre, COUNT(M.id) FROM tipo_mascota T, mascota_domicilio M WHERE M.tipo_mascota_id=T.id GROUP BY T.nombre"

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