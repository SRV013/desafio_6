import { firestore, rtdb } from "./db";
import { nanoid } from "nanoid";
import * as cors from "cors";
import * as path from "path";
import * as express from "express";
const app = express();
app.use(cors());
app.use(express.json({ limit: "75mb" }));
app.use(express.json());
const port = 8080;
const usuariosColeccion = firestore.collection("usuarios");
const salasColeccion = firestore.collection("salas");

// CARGA NUEVO PARTICIPANTE
app.post("/participantes", (req, res) => {
    const participante = req.body.nombre;
    usuariosColeccion
        .where("participante", "==", participante)
        .get()
        .then((buscar) => {
            if (buscar.empty) {
                usuariosColeccion
                    .add({
                        participante,
                    })
                    .then((val) => {
                        res.json({
                            message:
                                "Se creo un nuevo participante con el siguiente id",
                            idParticipante: val.id,
                        });
                    });
            } else {
                buscar.forEach((doc) => {
                    return res.json({
                        message:
                            "Se encontro un participante con el siguiente id",
                        idParticipante: doc.id,
                    });
                });
            }
        });
});
// CREA UNA SALA DE JUEGOS
app.post("/salas", (req, res) => {
    const participanteId = req.body.participanteId;
    const nombre = req.body.nombre;
    usuariosColeccion
        .doc(participanteId.toString())
        .get()
        .then((doc) => {
            if (doc.exists) {
                const salaRef = rtdb.ref("salas/" + nanoid());
                salaRef
                    .set({
                        sala_disponible: true,
                        tu_id: participanteId,
                        tu_nombre: nombre,
                    })
                    .then(() => {
                        const salaRtdbId = salaRef.key;
                        const salaId = 1000 + Math.floor(Math.random() * 999);
                        salasColeccion
                            .doc(salaId.toString())
                            .set({
                                salaRtdbId: salaRtdbId,
                            })
                            .then(() => {
                                res.json({
                                    mensaje:
                                        "se creo una sala nueva con el siguiente id",
                                    salaId: salaId.toString(),
                                    salaRtdbId: salaRtdbId.toString(),
                                });
                            });
                    });
            } else {
                res.status(400).json({
                    messaje: "El Id del participante no existe !!!",
                });
            }
        });
});
// BUSCAR SALA
app.post("/buscarsala", (req, res) => {
    const { salaId, nombre, idParticipante } = req.body;
    salasColeccion
        .doc(salaId)
        .get()
        .then((e) => {
            const salaRtdbId = e.data().salaRtdbId;
            const salaRef = rtdb.ref("salas/" + salaRtdbId);
            salaRef
                .update({
                    sala_disponible: false,
                    su_nombre: nombre,
                    su_id: idParticipante,
                    salaId,
                })
                .then(() => {
                    res.json(salaRtdbId);
                });
        });
});

// PASA DATO DE JUGADA CREADOR
app.post("/jugada/", (req, res) => {
    const { salaRtdbId, jugada, quien } = req.body;
    const salaRef = rtdb.ref("salas/" + salaRtdbId);
    if (quien == "anfitrion") {
        salaRef
            .update({
                tu_juego: jugada,
            })
            .then(() => {
                res.json({
                    mensaje: "recibio juegada del creador",
                });
            });
    } else {
        salaRef
            .update({
                su_juego: jugada,
            })
            .then(() => {
                res.json({
                    mensaje: "recibio juegada del invitado",
                });
            });
    }
});
// GUARDAR RESULTADO DB FINAL ID SALA
app.post("/guardajuego", (req, res) => {
    const data = req.body;
    console.log(data);

    salasColeccion
        .doc(data.salaId.toString())
        .get()
        .then((e) => {
            var empates = e.data().empates || 0;
            var derrotas = e.data().derrotas || 0;
            var victorias = e.data().victorias || 0;
            const empate = [
                data.tu_juego == "tijera" && data.su_juego == "tijera",
                data.tu_juego == "piedra" && data.su_juego == "piedra",
                data.tu_juego == "papel" && data.su_juego == "papel",
            ];
            if (empate.includes(true)) {
                empates++;
                var ganador = "empates";
            }
            const juego = [
                data.tu_juego == "tijera" && data.su_juego == "papel",
                data.tu_juego == "piedra" && data.su_juego == "tijera",
                data.tu_juego == "papel" && data.su_juego == "piedra",
            ];
            if (juego.includes(true)) {
                victorias++;
                var ganador = "anfitrion";
            } else {
                const juego = [
                    data.su_juego == "tijera" && data.tu_juego == "papel",
                    data.su_juego == "piedra" && data.tu_juego == "tijera",
                    data.su_juego == "papel" && data.tu_juego == "piedra",
                ];
                if (juego.includes(true)) {
                    derrotas++;
                    var ganador = "invitado";
                }
            }
            if (ganador) {
                salasColeccion
                    .doc(data.salaId.toString())
                    .update({
                        su_nombre: data.su_nombre,
                        tu_nombre: data.tu_nombre,
                        su_id: data.su_id,
                        victorias,
                        derrotas,
                        empates,
                        ganador,
                        tu_juego: data.tu_juego,
                        su_juego: data.su_juego,
                    })
                    .then(() => {
                        res.json(true);
                        const mano = {
                            tu_juego: data.tu_juego,
                            su_juego: data.su_juego,
                        };
                        firestore
                            .collection("salas/" + data.salaId + "/jugadas")
                            .doc()
                            .set(mano);
                        const salaRef = rtdb.ref("salas/" + data.salaRtdbId);
                        salaRef.update({
                            pase: true,
                        });
                    });
            }
        });
});
//LISTA COMPLETA DE MANOS EN SALAS
app.get("/manos/:salaId", (req, res) => {
    const salaId = req.params.salaId;
    const manos = [];
    const citiesRef = firestore.collection("salas/" + salaId + "/jugadas");
    citiesRef
        .get()
        .then((losdatos) => {
            losdatos.forEach((doc) => {
                manos.push(doc.data());
            });
            return manos;
        })
        .then(() => {
            res.json(manos);
        });
});
// MARCADOR
app.get("/marcador/:id", (req, res) => {
    const salaId = req.params.id;
    salasColeccion
        .doc(salaId)
        .get()
        .then((e) => {
            res.json(e.data());
        });
});
// QUE JUGARON
app.get("/tipojugada/:id", (req, res) => {
    const salaRtdbId = req.params.id;
    const sala = rtdb.ref("salas/" + salaRtdbId);
    sala.once("value", (e) => {
        res.json(e.val());
    });
});
// PASE JUGADA
app.patch("/pase/:id", (req, res) => {
    const salaRtdbId = req.params.id;
    const salaRef = rtdb.ref("salas/" + salaRtdbId);
        salaRef
            .update({
                pase: false,
            })
            .then(() => {
                res.json({
                    mensaje: "bloqueo pase",
                });
            });
});
const relativeRoute = path.resolve(__dirname, "../../dist");
app.use(express.static(relativeRoute));
app.get("*", function (req, res) {
    res.sendFile(relativeRoute + "/index.html");
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
