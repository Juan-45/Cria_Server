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

from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)


# Disable browser caching so changes in each step are always shown
@app.after_request
def set_response_headers(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

@app.route('/', methods=['GET'])
def say_hello():
    page = render_template('index.html')
    return page

@app.route('/privacy', methods=['GET'])
def show_policy():
    page = render_template('privacy.html')
    return page

@app.route('/test', methods=['GET'])
def test():
    # Obtener la dirección MAC del cliente
    mac_address = request.headers.get('X-Forwarded-For')
    mac_address = subprocess.check_output(f"arp -a {mac_address}", shell=True)
    mac_address = str(mac_address.decode('utf-8')).split()[3]

    # Validar la dirección MAC del cliente
    if mac_address == '64-6E-69-FF-D0-CB': # Reemplaza esto con la dirección MAC que deseas validar
        # Devolver la página privacy.html si la validación es exitosa
        page = render_template('test.html', mac=mac_address)   
        return page
    else:
        # Redirigir al usuario a una página de error o devolver una respuesta de error
        return "Lo siento, no tienes permiso para acceder a esta página.", 403    


if __name__ == '__main__':
    # This is used when running locally, only to verify it does not have
    # significant errors. It cannot demonstrate restricting access using
    # Identity-Aware Proxy when run locally, only when deployed.
    #
    # When deploying to Google App Engine, a webserver process such as
    # Gunicorn will serve the app. This can be configured by adding an
    # `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)