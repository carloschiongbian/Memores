import pymysql
import os
from dotenv import load_dotenv

dotenv_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '.env'))
load_dotenv(dotenv_path)

my_db = pymysql.connect(
    host =  os.environ.get('DATABASE_HOST'),
    user =  os.environ.get('DATABASE_USER'),
    passwd= os.environ.get('DATABASE_PASSWORD'),
    database="memores_v2"
)
my_cursor = my_db.cursor()

my_cursor.execute("""
INSERT INTO `patients`(`id`, `fname`, `lname`, `age`, `email`, `phone`, `bday`, `gender`, `street`, `city`, `country`, `zip`, `created_at`, `updated_at`) VALUES 
('1','Robin','Hood','25','robinhood@mail.com','09170910917','May 23, 1994','Male','Cameolot','Camelot','Camelot','0000','',''),
('2','Tony','Stark','40','tonystark@mail.com','09170912567','April 14, 1994','Male','8th Street','Avengers Tower','USA','0000','',''),
('3','Peter','Parker','18','peterparker@mail.com','09172910917','March 13, 1994','Male','34th and 50th','Queens','USA','0000','',''),
('4','Sara','Simsom','29','sarasimsom@mail.com','09170918927','January 17, 1994','Female','Loals','New Jersey','USA','0000','',''),
('5','Jim','Carrey','52','jimcarrey@mail.com','09170910999','June 01, 1994','Male','Highway','Los Angeles','USA','0000','',''),
('6','Ethan','Hunt','39','ethanhunt@mail.com','09170938265','July 03, 1994','Male','Banilad','Cebu City','Philippines','0000','','')
""")

my_cursor.execute("""
INSERT INTO `patients_screening_details`(`id`, `patient_id`, `patient_notes`, `results`, `screened_by`, `last_edited_by`, `screened_date`, `screened_time`, `last_edited_on`, `created_at`, `updated_at`) VALUES 
('1','1','This patient shows signs of SAD','has SAD','Dr. Strange','Dr. Murphy','April 3, 2022','','June 3, 2022','',''),
('2','2','This patient shows symptoms but does not have SAD','has no SAD','Dr. Holmes','Dr. Poller','April 4, 2022','','June 5, 2022','',''),
('3','3','This patient has SAD','has SAD','Dr. Scrubs','Dr. Logan','April 5, 2022','','June 3, 2022','',''),
('4','4','This patient is screened with SAD','has severe SAD','Dr. Serg','Dr. Krop','July 1, 2022','','July 4, 2022','',''),
('5','5','This patient shows symptoms but does not have SAD','has no SAD','Dr. Tan','Dr. Poller','July 10, 2022','','July 18, 2022','',''),
('6','6','This patient does not display symptoms of SAD','has no SAD','Dr. Law','Dr. Logan','March 6, 2022','','March 10, 2022','','')
""")

# my_cursor.execute("""
# ALTER TABLE patient_screening_details
# ADD FOREIGN KEY (patient_id) REFERENCES patients(id);
# """)


my_db.commit()
my_db.close()