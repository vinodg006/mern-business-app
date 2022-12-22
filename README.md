### Instructions

One Time Processs:

	`$ npm install run-rs -g`
  
	`$ cd  backend`
  
	`$ npm i`
  
	`$ cd  frontend`
  
	`$ npm i`

Create .env file in backend repo and paste:

	PORT=2000
	MONGO_URI=mongodb://DESKTOP-0E0FP3P:27017,DESKTOP-0E0FP3P:27018,DESKTOP-0E0FP3P:27019?replicaSet=rs

Running Locally:

`$ run-rs -v 4.0.0 --shell` // Run this command outside project

Sample CMD

C:\Users\LENOVO>run-rs -v 4.0.0 --shell
Purging database...
Running 'C:\Users\LENOVO\AppData\Roaming\npm\node_modules\run-rs\4.0.0\mongod.exe' [ 27017, 27018, 27019 ]
Starting replica set...
Started replica set on "mongodb://DESKTOP-0E0FP3P:27017,DESKTOP-0E0FP3P:27018,DESKTOP-0E0FP3P:27019?replicaSet=rs"
Running mongo shell: C:\Users\LENOVO\AppData\Roaming\npm\node_modules\run-rs\4.0.0\mongo.exe
rs:PRIMARY>

### Replace MONGO_URI in .env with mongodb://DESK..... from this cmd 

	`$ cd  backend`
	`$ npm start`
	`$ cd  frontend`
	`$ npm start`
