"""
UNAB Backend — Flask + PyJWT
Ejecutar: python3 server.py
Puerto:   5000

Usuarios demo:
  admin@unab.edu.ar       / Admin1234
  estudiante@unab.edu.ar  / Estudiante123
"""
import json
import hashlib
import os
import datetime
from flask import Flask, request, jsonify, make_response  # type: ignore[import]
import jwt  # type: ignore[import]

app    = Flask(__name__)
SECRET  = "unab_jwt_secret_2026"
RST_KEY = "unab_reset_secret_2026"
DB_FILE = os.path.join(os.path.dirname(__file__), "usuarios.json")

# ── helpers ────────────────────────────────────────────────────
def hsh(p): return hashlib.sha256(p.encode()).hexdigest()

def db_load():
    if os.path.exists(DB_FILE):
        with open(DB_FILE) as f: return json.load(f)
    inicial = {"users": [
        {"id":1,"name":"Admin UNAB","email":"admin@unab.edu.ar",
         "password":hsh("Admin1234"),"role":"admin","carrera":None},
        {"id":2,"name":"Juan Pérez","email":"estudiante@unab.edu.ar",
         "password":hsh("Estudiante123"),"role":"estudiante","carrera":"Tec. Programación"},
    ]}
    db_save(inicial)
    return inicial

def db_save(db):
    with open(DB_FILE, "w") as f: json.dump(db, f, indent=2)

def make_token(u):
    return jwt.encode({
        "sub": u["id"], "name": u["name"],
        "email": u["email"], "role": u["role"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8)
    }, SECRET, algorithm="HS256")

def make_reset_token(u):
    return jwt.encode({
        "sub": u["id"], "email": u["email"], "type": "reset",
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    }, RST_KEY, algorithm="HS256")

def token_payload():
    """Decodifica el Bearer token del request actual."""
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "): return None
    try:    return jwt.decode(auth[7:], SECRET, algorithms=["HS256"])
    except: return None

def pub(u): return {k: u[k] for k in ("id","name","email","role","carrera")}

# ── CORS (sin dependencia externa) ─────────────────────────────
@app.after_request
def add_cors(r):
    r.headers["Access-Control-Allow-Origin"]  = "*"
    r.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    r.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return r

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        r = make_response(); add_cors(r); return r, 200

# ── rutas públicas ─────────────────────────────────────────────
@app.get("/")
def health():
    return jsonify({"status": "UNAB API activa"})

@app.post("/api/auth/login")
def login():
    d = request.get_json() or {}
    email = d.get("email", "").strip().lower()
    db = db_load()
    u = next((x for x in db["users"] if x["email"].lower() == email), None)
    if not u or u["password"] != hsh(d.get("password", "")):
        return jsonify({"error": "Email o contraseña incorrectos"}), 401
    return jsonify({"token": make_token(u), "user": pub(u)})

@app.post("/api/auth/register")
def register():
    d = request.get_json() or {}
    name    = d.get("name", "").strip()
    email   = d.get("email", "").strip().lower()
    pwd     = d.get("password", "")
    carrera = d.get("carrera", "")
    if not name or not email or not pwd:
        return jsonify({"error": "Nombre, email y contraseña son requeridos"}), 400
    if len(pwd) < 8:
        return jsonify({"error": "La contraseña debe tener al menos 8 caracteres"}), 400
    db = db_load()
    if any(x["email"].lower() == email for x in db["users"]):
        return jsonify({"error": "Ese email ya está registrado"}), 409
    nuevo_id = max(x["id"] for x in db["users"]) + 1
    u = {"id": nuevo_id, "name": name, "email": email,
         "password": hsh(pwd), "role": "estudiante", "carrera": carrera}
    db["users"].append(u)
    db_save(db)
    return jsonify({"token": make_token(u), "user": pub(u)}), 201

@app.post("/api/auth/forgot-password")
def forgot():
    d = request.get_json() or {}
    email = d.get("email", "").strip().lower()
    db = db_load()
    u = next((x for x in db["users"] if x["email"].lower() == email), None)
    msg = "Si el email existe, recibirás instrucciones."
    # En demo se devuelve el token directamente; en producción se mandaría por email
    if u:
        return jsonify({"message": msg, "reset_token": make_reset_token(u)})
    return jsonify({"message": msg})

@app.post("/api/auth/reset-password")
def reset_password():
    d   = request.get_json() or {}
    tok = d.get("token", "")
    pwd = d.get("password", "")
    if len(pwd) < 8:
        return jsonify({"error": "Mínimo 8 caracteres"}), 400
    try:
        payload = jwt.decode(tok, RST_KEY, algorithms=["HS256"])
        assert payload.get("type") == "reset"
    except:
        return jsonify({"error": "Token inválido o expirado"}), 400
    db = db_load()
    u  = next((x for x in db["users"] if x["id"] == payload["sub"]), None)
    if not u: return jsonify({"error": "Usuario no encontrado"}), 404
    u["password"] = hsh(pwd)
    db_save(db)
    return jsonify({"message": "Contraseña actualizada. Ya podés iniciar sesión."})

# ── rutas protegidas ───────────────────────────────────────────
@app.get("/api/auth/me")
def me():
    p = token_payload()
    if not p: return jsonify({"error": "No autorizado"}), 401
    return jsonify(p)

@app.get("/api/admin/users")
def admin_users():
    p = token_payload()
    if not p:              return jsonify({"error": "No autorizado"}), 401
    if p["role"] != "admin": return jsonify({"error": "Solo administradores"}), 403
    return jsonify([pub(u) for u in db_load()["users"]])

@app.put("/api/admin/users/<int:uid>/role")
def admin_set_role(uid):
    p = token_payload()
    if not p:              return jsonify({"error": "No autorizado"}), 401
    if p["role"] != "admin": return jsonify({"error": "Solo administradores"}), 403
    d    = request.get_json() or {}
    role = d.get("role")
    if role not in ("admin", "estudiante"):
        return jsonify({"error": "Rol inválido (admin | estudiante)"}), 400
    db = db_load()
    u  = next((x for x in db["users"] if x["id"] == uid), None)
    if not u: return jsonify({"error": "Usuario no encontrado"}), 404
    u["role"] = role
    db_save(db)
    return jsonify({"message": f"Rol de {u['name']} actualizado a '{role}'"})

if __name__ == "__main__":
    db_load()   # crea el archivo JSON si no existe
    print("\n" + "="*50)
    print("  UNAB Backend corriendo en http://localhost:5000")
    print("  Admin:      admin@unab.edu.ar / Admin1234")
    print("  Estudiante: estudiante@unab.edu.ar / Estudiante123")
    print("="*50 + "\n")
    app.run(host="0.0.0.0", port=5000, debug=False)