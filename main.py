# Copyright 2019 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from auth import user
from flask import (
    Flask,
    render_template,
    request,
    send_from_directory,
    session,
    make_response,
    jsonify,
    abort,
)
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import uuid

# from datetime import timedelta
import subprocess

import boto3
from botocore.exceptions import ClientError
from botocore.config import Config

COOKIE_MAX_AGE = 3600  # 10
COOKIE_NAME = "session_id"
REQUEST_TIMEOUT = 20
MAX_ATTEMPS = 5


aws_boto3_settings = Config(
    region_name="us-east-1",
    retries={"total_max_attempts": MAX_ATTEMPS, "mode": "standard"},
    connect_timeout=REQUEST_TIMEOUT,
    read_timeout=REQUEST_TIMEOUT,
)

aws_client = boto3.client(
    "dynamodb",
    config=aws_boto3_settings,
    # tokens
    aws_access_key_id="AKIAU5I7KRUKA64TVUON",
    aws_secret_access_key="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",
    #
)

app = Flask(__name__)

# Configurar la clave secreta de la sesión (necesaria para la firma de cookies)
app.secret_key = "clave_secreta"
app.config["JSON_AS_ASCII"] = False


def get_user():
    return request.headers.get("User")


limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["20 per minute", "3 per second"],
)
limiter.init_app(app)


# Disable browser caching so changes in each step are always shown
@app.after_request
def set_response_headers(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


# ONLY FOR LOCAL SERVER
@app.route("/static/js/<path:path>")
def send_js(path):
    return send_from_directory("frontend/dist/public/js", path)


id = str(uuid.uuid4())


@app.route("/psData", methods=["GET"])
@limiter.limit(
    "4 per second", error_message="Exceso de solicitudes, por favor intente más tarde."
)
def get_ps_data():
    try:
        response = aws_client.query(
            TableName="app_OS",
            ReturnConsumedCapacity="TOTAL",
            # ExpressionAttributeValues={
            #    ":v1": {
            #        "S": "ps_data",
            #    },
            # },
            # KeyConditionExpression="partition = :v1",
        )
        return response
    except ClientError as error:
        # Put your error handling logic here
        # Error handling

        error_message = {
            "error": str(error),
            "code": error.response["Error"]["Code"],
            "message": error.response["Error"]["Message"],
        }
        return jsonify(error_message), 500


# def deliver_ps_data():

# @app.route("/psDataID", methods=["GET"])
# @limiter.limit(
#    "4 per second", error_message="Exceso de solicitudes, por favor intente más tarde."
# )
# def get_ps_data_id():

#    response = aws_client.query(
#       TableName="app_OS",
#      ReturnConsumedCapacity="TOTAL",
# )
# return response


@app.route("/appOsResources", methods=["GET"])
def deliver_resources():
    data = {
        "current_data_id": str(uuid.uuid4()),
        "users": [
            {
                "id": str(uuid.uuid4()),
                "label": "Herrera Juan José",
                "value": {
                    "rank": "Ofl. Ayte.",
                    "secretary": "Herrera Juan José",
                },
            },
            {
                "id": str(uuid.uuid4()),
                "label": "Alderete Vanesa",
                "value": {
                    "rank": "Ofl. Ayte.",
                    "secretary": "Alderete Vanesa",
                },
            },
            {
                "id": str(uuid.uuid4()),
                "label": "Faisal Walter",
                "value": {
                    "rank": "Ofl. SubAyte.",
                    "secretary": "Faisal Walter",
                },
            },
        ],
        "instructors": [
            {
                "id": str(uuid.uuid4()),
                "label": "Hector Andrés Caretta",
                "value": {
                    "rank": "Comisario",
                    "instructor": "Hector Andrés Caretta",
                },
            }
        ],
        "prosecutions": [
            {
                "id": str(uuid.uuid4()),
                "label": "UFI y J Nro. 1",
                "value": {
                    "prosecution": "UFI y J Nro. 1",
                    "prosecutor": "Dr. Francisco Furnari",
                },
            }
        ],
        "courts": [
            {
                "id": str(uuid.uuid4()),
                "label": "Juzg. Gtias. Nro. 1",
                "value": {
                    "court": "Juzg. Gtias. Nro. 1",
                    "judge": "Dr. Fulanito",
                },
            }
        ],
    }
    return jsonify(data)


@app.route("/", methods=["POST", "GET"])
def appOs():
    if request.method == "POST":
        # record the user

        user = request.get_json().get("user")
        if isinstance(user, str):
            # hacer algo con el user (es un string)
            response = make_response(f"The Cookie has been Set")
            response.set_cookie(
                COOKIE_NAME,
                value=user,
                max_age=COOKIE_MAX_AGE,
                httponly=False,
                secure=True,
                samesite="Strict",
            )
            return response
        else:
            # manejar el caso en que user es None o no es un string
            return render_template("ServerError.html")
    page = render_template("index.html")
    return page


@app.route("/privacy", methods=["GET"])
def show_policy():
    page = render_template("privacy.html")
    return page


# Allowed Client Side Routing paths
allowed_paths = ["/home", "/home2"]


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    if path in allowed_paths:
        page = render_template("index.html")
        return page
    else:
        # Aquí puedes manejar el caso en el que la ruta no está permitida
        # Puedes devolver un error 404 o redireccionar a una página de error, por ejemplo.
        page = render_template("404.html")
        return page, 404


if __name__ == "__main__":
    # This is used when running locally, only to verify it does not have
    # significant errors. It cannot demonstrate restricting access using
    # Identity-Aware Proxy when run locally, only when deployed.
    #
    # When deploying to Google App Engine, a webserver process such as
    # Gunicorn will serve the app. This can be configured by adding an
    # `entrypoint` to app.yaml.
    app.run(host="127.0.0.1", port=8080, debug=True)
