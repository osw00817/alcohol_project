import serial
import requests
import json
import time

# 1. 블루투스 설정
bluetooth_port = "COM10"  # Windows: "COM10", Linux: "/dev/ttyUSB0"
baud_rate = 9600
post_url = "http://localhost:3000/api/report"  # 임시서버 URL

def read_bluetooth_data():
    """블루투스 데이터를 읽고 JSON으로 변환"""
    try:
        with serial.Serial(bluetooth_port, baud_rate, timeout=1) as ser:
            print("블루투스 연결 성공. 데이터를 수신 중...")

            while True:
                try:
                    if ser.in_waiting > 0:
                        # 블루투스에서 데이터 읽기
                        try:
                            data = ser.readline().decode("utf-8").strip()
                        except UnicodeDecodeError:
                            print("블루투스 데이터 디코딩 실패.")
                            continue

                        print(f"아두이노로부터 수신된 데이터: {data}")

                        # JSON 변환
                        try:
                            data_json = json.loads(data)
                            print(f"JSON 변환 성공: {data_json}")
                        except json.JSONDecodeError:
                            print("데이터를 JSON으로 변환하지 못했습니다.")
                            continue

                        # 데이터베이스에 저장할 데이터 생성
                        report_data = {
                            "person_id": data_json.get("person_id", "Unknown"),
                            "alcohol_level": data_json.get("alcohol_level", 0.0),
                            "device_id": data_json.get("device_id", "Unknown"),
                            "device_name": data_json.get("device_name", "Unknown"),
                            "location": data_json.get("location", "Unknown")
                        }

                        # 서버로 전송
                        send_data_to_server(report_data)
                except Exception as e:
                    print(f"루프 내 오류 발생: {e}")
                time.sleep(1)
    except Exception as e:
        print(f"블루투스 연결 오류: {e}")

def send_data_to_server(data):
    """서버로 HTTP POST 요청"""
    try:
        response = requests.post(post_url, json=data, timeout=5)
        if response.status_code == 200:
            print("서버로 데이터 전송 성공!")
        else:
            print(f"서버 응답 오류: {response.status_code}, {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"HTTP 요청 실패: {e}")

if __name__ == "__main__":
    read_bluetooth_data()
