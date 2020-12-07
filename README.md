# polling_app
how to run:

#create a virtualenv
python3.6 -m venv venv

#activate venv
source venv/bin/activate

cd polls/
pip install -r requirements.txt

#create db
python manage.py makemigrations
python manage.py migrate

#run backend
python manage.py runserver

# frontend
cd ../frontend/

#install dependencies
npm install

#start development server
npm start
