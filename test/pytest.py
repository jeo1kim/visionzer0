import os 
import time 
import _thread
# pip install WebSocket-client 
import WebSocket
# pip install predix
import predix.security.uaa

def get_auth_token(uaa_id):

	uaa_uri = 'https://auth.aa.cityiq.io/oauth/token' 
	os.environ['PREDIX_SECURITY_UAA_URI'] = uaa_uri 
	uaa = predix.security.uaa.UserAccountAuthentication()

	client_id = 'PublicAccess' 
	client_secret = 'VeeMuiue4k=' 
	uaa.authenticate(client_id, client_secret)
	return uaa.get_token()

def on_message(ws, message): 
	print(message)

def on_close(ws): 
	print('### closed ###')

def on_open(ws):
	print('### connected ###')

	# Example for Traffic Predix Zone
	ws.send('{"bbox":"33.077762:-117.663817,32.559574:-116.584410","eventTypes":["TFEVT"]}')
	# Example for Parking Predix Zone
	# ws.send('{"bbox":"--LAT Pt 1--:--LONG Pt 1--,--LAT Pt 2--:--LONG Pt 2-- ","eventTypes":["PKIN","PKOUT"]}')

if __name__ == '__main__':
	WebSocket.enableTrace(True)
	# Use Predix-Zone-ID to match events of interest # 
	cityiq_zone = 'SD-IE-PARKING' 
	cityiq_zone = 'SD-IE-TRAFFIC'
	cityiq = 'wss://sandiego.cityiq.io/api/v2/websocket/events'
	token = get_auth_token('shhh! this is secret so replace with predix uaa id') 
	headers = {'Authorization': 'Bearer ' + token, 'Predix-Zone-Id': cityiq_zone, 'Cache-Control': 'no-cache',}
	ws = WebSocket.WebSocketApp(cityiq,
						header = headers, 
						on_message = on_message, 
						on_close = on_close)
	ws.on_open = on_open 
	ws.run_forever()



