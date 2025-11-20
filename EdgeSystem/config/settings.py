# EdgeSystem/config/settings.py
import os

# --- General System Settings ---
# Set this to True when running on the Raspberry Pi with the Camera connected
USE_HARDWARE = False 

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# --- Database Settings ---
DATABASE_DIR = os.path.join(BASE_DIR, 'database')
DATABASE_NAME = 'surgealert.db'
DATABASE_PATH = os.path.join(DATABASE_DIR, DATABASE_NAME)

# --- Sensor Simulation Settings ---
SIM_ULTRASONIC_MIN_DIST = 0.5  
SIM_ULTRASONIC_MAX_DIST = 3.0  
SIM_RADAR_MIN_FLOW = 0.0      
SIM_RADAR_MAX_FLOW = 1.8      

# --- Camera Settings ---
CAMERA_INDEX = 0 # 0 is usually the default USB or Pi Camera
IMAGE_WIDTH = 640
IMAGE_HEIGHT = 480

# Simulation Paths
SIM_CAMERA_SAMPLE_IMAGE_PATH = os.path.join('simulation', 'camera', 'sample_images', 'sample_water.jpg')
SIM_CAMERA_SEQUENCE_PATH = os.path.join('simulation', 'camera', 'sample_images', 'river_sequence')

# --- Image Processing Settings ---
# Optical Flow Configuration
MAX_CORNERS = 100
QUALITY_LEVEL = 0.01
MIN_DISTANCE = 10
LK_WINDOW_SIZE = (15, 15)
LK_MAX_LEVEL = 2
LK_CRITERIA = (3, 10, 0.03) 

# 1 pixel movement = X meters. Needs calibration in field!
PIXELS_TO_METERS = 0.01 

# --- Alert Thresholds ---
WATER_LEVEL_YELLOW_THRESHOLD = 1.5 
WATER_LEVEL_ORANGE_THRESHOLD = 2.5 
WATER_LEVEL_RED_THRESHOLD = 3.5  

FLOW_RATE_YELLOW_THRESHOLD = 0.8 
FLOW_RATE_ORANGE_THRESHOLD = 1.5 
FLOW_RATE_RED_THRESHOLD = 2.5  

RISE_RATE_YELLOW_THRESHOLD = 0.05 
RISE_RATE_ORANGE_THRESHOLD = 0.15 
RISE_RATE_RED_THRESHOLD = 0.3 

# --- SMS Settings ---
SMS_TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates', 'sms_alerts')
SENSOR_HEIGHT_FROM_MUDPLAIN = 5.0