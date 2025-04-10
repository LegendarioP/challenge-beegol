import mysql.connector
from flask import Flask, make_response, jsonify, request
from flask_cors import CORS

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="rootpass",
    database="BeegolDatabase"
)

app = Flask(__name__)
cors = CORS(app, origins=["*"])
app.config['JSON_SORT_KEYS'] = False



@app.route('/diagnostics', methods=['GET'])
def get_diagnostics():


    # TODO
    # [ ] Refinar as querys abaixo 
    # [ ] Voltar depois para refinar o de data coloando um range


    try:
        limit = int(request.args.get('limit', 10))
        page = int(request.args.get('page', 1))
    except: 
        make_response (
            jsonify(
                {
                    "code": "400",
                    "message": "Invalid page or limit parameter.",
                }
            ),
            200,
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

    if city:
        filters.append("city = %s")
        values.append(city)

    if state:
        filters.append("state = %s")
        values.append(state)

    if date:
        filters.append("date = %s")
        values.append(date)

    if filters:
        base_sql += " AND " + " AND ".join(filters)

    base_sql += " LIMIT %s OFFSET %s"
    values.extend([limit, offset])




    my_cursor = mydb.cursor(dictionary=True)

    my_cursor.execute(base_sql, values)
    diagnostics = my_cursor.fetchall()


    my_cursor.execute(count_sql, count_values)
    total_items = my_cursor.fetchone()["total"]
    total_pages = (total_items + limit - 1) // limit 


    my_cursor.close()




    return make_response (
        jsonify(
            {
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
            }
        ),
        200,
    )



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