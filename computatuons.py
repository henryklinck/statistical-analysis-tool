# ver.0 of computations - Determine line of best fit across all numerical variables & strength of correlation

# The first step in this process is to determine a line of best fit between two variables and determine strength of correlation. Use the least squares
# regression line. Spreadsheets less than 500k rows optimal. pandas library should be implemented to more sections of code if data exceeds 500k rows.

# Not sure how to get input, csv file, assume data is 'tidy'

from cProfile import label
import numpy as np
import pandas as pd
# import matplotlib.pyplot as plt

csv_file = input("Input Dataset (Path):")

def determine_pearson_coefficient(csv_file, column1: tuple[int, str], column2: tuple[int, str]) -> tuple[str,float]:
    """ Return a float value rep. the pearson coefficient between the listed variables"""
    
    data = pd.read_csv(csv_file)

    x_var = data[column1[1]].values
    y_var = data[column2[1]].values

    # mean x var and y var
    mean_x = np.mean(x_var)
    mean_y = np.mean(y_var)

    # Total number of values
    n = len(x_var)

    sum = 0

    for i in range(n):
        sum += ((x_var[i] - mean_x) * (y_var[i] - mean_y))

    # Covariant value
    covar = sum/(n-1)

    # Pearson's correlation coefficient
    return ("Pearson's Correlation Coefficient", (covar / (np.std(x_var) * np.std(y_var))))

"""
def find_r2_best_fit(csv_file, column1: tuple[int, str], column2: tuple[int, str]) -> tuple[str, float]:
    Return a tuple value:[type of correlation (ex. linear), r2 value of model]
    
        Arguments:
        csv_file containingt data set
        column1[0] and column2[0] are int values rep. column from left to right.
        column1[1] and column2[1] are str which rep. name of variable within column. column1 is the independent var*
 
    
    # Reading data
    data = pd.read_csv(csv_file)
    
    x_var = data[column1[1]].values
    y_var = data[column2[1]].values

    # mean x var and y var
    mean_x = np.mean(x_var)
    mean_y = np.mean(y_var)

    # Total number of values
    n = len(x_var)

    # Fit regression line
    numer = 0
    denom = 0
    for i in range(n):
        numer += (x_var[i] - mean_x) * (y_var[i] - mean_y)
        denom += (x_var[i] - mean_x) ** 2

    slope = numer / denom
    c = mean_y - (slope * mean_x)

    
    # Plotting Values and Regression line on Graph

    max_x = np.max(x_var) + 10
    min_x = np.min(x_var) - 10

    # calculating line values x and y
    x = np.linspace(min_x, max_x, 1000)
    y = c + (slope * x)

    # ploting line
    plt.plot(x, y, color='#58b970', label='Regression Line')
    # Plotting Scatter Points
    plt.scatter(x_var, y_var, c="#ef5423", label='Scatter Plot')

    plt.xlabel('"Height"')
    plt.ylabel("Weight")
    plt.legend()
    plt.show()
    

    # Calculating R2 Score
    ss_tot = 0
    ss_res = 0
    for i in range(n):
        y_pred = c + (slope * x_var[i])
        ss_tot += (y_var[i] - mean_y) ** 2
        ss_res += (y_var[i] - y_pred) ** 2
    r2 = 1 - (ss_res/ss_tot)
    print("R2 Score")
    print(r2)

    return (str(slope), c)

print(find_line_best_fit(csv_file, (1, "Weight"), (2, "Height")))
"""

print(determine_pearson_coefficient(csv_file, (1, "Weight"), (2, "Height")))