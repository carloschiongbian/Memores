import pymysql
import os
from dotenv import load_dotenv


dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '.env'))
load_dotenv(dotenv_path)

#create default admin account 
new_conn = pymysql.connect(
    host =  os.environ.get('DATABASE_HOST'),
    user =  os.environ.get('DATABASE_USER'),
    passwd = os.environ.get('DATABASE_PASSWORD'),
    database = "memores_v2",
    charset = "utf8mb4",
    cursorclass = pymysql.cursors.DictCursor
)
insert_cursor = new_conn.cursor()

testImage = "b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x034\x00\x00\x018\x08\x06\x00\x00\x00\x8d/\xb6%\x00\x00\x00\x01sRGB\x00\xae\xce\x1c\xe9\x00\x00\x00\tpHY ... (58557 characters truncated) ... xmp:CreatorTool>Canva</xmp:CreatorTool>\n </rdf:Description>\n</rdf:RDF>\n</x:xmpmeta>\n<?xpacket end=\'r\'?>\xfd\x1e3Q\x00\x00\x00\x00IEND\xaeB`\x82"
password = "$2b$12$zfYz/eR0OnEoOAsO2V2UJOcXSW4CMEqCPEXqS/af0CUrXbEDjXsv6"
sql_insert_query = "INSERT INTO `users` (`uname`,`pwd`,`role`,`fname`,`lname`,`email`,`phone`,`bday`,`gender`,`photo`,`license`,`license_id`,`street`,`city`,`country`,`zip`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
insert_values = ("memores", password, "admin", "admin", "admin", "memores_admin@gmail.com", "000000", "2022-10-27", "male", "uploads\default-admin.png", testImage, "0000", "No Address", "No city", "No country", "0000")
insert_cursor.execute(sql_insert_query, insert_values)

sql_insert_query_2 = "INSERT INTO `users` (`uname`,`pwd`,`role`,`fname`,`lname`,`email`,`phone`,`bday`,`gender`,`photo`,`license`,`license_id`,`street`,`city`,`country`,`zip`) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
insert_values_2 = ("user", password, "user", "admin", "admin", "user@gmail.com", "000000", "2022-10-27", "male", "uploads\default-admin.png", testImage, "0000", "No Address", "No city", "No country", "0000")
insert_cursor.execute(sql_insert_query_2, insert_values_2)

new_conn.commit()
new_conn.close()

