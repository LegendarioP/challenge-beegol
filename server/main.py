import mysql.connector
from mysql.connector import Error
from flask import Flask, make_response, jsonify, request
from flask_cors import CORS
import time

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="rootpass",
    database="BeegolDatabase"
)

app = Flask(__name__)
cors = CORS(app, origins=["*"])
app.config['JSON_SORT_KEYS'] = False


def get_connection(retries=3, delay=2):
    for attempt in range(retries):
        try:
            connection = mysql.connector.connect(
                host="localhost",
                user="root",
                password="rootpass",
                database="BeegolDatabase"
            )
            if connection.is_connected():
                return connection
        except Error as e:
            print(f"Tentativa {attempt + 1} falhou: {e}")
            time.sleep(delay)
    raise Exception("Não foi possível conectar ao banco de dados após múltiplas tentativas.")


@app.route('/diagnostics', methods=['GET'])
def get_diagnostics():

    # TODO
    # [ ] Refinar as querys abaixo 
    # [ ] Voltar depois para refinar o de data coloando um range

    try:
        limit = int(request.args.get('limit', 10))
        page = int(request.args.get('page', 1))
    except:
        return make_response(
            jsonify({"code": "400", "message": "Invalid page or limit parameter."}),
            400,
        )

    offset = (page - 1) * limit

    device_id = request.args.get('device_id')
    city = request.args.get('city')
    state = request.args.get('state')
    date = request.args.get('date')

    base_sql = "SELECT * FROM diagnostics WHERE 1=1"
    count_sql = "SELECT COUNT(*) as total FROM diagnostics WHERE 1=1"

    filters = []
    values = []
    count_values = []

    if device_id:
        filters.append("device_id = %s")
        values.append(device_id)
        count_values.append(device_id)

    if city:
        filters.append("city = %s")
        values.append(city)
        count_values.append(city)

    if state:
        filters.append("state = %s")
        values.append(state)
        count_values.append(state)

    if date:
        filters.append("date = %s")
        values.append(date)
        count_values.append(date)

    if filters:
        condition = " AND " + " AND ".join(filters)
        base_sql += condition
        count_sql += condition

    base_sql += " LIMIT %s OFFSET %s"
    values.extend([limit, offset])

    try:
        mydb = get_connection()
        my_cursor = mydb.cursor(dictionary=True)

        my_cursor.execute(base_sql, values)
        diagnostics = my_cursor.fetchall()

        my_cursor.execute(count_sql, count_values)
        total_items = my_cursor.fetchone()["total"]
        total_pages = (total_items + limit - 1) // limit

        my_cursor.close()
        mydb.close()

        return make_response(
            jsonify({
                "status": "ok",
                "limit": limit,
                "page": page,
                "total_pages": total_pages,
                "data": diagnostics,
                "filters": {
                    "device_id": device_id,
                    "city": city,
                    "state": state,
                    "date": date
                },
            }),
            200,
        )
    except Exception as e:
        print("Erro ao executar query:", str(e))
        return make_response(jsonify({"status": "error", "message": "Erro no servidor."}), 500)



# @app.route('/diagnostics/states', methods=['GET'])
# def get_unique_states():
#     try:
#         mydb = get_connection()
#         my_cursor = mydb.cursor(dictionary=True)

#         my_cursor.execute("SELECT DISTINCT state FROM diagnostics")
#         states = [row["state"] for row in my_cursor.fetchall()]

#         my_cursor.close()
#         mydb.close()

#         return jsonify({"states": states}), 200

#     except Exception as e:
#         print("Erro ao buscar estados:", str(e))
#         return jsonify({"error": "Erro ao buscar estados"}), 500


@app.route('/diagnostics/locations', methods=['GET'])
def get_locations():
    try:
        mydb = get_connection()
        my_cursor = mydb.cursor(dictionary=True)

        query = "SELECT DISTINCT state, city FROM diagnostics WHERE state IS NOT NULL AND city IS NOT NULL ORDER BY state, city ASC"
        my_cursor.execute(query)
        rows = my_cursor.fetchall()

        grouped = {}
        for row in rows:
            state = row["state"]
            city = row["city"]
            if state not in grouped:
                grouped[state] = []
            if city not in grouped[state]:
                grouped[state].append(city)

        my_cursor.close()
        mydb.close()

        return make_response(jsonify({
            "status": "ok",
            "data": grouped
        }), 200)

    except Exception as e:
        print("Erro ao buscar cidades por estado:", str(e))
        return make_response(jsonify({
            "status": "error",
            "message": "Erro no servidor."
        }), 500)




@app.route('/diagnostics', methods=['POST']) 
def add_diagnostics():

    data = request.get_json()
    if not data:
        return make_response(
            jsonify(
                {
                    "status": "error",
                    "message": "No data provided.",
                }
            ),
            400,
        )

    device_id = data.get("device_id")
    city = data.get("city")
    state = data.get("state")
    latency_ms = data.get("latency_ms")
    packet_loss = data.get("packet_loss")
    quality_of_service = data.get("quality_of_service")
    date = data.get("date")

    my_cursor = mydb.cursor()
    sql = "INSERT INTO diagnostics (device_id, city, state, latency_ms, packet_loss, quality_of_service, date) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    val = (device_id, city, state, latency_ms, packet_loss, quality_of_service, date)
    my_cursor.execute(sql, val)
    mydb.commit()
    my_cursor.close()

    return make_response(
        jsonify(
            {
                "status": "ok",
                "message": "Diagnostics added successfully.",
            }
        ),
        201,
    )


app.run(debug=True)