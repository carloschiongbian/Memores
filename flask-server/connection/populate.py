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
INSERT INTO `questions` (`id`, `section`, `text_option`, `acronym`, `options`) VALUES
(1, 'demographic', 'How old is the patient?', 'AGE', NULL),
(2, 'demographic', 'What is the highest educational level attained by the patient?', 'EducationLevel', 'High School (1), Diploma (2), Undergraduate (3), Bachelor’s Degree (4), Master’s Degree (5), Post-Graduate (6)'),
(3, 'demographic', 'What is the gender of the patient?', 'gender', 'Male (1), Female (0)'),
(4, 'demographic', 'Does the patient have a family history of anxiety or depression?', 'HasFamilyHistory', 'Yes (1), No (0)'),
(5, 'demographic', 'What is the current occupational status of the patient?', 'Occupation', 'Student (1), Faculty member (2), Employee (3), Self-employed (4), Unemployed (5)'),
(6, 'emotional', 'On a scale of 0 to 10, how anxious is the patient of being at the center of attention?', 'ATF', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10'),
(7, 'emotional', 'On a scale of 0 to 10, how anxious is the patient of eating in front of another person in public?', 'EAF', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10'),
(8, 'emotional', 'On a scale of 0 to 10, how anxious is the patient of speaking in public places?', 'TKF', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10'),
(9, 'emotional', 'On a scale of 0 to 10, how anxious is the patient about the idea of attending parties?', 'CMT', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10'),
(10, 'emotional', 'On a scale of 0 to 10, how anxious is the patient about himself/herself while eating and drinking in public places?', 'DEF', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10'),
(11, 'emotional', 'On a scale of 0 to 10, how anxious is the patient when meeting and contacting any person outside of his or her circle?', 'SMF', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10'),
(12, 'emotional', 'On a scale of 0 to 10, how anxious is the patient when getting inside a room where there are already people sitting?', 'ERF', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10'),
(13, 'emotional', 'On a scale of 0 to 10, how anxious is the patient about a situation where he or she gets into any disagreement with other people?', 'DAF', '0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10'),
(14, 'physical', 'Does the patient experience heart palpitations whenever there are people outside of his or her circle?', 'HR', 'Yes (1), No (0)'),
(15, 'physical', 'Does the patient experience any sweating to events where his or her existence is noticeable?', 'SW', 'Yes (1), No (0)'),
(16, 'physical', 'Does the patient usually feel tremor or any involuntary muscle contraction (shaking) whenever he or she deals with other people?', 'TR', 'Yes (1), No (0)'),
(17, 'physical', 'Does the patient experience dry mouth whenever he or she talks to other people?', 'DR', 'Yes (1), No (0)'),
(18, 'physical', 'Does the patient usually experience a shortness of breath whenever he or she speaks in front of a crowd?', 'BR', 'Yes (1), No (0)'),
(19, 'physical', 'Does the patient usually feel suffocated when surrounded by people?', 'CK', 'Yes (1), No (0)'),
(20, 'physical', 'Does the patient feel pain on his or her chest whenever he or she gets into a petty disagreement with other people outside his or her circle?', 'CP', 'Yes (1), No (0)'),
(21, 'physical', 'Does the patient usually feel any gastrointestinal discomfort or nausea after dealing with strangers in public places?', 'NS', 'Yes (1), No (0)'),
(22, 'physical', 'Does the patient feel dizzy and/or weak every time he or she spends so much time with other people?', 'DZ', 'Yes (1), No (0)'),
(23, 'physical', 'Does the patient ever have a feeling of being unreal or detached from his or her surroundings including his or her friends and family?', 'UR', 'Yes (1), No (0)'),
(24, 'physical', 'Does the patient ever have a fear of losing balance whenever standing in front of the crowd even when unnoticed?', 'UB', 'Yes (1), No (0)'),
(25, 'physical', 'Does the patient ever fear going crazy due to the uncomfortable feelings he or she feels when dealing with other people?', 'MD', 'Yes (1), No (0)'),
(26, 'physical', 'Does the patient ever make a long, low sound expressing discomfort whenever he or she finds himself or herself in public places?', 'TG', 'Yes (1), No (0)'),
(27, 'SPIN', 'Is the patient afraid of people in authority?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(28, 'SPIN', 'Is the patient bothered by blushing in front of people?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(29, 'SPIN', 'Is the patient anxious about the idea of parties and social events?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(30, 'SPIN', 'Does the patient avoid talking to people he or she doesn’t personally know?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(31, 'SPIN', 'Is the patient anxious of being criticized?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(32, 'SPIN', 'Does the patient avoid doing things or speaking to people due to his or her fear of getting embarrassed?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(33, 'SPIN', 'Does the patient feel distressed when sweating in front of the crowd?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(34, 'SPIN', 'Does the patient usually avoid going to parties and crowded events?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(35, 'SPIN', 'Does the patient usually stay lowkey and avoid doing things that make his or her existence be in the spotlight?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(36, 'SPIN', 'Does the patient get anxious when talking to people outside his or her circle?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(37, 'SPIN', 'Does the patient dislike giving speeches in an event or in any situation?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(38, 'SPIN', 'Will the patient do anything just to avoid being criticized by other people?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(39, 'SPIN', 'Is the patient bothered by having random heart palpitations when surrounded by people?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(40, 'SPIN', 'Is the patient afraid of doing things that people might be watching?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(41, 'SPIN', 'Is looking stupid and being embarrassed among the patient’s worst fears?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(42, 'SPIN', 'Will the patient do anything just to avoid speaking to anyone in authority?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(43, 'SPIN', 'Does the patient feel distressed when he or she finds himself or herself trembling in front of others?', 'SPIN', 'Not at all (0), A little bit (1), Somewhat (2), Very Much (3), Extremely (4)'),
(44, 'LSAS', 'Speaking on the telephone in a public place', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(45, 'LSAS', 'Having a discussion with a few others', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(46, 'LSAS', 'Eating in public places', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(47, 'LSAS', 'Drinking with others in public places', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(48, 'LSAS', 'Talking to people in authority', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(49, 'LSAS', 'Acting, performing, or speaking in front of a large audience', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(50, 'LSAS', 'Going to a party that you are invited to', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(51, 'LSAS', 'Working while being observed', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(52, 'LSAS', 'Writing while being observed', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(53, 'LSAS', 'Calling someone you do not know very well', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(54, 'LSAS', 'Talking with people you do not know very well', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(55, 'LSAS', 'Meeting with people outside your average circle', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(56, 'LSAS', 'Urinating in a public restroom with others inside', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(57, 'LSAS', 'Entering a room where others are already inside', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(58, 'LSAS', 'Being under the spotlight or center of attention', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(59, 'LSAS', 'Speaking from your seat or standing up in a large meeting', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(60, 'LSAS', 'Taking a written test', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(61, 'LSAS', 'Expressing appropriate disagreement to people you do not know very well', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(62, 'LSAS', 'Looking at people you do not know very well in the eyes', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(63, 'LSAS', 'Giving an oral report to a small group of people', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(64, 'LSAS', 'Attempting to initiate a relationship with a stranger', 'performance', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(65, 'LSAS', 'Returning an item to a store', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(66, 'LSAS', 'Giving an average party to people including friends and family', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)'),
(67, 'LSAS', 'Resisting a high pressure salesperson', 'social', 'None (0), Mild (1), Moderate (2), Severe (3) / Never (0), Occasionally (1), Often (2), Usually (3)');""")

my_db.commit()
my_db.close()