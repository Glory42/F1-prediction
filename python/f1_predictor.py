import fastf1
import pandas as pd
import numpy as np
import json
import sys
from datetime import datetime, timedelta

def get_current_race_prediction():
    # Enable caching to speed up data loading
    fastf1.Cache.enable_cache('cache')
    
    # Get the current year
    current_year = datetime.now().year
    
    # Get the latest race session
    session = fastf1.get_session(current_year, 'last', 'Q')
    
    # Load the session data
    session.load()
    
    # Get qualifying results
    quali_results = session.results[['Driver', 'Q3']].copy()
    quali_results = quali_results.dropna()  # Remove drivers without Q3 time
    quali_results = quali_results.sort_values('Q3')  # Sort by qualifying time
    
    # Convert to JSON format
    result = {
        'race_name': session.event['EventName'],
        'qualifying_results': quali_results.to_dict('records')
    }
    
    return json.dumps(result)

def get_past_race_winners(year, race_name):
    # Enable caching to speed up data loading
    fastf1.Cache.enable_cache('cache')
    
    # Get the race session
    session = fastf1.get_session(year, race_name, 'R')
    
    # Load the session data
    session.load()
    
    # Get race results
    race_results = session.results[['Driver', 'Position']].copy()
    race_results = race_results.sort_values('Position')
    
    # Get qualifying results
    quali_session = fastf1.get_session(year, race_name, 'Q')
    quali_session.load()
    quali_results = quali_session.results[['Driver', 'Q3']].copy()
    quali_results = quali_results.dropna()
    quali_results = quali_results.sort_values('Q3')
    
    # Get the predicted winner (pole sitter) and actual winner
    predicted_winner = quali_results.iloc[0]['Driver']
    actual_winner = race_results.iloc[0]['Driver']
    
    result = {
        'race_name': race_name,
        'year': year,
        'predicted_winner': predicted_winner,
        'actual_winner': actual_winner,
        'qualifying_results': quali_results.to_dict('records'),
        'race_results': race_results.to_dict('records')
    }
    
    return json.dumps(result)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == '--current':
            print(get_current_race_prediction())
        elif sys.argv[1] == '--past' and len(sys.argv) > 3:
            year = int(sys.argv[2])
            race_name = sys.argv[3]
            print(get_past_race_winners(year, race_name))
    else:
        print(get_current_race_prediction()) 