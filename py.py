import os
import json
from datetime import datetime, timedelta

# Correct file directory (update this if your JSON files are inside a specific folder)
file_directory = "./public/api/horoscopes/"  # Change this if needed

# List of existing horoscope files
uploaded_files = [
    "weekly-horoscopes-2024-09-39.json",  # Ensure this file is inside `public/api/`
]

# Get today's date and the start of the current week (Monday)
current_date = datetime.today()
current_week_start = current_date - timedelta(days=current_date.weekday())
num_weeks = 8  # Number of weeks to generate

# Store paths of generated files
future_horoscope_files = []

for week_offset in range(num_weeks):
    # Calculate new week's start and end dates
    new_week_start = current_week_start + timedelta(weeks=week_offset)
    new_week_end = new_week_start + timedelta(days=6)

    # Construct full path for the file
    file_path = os.path.join(file_directory, uploaded_files[0])

    # Load an existing file as a template
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: File {file_path} not found. Ensure the correct file path.")
        continue

    # Update JSON data with the new week's dates
    data["weekStart"] = new_week_start.strftime("%Y-%m-%d")
    data["weekEnd"] = new_week_end.strftime("%Y-%m-%d")

    # Generate a new file name
    new_file_name = f"weekly-horoscopes-{new_week_start.strftime('%Y-%m-%d')}.json"
    new_file_path = os.path.join(file_directory, new_file_name)

    # Save the updated file
    with open(new_file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    future_horoscope_files.append(new_file_path)

print("Generated files:", future_horoscope_files)
