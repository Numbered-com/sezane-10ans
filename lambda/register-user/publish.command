rm -f function.zip && zip -r function.zip . && aws lambda update-function-code --function-name 10ans-register-user --zip-file fileb://function.zip