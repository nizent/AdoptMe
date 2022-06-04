#!C:\Users\nicol\AppData\Local\Programs\Python\Python38-32\python.exe
# -*- coding: utf-8 -*-

import cgi
import cgitb
cgitb.enable(display=0, logdir='.')
import html
import codecs
import sys
import pymysql
import json
import html

print('Content-type: text/html; charset=UTF-8')
print('')

# Obtiene los datos por post
datos = cgi.FieldStorage()  # get, post
if 'com' in datos:
    comuna = html.escape(datos.getvalue('com'))
    conn = pymysql.connect(
        db='tarea2',
        user='root',
        passwd='',
        host='localhost',
        charset='utf8')
    c = conn.cursor()
    sql = f'''SELECT M.id,  F.nombre_archivo, T.nombre, M.edad, M.color, M.esterilizado, M.vacunas_al_dia FROM comuna C, domicilio D, mascota_domicilio M, foto_mascota F, tipo_mascota T WHERE C.nombre="{comuna}" AND C.id=D.comuna_id AND M.domicilio_id=D.id AND T.id=M.tipo_mascota_id AND F.mascota_domicilio_id=M.id GROUP BY M.id'''
    resultado = c.execute(sql)
    tabla1=c.fetchall()
    conn.commit()
    conn.close()
    k=0
    msg={}
    for comuna in tabla1:
        msg[k]=list(comuna)
        k+=1
    print(json.dumps(msg))
else:
    print('ERROR EN CONSULTA')
