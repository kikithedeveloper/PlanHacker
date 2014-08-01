from clockwork import clockwork
  
api = clockwork.API("016a39b73b7e27cebd8b2ea453dad0753babf0d4") 
message = clockwork.SMS(to = "+14085642115", message = "Hello World")
response = api.send(message)
  
if response.success:
    print (response.id)
else:
    print (response.error_code)
    print (response.error_description)