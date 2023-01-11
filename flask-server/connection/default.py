import pymysql
import os
from dotenv import load_dotenv


dotenv_path = os.path.abspath(os.path.join(
    os.path.dirname(__file__), '..', '.env'))
load_dotenv(dotenv_path)

# create default admin account
new_conn = pymysql.connect(
    host=os.environ.get('DATABASE_HOST'),
    user=os.environ.get('DATABASE_USER'),
    passwd=os.environ.get('DATABASE_PASSWORD'),
    database="memores_v2",
    charset="utf8mb4",
    cursorclass=pymysql.cursors.DictCursor
)
insert_cursor = new_conn.cursor()

testImage = ""
password = "$2b$12$zfYz/eR0OnEoOAsO2V2UJOcXSW4CMEqCPEXqS/af0CUrXbEDjXsv6"
sql_insert_query = "INSERT INTO `users` (`uname`,`pwd`,`role`,`fname`,`lname`,`email`,`phone`,`bday`,`gender`,`photo`,`license`,`license_id`,`street`,`city`,`country`,`zip`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
insert_values = ("memores", password, "admin", "admin", "admin", "memores_admin@gmail.com", "000000", "2022-10-27",
                 "male", "static\default-admin.png", testImage, "0000", "No Address", "No city", "No country", "0000")
insert_cursor.execute(sql_insert_query, insert_values)

sql_insert_query = "INSERT INTO `users` (`uname`,`pwd`,`role`,`fname`,`lname`,`email`,`phone`,`bday`,`gender`,`photo`,`license`,`license_id`,`street`,`city`,`country`,`zip`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
insert_values = ("user", password, "user", "user", "user", "user@gmail.com", "000000", "2022-04-17",
                 "male", "static\default-admin.png", testImage, "0000", "No Address", "No city", "No country", "0000")
insert_cursor.execute(sql_insert_query, insert_values)

new_conn.commit()
new_conn.close()
