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

from typing import Dict, Any
from auth import user
from helpers.awsRequests import transform_query_response
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
import os
from botocore.exceptions import ClientError
from botocore.config import Config


COOKIE_MAX_AGE = 3600
COOKIE_NAME = "user_id"
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
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    #
)
app = Flask(__name__)

# to-do: Configurar la clave secreta de la sesión para producción (necesaria para la firma de cookies)
app.secret_key = "clave_secreta"
app.config["JSON_AS_ASCII"] = False


def get_user():
    return request.headers.get("User")


limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["100 per minute", "4 per second"],
)
limiter.init_app(app)


# Disable browser caching so changes in each step are always shown
# @app.after_request
# def set_response_headers(response):
#    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
#    response.headers["Pragma"] = "no-cache"
#    response.headers["Expires"] = "0"
#    return response


# ONLY FOR LOCAL SERVER
# @app.route("/static/js/<path:path>")
# def send_js(path):
#    return send_from_directory("frontend/dist/public/js", path)


id = str(uuid.uuid4())


@app.route("/psData", methods=["GET"])
@limiter.limit(
    "4 per second", error_message="Exceso de solicitudes, por favor intente más tarde."
)
def query_ps_data():
    try:
        response = aws_client.query(
            TableName="app_OS_v1",
            ReturnConsumedCapacity="TOTAL",
            ExpressionAttributeValues={
                ":v1": {
                    "S": "ps_data",
                },
            },
            KeyConditionExpression="part_key = :v1",
        )
        print(response["ConsumedCapacity"])
        return jsonify(transform_query_response(response["Items"], "ps_data_id")), 200

    except ClientError as error:
        error_message = {
            "message": str(error),
            "code": error.response["Error"]["Code"],
        }
        return jsonify(error_message), 500


@app.route("/psDataid", methods=["GET"])
@limiter.limit(
    "4 per second", error_message="Exceso de solicitudes, por favor intente más tarde."
)
def get_ps_data_id():
    try:
        response = aws_client.get_item(
            Key={
                "part_key": {
                    "S": "ps_data",
                },
                "sort_key": {
                    "S": "ps_data_id",
                },
            },
            TableName="app_OS_v1",
            ReturnConsumedCapacity="TOTAL",
        )

        print(response["ConsumedCapacity"])
        reduced_response: Dict[str, Any] = {}
        reduced_response["ps_data_id"] = response["Item"]["id"]["S"]
        return jsonify(reduced_response), 200

    except ClientError as error:
        error_message = {
            "message": str(error),
            "code": error.response["Error"]["Code"],
        }
        return jsonify(error_message), 500


@app.route("/", methods=["POST", "GET"])
def appOs():
    # Uncomment when deploy to App Engine
    assertion = user()
    if assertion is None:
        message = (
            "La autenticación ha fallado. No se proporcionó una afirmación IAP válida."
        )
        code = "Afirmación IAP inválida"
        return render_template("500.html", message=message, code=code), 500
    if request.method == "POST":
        # record the user
        currentUserId = request.get_json().get("userId")
        # Verify if currentUser is a string
        if isinstance(currentUserId, str):
            response = make_response(jsonify({"user_id": currentUserId}))
            response.set_cookie(
                COOKIE_NAME,
                value=currentUserId,
                max_age=COOKIE_MAX_AGE,
                httponly=False,
                # secure=True,
                # samesite="Strict",
            )
            return response
        else:
            # manejar el caso en que user es None o no es un string
            error_message = {
                "message": "El valor de usuario enviado es de tipo None o no es un string",
                "code": "Usuario no válido",
            }
            return jsonify(error_message), 500
    else:
        page = render_template("index.html")
        return page


@app.route("/privacy", methods=["GET"])
def show_policy():
    page = render_template("privacy.html")
    return page


# Allowed Client Side Routing paths
allowed_paths = ["sessionType", "actuaciones"]


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


@app.errorhandler(429)
def handle_request_error(error):
    page = render_template("429.html")
    return page, 429


if __name__ == "__main__":
    # This is used when running locally, only to verify it does not have
    # significant errors. It cannot demonstrate restricting access using
    # Identity-Aware Proxy when run locally, only when deployed.
    #
    # When deploying to Google App Engine, a webserver process such as
    # Gunicorn will serve the app. This can be configured by adding an
    # `entrypoint` to app.yaml.
    app.run(host="127.0.0.1", port=8080, debug=True)
