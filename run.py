import os
import sys
print("Current working directory:", os.getcwd())
print("Python path:", sys.path)

from autoschedule_app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)