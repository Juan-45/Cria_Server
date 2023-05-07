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
)

# from datetime import timedelta
import subprocess

app = Flask(__name__)

# Configurar la clave secreta de la sesión (necesaria para la firma de cookies)
app.secret_key = "clave_secreta"
app.config["JSON_AS_ASCII"] = False

# Configurar los parametros de la cookie de sesión
# app.config["SESSION_COOKIE_SECURE"] = True  # Cookie solo accesible mediante HTTPS
# app.config["SESSION_COOKIE_HTTPONLY"] = True  # Cookie solo accesible desde HTTP
# app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(
#    seconds=1800
# )  # Duracion de la cookie


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


@app.route("/", methods=["POST", "GET"])
def appOs():
    if request.method == "POST":
        # record the user name
        name = request.get_json()["name"]
        if name is not None:
            response = make_response(f"The Cookie has been Set")
            response.set_cookie(
                "session_id",
                value=name,
                max_age=10,
                httponly=False,
                secure=True,
                samesite="Strict",
            )
            return response
        else:
            return render_template("testError.html")
    page = render_template("index.html")
    return page


@app.route("/setcookie")
def setcookie():
    resp = make_response(f"The Cookie has been Set")
    resp.set_cookie("Name", "AskPython")
    return resp


# @app.route('/', methods=['GET'])
# def say_hello():
#    user_email = request.headers.get('X-Goog-Authenticated-User-Email')
#    user_id = request.headers.get('X-Goog-Authenticated-User-ID')

#    verified_email, verified_id = user()

#    page = render_template('index.html',
#                           email=user_email,
#                           id=user_id,
#                           verified_email=verified_email,
#                           verified_id=verified_id)
#    return page


@app.route("/jsscript", methods=["GET"])
def show_running_script():
    page = render_template("jsscript.html")
    return page


@app.route("/privacy", methods=["GET"])
def show_policy():
    page = render_template("privacy.html")
    return page


@app.route("/test", methods=["GET"])
def test():
    # Obtener la dirección MAC del cliente
    mac_address = request.headers.get("X-Forwarded-For")
    mac_address = subprocess.check_output(f"arp -a {mac_address}", shell=True)
    mac_address = str(mac_address.decode("utf-8")).split()[3]

    # Validar la dirección MAC del cliente
    if (
        mac_address == "64-6E-69-FF-D0-CB"
    ):  # Reemplaza esto con la dirección MAC que deseas validar
        # Devolver la página privacy.html si la validación es exitosa
        page = render_template("test.html", mac=mac_address)
        return page
    else:
        # Redirigir al usuario a una página de error o devolver una respuesta de error
        return "Lo siento, no tienes permiso para acceder a esta página.", 403


if __name__ == "__main__":
    # This is used when running locally, only to verify it does not have
    # significant errors. It cannot demonstrate restricting access using
    # Identity-Aware Proxy when run locally, only when deployed.
    #
    # When deploying to Google App Engine, a webserver process such as
    # Gunicorn will serve the app. This can be configured by adding an
    # `entrypoint` to app.yaml.
    app.run(host="127.0.0.1", port=8080, debug=True)
