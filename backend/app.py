from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from pathlib import Path

app = Flask(__name__)
CORS(app)

DATA_PATH = Path(__file__).parent / "data" / "seed.json"

def load_data():
    with open(DATA_PATH, 'r') as f:
        return json.load(f)

@app.route('/api/species', methods=['GET'])
def get_species():
    data = load_data()
    species = sorted({s['species'] for s in data})
    return jsonify(species)

@app.route('/api/migrations', methods=['GET'])
def migrations():
    species_q = request.args.get('species', None)
    start_q = request.args.get('start', None)
    end_q = request.args.get('end', None)

    data = load_data()
    out = []
    for s in data:
        if species_q and s['species'].lower() != species_q.lower():
            continue
        if start_q and s['date'] < start_q:
            continue
        if end_q and s['date'] > end_q:
            continue
        out.append(s)
    return jsonify(out)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
