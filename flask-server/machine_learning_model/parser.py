# Necessary imports
# helps for scientific computing: ndarray, etc.
import numpy as np

# helps create new data structure called data frames
import pandas as pd
import scipy.stats as stats

# import sklearn # not used
import pickle

class SVM_Model():

    # the 1D array to be passed to predict method
    final = []
    # the path of the pickled model and csv file (dataset) 
    # must be relative to the flask-server directory
    model_path = 'machine_learning_model/svm_model.pkl'

    def __init__(self, data):
        self.data = data
        # Load data from the CSV File
        self.sad_df = pd.read_csv('machine_learning_model/dataset.csv')


    def parse_request_object(self):
        # WE NEED TO PARSE THE PASSED DATA (OR THE ANSWER), SINCE IT CONTAINS 
        # RAW DATA DURING THE SCREENING ASSESSMENT, WE HAVE TO GET THE TOTAL
        # SCORE FOR THE LSAS AND SPIN SECTIONS, WHILE RETAINING THE VALUES
        # OF THE OTHER SECTIONS.
        LSAS_performance_total = 0
        LSAS_social_total = 0
        SPIN_total = 0

        parsed_data = {}
        # sum the LSAS and SPIN scores
        for attr, value in self.data.items():
            if "performance" in attr:
                LSAS_performance_total += value
            
            elif "social" in attr:
                LSAS_social_total += value
            
            elif "SPIN" in attr:
                SPIN_total += value
            
            # retain the values of other section
            else:
                parsed_data[attr] = value 


        LSAS_total = LSAS_performance_total + LSAS_social_total

        parsed_data["LSAS"] = LSAS_total
        parsed_data["SPIN"] = SPIN_total

        # NOW, THE parsed_data object SHOULD LOOK LIKE THE FF:
        #           
        #       {
        #           "AGE": <age>,
        #           ...     <---- other attributes of the passed answer, i.e, EducationalLevel, ATF, gender
        #           "LSAS": <lsas_score>,
        #           "SPIN": <spin_score>
        #       }
        # print(parsed_data)
        self.data = parsed_data
        return parsed_data


    #########################################################################
    # SINCE THE parsed_data STILL CONTAINS RAW DATA, DESPITE SUMMING ALL THE
    # LSAS AND SPIN SCORES, WE HAVE TO SCALE THE ANSWERS USING (STANDARDIZATION)
    # BECAUSE DURING THE TRAINING, WE SCALED THE FEATURES. WE HAVE TO BE CONSISTENT
    # THAT IS WHY WE ALSO HAVE TO NORMALIZE THE parsed_data.

    # I am just copy pasting the code inside my jupyter notebook 
    #   except for the feature scaling and feature selection.
    #   For feature scaling, instead of scaling the data set, we are scaling the
    #   parsed_data. We do not need to re-scale the data set because it is already
    #   done during the training.
    #   
    #   For feature selection, we already selected the features to be used for the
    #   model during the training, so we just skip it and just manual get the 
    #   relevant features used by the model.
    def standardize(self):
        # Data preprocessing: performing median imputation
        stats.norm.pdf(self.sad_df['LSAS'].sort_values(), np.mean(self.sad_df['LSAS']), np.std(self.sad_df['LSAS']))
        self.sad_df['LSAS'].fillna(inplace = True, value = self.sad_df['LSAS'].median())
        
        # Feature Scaling: Standardization
        self.data['AGE'] = (self.data['AGE'] - self.sad_df['Age'].mean()) / np.std(self.sad_df['Age'])
        self.data['EducationLevel'] = (self.data['EducationLevel'] - self.sad_df['EducationLevel'].mean()) / np.std(self.sad_df['EducationLevel'])
        self.data['Occupation'] = (self.data['Occupation'] - self.sad_df['Occupation'].mean()) / np.std(self.sad_df['Occupation'])
        self.data['ATF'] = (self.data['ATF'] - self.sad_df['ATF'].mean()) / np.std(self.sad_df['ATF'])
        self.data['EAF'] = (self.data['EAF'] - self.sad_df['EAF'].mean()) / np.std(self.sad_df['EAF'])
        self.data['TKF'] = (self.data['TKF'] - self.sad_df['TKF'].mean()) / np.std(self.sad_df['TKF'])
        self.data['CMT'] = (self.data['CMT'] - self.sad_df['CMT'].mean()) / np.std(self.sad_df['CMT'])
        self.data['DEF'] = (self.data['DEF'] - self.sad_df['DEF'].mean()) / np.std(self.sad_df['DEF'])
        self.data['SMF'] = (self.data['SMF'] - self.sad_df['SMF'].mean()) / np.std(self.sad_df['SMF'])
        self.data['ERF'] = (self.data['ERF'] - self.sad_df['ERF'].mean()) / np.std(self.sad_df['ERF'])
        self.data['DAF'] = (self.data['DAF'] - self.sad_df['DAF'].mean()) / np.std(self.sad_df['DAF'])
        self.data['SPIN'] = (self.data['SPIN'] - self.sad_df['SPIN'].mean()) / np.std(self.sad_df['SPIN'])
        self.data['LSAS'] = (self.data['LSAS'] - self.sad_df['LSAS'].mean()) / np.std(self.sad_df['LSAS'])

        # print(self.data)
        return self.data

    # Feature Selection is skipped because we already have selected the features when we trained the model
    # Note: Order matters because this is what the model will use
    def parse_answers(self):
        relevant_features = ["DAF", "DEF", "TKF", "LSAS", "TR",	"EAF", "SPIN", "SMF", "ERF", "ATF", "CMT", "SW"]

        # WE HAVE TO PARSE THE ANSWERS FROM THE parsed_data object. HERE, 
        # WE WILL ONLY GET THE KEY/VALUE PAIRS INSIDE parsed_data object WHICH
        # ARE PRESENT IN THE relevant_features, WHILE OTHERS WILL BE DROPPED.
        parsed_answers = {}
        for element in relevant_features:
            for attr, value in self.data.items():
                if element == attr:
                    parsed_answers[element] = value
                    break

        # THIS TIME, WE HAVE TO TRANSFORM THE parsed_answers object INTO A 1D ARRAY
        # BECAUSE THE METHOD PREDICT REQUIRES A 2D ARRAY INPUT.
        final = []
        for attr, value in parsed_answers.items():
            final.append(value)
        # print(final)

        self.final = final
        return final


    def predict(self):
        # WE LOAD THE MODEL THAT WE USED FOR TRAINING
        model = pickle.load(open(self.model_path, 'rb'))
        prediction = model.predict([ self.final ])
        classification = prediction[0]

        probabilities = model.predict_proba([ self.final ])
        prob_for_class_0 = probabilities[0][0]
        prob_for_class_1 = probabilities[0][1]

        # THEN WE RETURN THE prediction AND probabilities
        if classification == 1:
            return classification, prob_for_class_1
        
        return classification, prob_for_class_0

        