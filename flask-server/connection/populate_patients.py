import pymysql
import os
from dotenv import load_dotenv

dotenv_path = os.path.abspath(os.path.join(
    os.path.dirname(__file__), '..', '.env'))
load_dotenv(dotenv_path)

my_db = pymysql.connect(
    host=os.environ.get('DATABASE_HOST'),
    user=os.environ.get('DATABASE_USER'),
    passwd=os.environ.get('DATABASE_PASSWORD'),
    database="memores_v2"
)
my_cursor = my_db.cursor()

my_cursor.execute("""
INSERT INTO `patients` (`id`, `fname`, `lname`, `fullname`, `email`, `phone`, `age`, `bday`, `gender`, `street`, `city`, `country`, `zip`, `registered_date`, `created_by`, `updated_at`) VALUES
(1, 'Robin', 'Crowe', 'Robin Crowe', 'robinhood@mail.com', '09170910917', 25, '0000-00-00 00:00:00', 'Male', 'Cameolot', 'Camelot', 'Camelot', '0000', '2022-04-03 00:00:00', '2', '0000-00-00 00:00:00'),
(2, 'Tony', 'Crowe', 'Tony Crowe', 'tonystark@mail.com', '09170912567', 40, '0000-00-00 00:00:00', 'Male', '8th Street', 'Avengers Tower', 'USA', '0000', '2022-04-04 00:00:00', '3', '0000-00-00 00:00:00'),
(3, 'Peter', 'Crowe', 'Peter Crowe', 'peterparker@mail.com', '09172910917', 18, '0000-00-00 00:00:00', 'Male', '34th and 50th', 'Queens', 'USA', '0000', '2022-04-05 00:00:00', '3', '0000-00-00 00:00:00'),
(4, 'Sara', 'Crowe', 'Sara Crowe', 'sarasimsom@mail.com', '09170918927', 29, '0000-00-00 00:00:00', 'Female', 'Loals', 'New Jersey', 'USA', '0000', '2022-07-03 00:00:00', '2', '0000-00-00 00:00:00'),
(5, 'Jim', 'Carrey', 'Jim Carrey', 'jimcarrey@mail.com', '09170910999', 52, '0000-00-00 00:00:00', 'Male', 'Highway', 'Los Angeles', 'USA', '0000', '2022-07-10 00:00:00', '2', '0000-00-00 00:00:00'),
(6, 'Ethan', 'Hunt', 'Ethan Hunt', 'ethanhunt@mail.com', '09170938265', 39, '0000-00-00 00:00:00', 'Male', 'Banilad', 'Cebu City', 'Philippines', '0000', '2022-03-06 00:00:00', '2', '0000-00-00 00:00:00'),
(7, 'Shionne', 'Imerys', 'Shionne Imerys', 'shionne@imerys.com', '21234567890', 22, '2022-10-23 21:39:16', 'Female', 'Aball, Village of Longing', 'Eastgand', 'Philippines', '6014', '2022-10-23 21:39:16', '4', '0000-00-00 00:00:00'),
(8, 'Velvet', 'Crowe', 'Velvet Crowe', 'velvet@crowe.com', '09271231234', 22, '2022-10-23 21:39:16', 'Female', 'Aball, Village of Longing', 'Eastgand', 'Philippines', '6014', '2022-10-23 21:39:16', '2', '0000-00-00 00:00:00'),
(9, 'Edna', 'Hershel', 'Edna Hershel', 'edna@hershel.com', '123123123', 17, '2022-10-23 21:44:25', 'Female', 'Street', 'Cityy', 'Countryy', '1234', '2022-10-23 21:44:25', '4', '0000-00-00 00:00:00'),
(10, 'Eleanor', 'Hume', 'Eleanor Hume', 'eleanor@hume.com', '098098901', 45, '2022-10-23 21:44:25', 'Female', 'Sttawe', 'Cptyu', 'Ctryiow', '12355', '2022-10-23 21:44:25', '4', '0000-00-00 00:00:00'),
(11, 'Celica', 'Crowe', 'Celica Crowe', 'celica@crowe.com', '8762391245', 38, '2022-10-23 21:44:25', 'Female', 'Opwief', 'Powefo', 'efwfwaewr', '12356', '2022-10-23 21:44:25', '4', '0000-00-00 00:00:00'),
(12, 'Artorius', 'Collbrande', 'Artorius Collbrande', 'artorius@collbrande.com', '09867634542', 67, '2022-10-11 21:44:25', 'Male', 'ADwedfwae', 'Rawert', 'WRRRfawef', '01234', '2022-10-12 21:44:25', '3', '0000-00-00 00:00:00'),
(13, 'Melchior', 'Mayvin', 'Melchior Mayvin', 'melchior@mayvin.com', '09871263415', 187, '2022-10-09 21:44:25', 'Male', 'AFawdf', 'Efwfw', 'WWewrwefw', '66126', '2022-10-16 21:44:25', '2', '0000-00-00 00:00:00'),
(14, 'Oscar', 'Dragonia', 'Oscar Dragonia', 'oscar@dragonia.com', '8871923124', 31, '2022-10-22 21:44:25', 'Male', 'Poiwf', 'Lkwiekf', 'QAwefef', '623443', '2022-10-22 21:44:25', '2', '0000-00-00 00:00:00'),
(15, 'Teresa', 'Linares', 'Teresa Linares', 'teresa@linares.com', '098375123', 23, '2022-10-20 21:44:25', 'Female', 'Streettwat', 'Ciwtety', 'Cowunettrry', '01234', '2022-10-17 21:44:25', '2', '0000-00-00 00:00:00'),
(16, 'Van', 'Aifread', 'Van Aifread', 'van@aifread.com', '99823412323', 77, '2022-10-15 21:44:25', 'Male', 'Streepot', 'Ciwetay', 'Countawtry', '761263', '2022-10-18 21:44:25', '4', '0000-00-00 00:00:00'),
(17, 'Laphicet', 'Crowe', 'Laphicet Crowe', 'laphicet@crowe.com', '09876612341', 13, '2022-10-03 21:44:25', 'Male', 'Streawert', 'Ciwieawty', 'Cotrunuyu', '8678', '2022-10-20 21:44:25', '3', '0000-00-00 00:00:00'),
(18, 'Vholran', 'Igniseri', 'Vholran Igniseri', 'vholran@igniseri.com', '7890876523', 53, '2022-10-17 21:44:25', 'Male', 'Streeeet123', 'City2y3', 'Counawtry', '09823', '2022-10-16 21:44:25', '3', '0000-00-00 00:00:00'),
(19, 'Rinwell', 'Maxwell', 'Rinwell Maxwell', 'rinwell@maxwell.com', '0987126345', 42, '2022-10-22 21:44:25', 'Female', 'Killjoywef', 'Jokykill', 'Valoweawaenty', '4412', '2022-10-17 21:44:25', '2', '0000-00-00 00:00:00'),
(20, 'Farah', 'Oersted', 'Farah Oersted', 'farah@oersted.com', '09876523124', 16, '2022-10-15 21:53:37', 'Female', 'Strepeto', 'Cpaweifei', 'Liokaweit', '1244', '2022-10-12 21:53:37', '3', '0000-00-00 00:00:00')
""")

my_cursor.execute("""
INSERT INTO `patients_screening_details`(`id`, `assessment_id`, `patient_notes`, `sad_category`, `last_edited_by`, `last_edited_on`, `created_at`, `updated_at`) VALUES 
('1','1','Robin is normal', 'Normal', 'Dr. Murphy','2022-10-15 21:53:37','',''),
('2','2','Tony shows symptoms of severe SAD', 'Severe', 'Dr. Poller','2022-10-15 21:53:37','',''),
('3','3','Peter has moderate SAD', 'Moderate', 'Dr. Logan','2022-10-15 21:53:37','',''),
('4','4','Sara is screened with mild SAD', 'Mild','Dr. Krop','2022-10-15 21:53:37','',''),
('5','5','Jim is normal and does not have SAD', 'Normal', 'Dr. Poller','2022-10-15 21:53:37','',''),
('6','6','Ethan displays symptoms of mild SAD', 'Mild', 'Dr. Logan','2022-10-15 21:53:37','',''),
('7','7','Shionne is normal', 'Normal', 'Dr. Murphy','2022-10-15 21:53:37','',''),
('8','8','Velvet shows symptoms of severe SAD', 'Severe', 'Dr. Poller','2022-10-15 21:53:37','',''),
('9','9','Edna has moderate SAD', 'Moderate', 'Dr. Logan','2022-10-15 21:53:37','',''),
('10','10','Eleanor is screened with mild SAD', 'Mild','Dr. Krop','2022-10-15 21:53:37','',''),
('11','11','Celica is normal and does not have SAD', 'Normal', 'Dr. Poller','2022-10-15 21:53:37','',''),
('12','12','Artorius displays symptoms of mild SAD', 'Mild', 'Dr. Logan','2022-10-15 21:53:37','',''),
('13','13','Melchior is normal', 'Normal', 'Dr. Murphy','2022-10-15 21:53:37','',''),
('14','14','Oscar shows symptoms of severe SAD', 'Severe', 'Dr. Poller','2022-10-15 21:53:37','',''),
('15','15','Teresa has moderate SAD', 'Moderate', 'Dr. Logan','2022-10-15 21:53:37','',''),
('16','16','Van is screened with mild SAD', 'Mild','Dr. Krop','2022-10-15 21:53:37','',''),
('17','17','Laphicet is normal and does not have SAD', 'Normal', 'Dr. Poller','2022-10-15 21:53:37','',''),
('18','18','Vholran displays symptoms of mild SAD', 'Mild', 'Dr. Logan','2022-10-15 21:53:37','',''),
('19','19','Rinwell is normal and does not have SAD', 'Normal', 'Dr. Poller','2022-10-15 21:53:37','',''),
('20','20','Farah displays symptoms of mild SAD', 'Mild', 'Dr. Logan','2022-10-15 21:53:37','','')
""")

my_db.commit()
my_db.close()
