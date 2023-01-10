import { firestore, rtdb } from "./db";
import { nanoid } from "nanoid";
import * as cors from "cors";
import * as path from "path";
import * as express from "express";
const app = express();
app.use(cors());
app.use(express.json({ limit: "75mb" }));
app.use(express.json());
const port = "https://m6-desafio.onrender.com";
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

// OBTENER NUEVO PARTICIPANTE
app.get("/participantes/:bodyId", (req, res) => {
    const docId = req.params.bodyId;
    const docResul = usuariosColeccion.doc(docId);
    docResul.get().then((results) => {
        if (results.exists) {
            const nombreParticipante = results.data();
            res.json(nombreParticipante);
        } else {
            res.status(401).json({
                message: "nombre de participante no existe !!!",
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
                        jugador_id: participanteId,
                        jugador_nombre: nombre,
                        empates: 0,
                        ganados_anfitrion: 0,
                        ganados_invitados: 0,
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
// LEER SALA CREADA POR JUGADOR
app.post("/salasleer", (req, res) => {
    const { salaId, jugadorId, jugadorNombre } = req.body;
    const docSala = salasColeccion.doc(salaId);
    docSala.get().then((results) => {
        if (results.exists) {
            const salaRt = results.data();
            rtdb.ref("salas/" + salaRt.salaRtdbId).update({
                sala_disponible: false,
                invitado_id: jugadorId,
                invitado_nombre: jugadorNombre,
            });
            res.json({ salaRtdbId: salaRt.salaRtdbId });
        } else {
            res.status(400).json({
                message: "El Id de la sala no existe !!!",
            });
        }
    });
});
// PASA DATO DE JUGADA CREADOR
app.post("/juego_creador/", (req, res) => {
    const { id_sala, jugada, pase } = req.body;
    const salaRef = rtdb.ref("salas/" + id_sala);
    salaRef
        .update({
            jugador_jugada: jugada,
            jugador_pase: pase,
            resultado: "",
        })
        .then(() => {
            res.json({
                mensaje: "recibio juegada del creador",
            });
        });
});
// PASA DATO DE JUGADA CREADOR
app.post("/juego_invitado/", (req, res) => {
    const { id_sala, jugada, pase } = req.body;
    const salaRef = rtdb.ref("salas/" + id_sala);
    salaRef
        .update({
            invitado_jugada: jugada,
            invitado_pase: pase,
            resultado: "",
        })
        .then(() => {
            res.json({
                mensaje: "recibio juegada del invitado",
            });
        });
});

// ACTUALIZA RESULTADO
app.post("/f5resultado", (req, res) => {
    const salaId = req.body.salaId;
    const ganados = req.body.ganados;
    const perdidos = req.body.perdidos;
    const empates = req.body.empates;
    const resultado = req.body.resultado;
    const salaRef = rtdb.ref("salas/" + salaId);
    salaRef
        .update({
            ganados_anfitrion: ganados,
            ganados_invitados: perdidos,
            empates: empates,
            resultado: resultado,
        })
        .then(() => {
            res.json({
                mensaje: "datos actuales en juegos",
            });
        });
});
// GUARDAR RESULTADO DB FINAL ID SALA
app.post("/guardajuego/:salaId", (req, res) => {
    const salaId = req.body.salaId;
    const Victoria = req.body.Victoria;
    const Derrotas = req.body.Derrotas;
    const Empates = req.body.Empates;
    const su_id = req.body.su_id;
    const su_nombre = req.body.su_nombre;
    const tu_juego = req.body.tu_juego;
    const su_juego = req.body.su_juego;

    const docResul = salasColeccion.doc(salaId.toString());
    docResul.update({
        su_nombre: su_nombre,
        su_id: su_id,
        Victoria: Victoria,
        Derrotas: Derrotas,
        Empates: Empates,
    });
    const data = {
        tu_juego: tu_juego,
        su_juego: su_juego,
    };

    const ress = firestore
        .collection("salas/" + salaId + "/jugadas")
        .doc()
        .set(data);
    res.json(ress);
});
// RESULTADO JUGADAS
app.get("/jugadasresultados/:salaId", (req, res) => {
    const salaId = req.params.salaId;
    salasColeccion
        .doc(salaId)
        .get()
        .then((e) => {
            res.json(e.data());
        });
});

// PAUSA CREADOR
app.post("/pausa_creador", (req, res) => {
    const { id_sala, pase } = req.body;
    const salaRef = rtdb.ref("salas/" + id_sala);
    salaRef
        .update({
            jugador_pase: pase,
        })
        .then(() => {
            res.json({
                mensaje: "pausa creador",
            });
        });
});
// PAUSA INVITADO
app.post("/pausa_invitado", (req, res) => {
    const { id_sala, pase } = req.body;
    const salaRef = rtdb.ref("salas/" + id_sala);
    salaRef
        .update({
            invitado_pase: pase,
        })
        .then(() => {
            res.json({
                mensaje: "pausa invitado",
            });
        });
});

// LISTA COMPLETA DE MANOS EN SALAS
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

app.get("/tipojugada/:id", (req, res) => {
    const salaRtdbId = req.params.id;
    const sala = rtdb.ref("salas/" + salaRtdbId);
    sala.once("value", (e) => {
        const re = e.val();
        res.json(re);
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
