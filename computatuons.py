# ver.0 of computations - Determine line of best fit across all numerical variables & strength of correlation

# The first step in this process is to determine a line of best fit between two variables and determine strength of correlation. Use the least squares
# regression line. Spreadsheets less than 500k rows optimal. pandas library should be implemented to more sections of code if data exceeds 500k rows.

# Not sure how to get input, csv file, assume data is 'tidy'

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def find_line_best_fit(csv_file, column1: tuple[int, str], column2: tuple[int, str]) -> float:
    """Return a tuple value:[type of correlation (ex. linear), correlation coefficient]
    
        Arguments:
        column1[0] and column2[0] are int values rep. column from left to right.
        column1[1] and column2[1] are str which rep. name of variable within column

        Types of correlation: linear, exponential"""
        