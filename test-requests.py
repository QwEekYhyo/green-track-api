import requests
import json

token = None

def pretty(json_response):
    print(json.dumps(
        json_response,
        sort_keys=True,
        indent=4,
        separators=(",", ": "),
        ensure_ascii=False
    ))

def print_help():
    print(" --- Utils ---")
    print("h - help")
    print("ls - list reports")
    print("q - quit")
    print(" --- Authentication ---")
    print("r - register user")
    print("l - login as user")
    print(" --- Authenticated requests ---")
    print("hi - hello")
    print("me - me")
    print("a - add report")
    print()

def user_choice():
    choice = input("What would you like to do ? ")
    if choice == "r":
        register()
    elif choice == "l":
        login()
    elif choice == "hi":
        hello()
    elif choice == "a":
        add_report()
    elif choice == "me":
        me()
    elif choice == "ls":
        list_reports()
    elif choice == "q":
        exit()
    else:
        print_help()

def register():
    first_name = input("What is your first name ? ")
    last_name = input("What is your last name ? ")
    username = input("What is your username ? ")
    password = input("What is your password ? ")
    headers = {"Content-Type": "application/json"}
    payload = {"firstName": first_name, "surname": last_name, "username":
               username, "password": password}
    r = requests.post("http://localhost:3333/auth/register", json=payload,
                      headers=headers)
    pretty(r.json())
    print()

def login():
    global token

    username = input("What is your username ? ")
    password = input("What is your password ? ")
    headers = {"Content-Type": "application/json"}
    payload = {"username": username, "password": password}
    r = requests.post("http://localhost:3333/auth/login", json=payload,
                      headers=headers)
    pretty(r.json())
    if r.ok:
        token = r.json()["token"]
    print()

def hello():
    if token is not None:
        headers = {"Authorization": "Bearer " + token}
        r = requests.get("http://localhost:3333/hello", headers=headers)
        pretty(r.json())
        print()

def add_report():
    if token is not None:
        title = input("What is the title of your report ? ")
        is_blockage = input("Is your report a blockage ? ")
        address = input("What is the address of your report ? ")
        city = input("What is the city of your report ? ")
        zip_code = input("What is the zip code of your city ? ")
        description = input("What is the description of your report ? ")
        headers = {"Authorization": "Bearer " + token,
                   "Content-Type": "application/json"}
        payload = {
            "title": title,
            "isBlockage": is_blockage,
            "address": address,
            "city": city,
            "zipCode": zip_code,
            "description": description
        }
        r = requests.post("http://localhost:3333/reports", json=payload,
                          headers=headers)
        pretty(r.json())

def me():
    if token is not None:
        headers = {"Authorization": "Bearer " + token,
                   "Content-Type": "application/json"}
        r = requests.get("http://localhost:3333/me", headers=headers)
        pretty(r.json())

def list_reports():
    r = requests.get("http://localhost:3333/reports")
    pretty(r.json())

def main():
    print_help()
    while True:
        user_choice()

if __name__ == "__main__":
    main()
