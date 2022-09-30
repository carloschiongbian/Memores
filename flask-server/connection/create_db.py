import pymysql
import os
from dotenv import load_dotenv

dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '.env'))
load_dotenv(dotenv_path)

my_db = pymysql.connect(
    host =  'localhost',
    user =  'root',
    passwd= ''
)
my_cursor = my_db.cursor()

my_cursor.execute("CREATE DATABASE memores_v2")

