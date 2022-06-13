# ver.0 of computations - Determine line of best fit across all numerical variables & strength of correlation

# The first step in this process is to determine a line of best fit between two variables and determine strength of correlation.

# Not sure how to get input, csv file, assume data is 'tidy'



def find_line_best_fit(csv_file, column1: tuple[int, str], column2: tuple[int, str]) -> float:
    """Return a tuple value:[type of correlation (ex. linear), correlation coefficient]
    
        Arguments:
        column1[0] and column2[0] rep. 


        Types of correlation: linear, exponential"""