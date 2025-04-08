import mysql.connector
from flask import Flask, make_response, jsonify, request


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="rootpass",
    database="BeegolDatabase"
)

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False



@app.route('/diagnostics', methods=['GET'])
def get_diagnostics():


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

    my_cursor = mydb.cursor()
    sql = "SELECT * FROM diagnostics LIMIT %s OFFSET %s"
    my_cursor.execute(sql, (limit, offset))
    diagnostics = my_cursor.fetchall()
    my_cursor.close()

    diagnosticsList = list()

    for diagnostic in diagnostics:
        diagnosticsList.append(
            {
                "id": diagnostic[0],
                "device_id": diagnostic[1],
                "city": diagnostic[2],
                "state": diagnostic[3],
                "latency_ms": diagnostic[4],
                "packet_loss": diagnostic[5],
                "quality_of_service": diagnostic[6],
                "date": diagnostic[7]
            }
        )

    return make_response (
        jsonify(
            {
                "status": "ok",
                "page": page,
                "limit": limit,
                "data": diagnosticsList
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