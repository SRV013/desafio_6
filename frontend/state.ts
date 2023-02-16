require("dotenv").config();
const API_BASE_URL = process.env.API_HOST;
const state = {
    // NEVO PARTICIANTES
    nuevoParticipante(nombre, cb?) {
        if (nombre) {
            fetch(API_BASE_URL + "/participantes", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((e) => {
                    localStorage.setItem("IdA", e.idParticipante);
                    localStorage.setItem("nameA", nombre);
                    cb(e);
                });
        } else {
            alert("Ingrese un nombre válido");
        }
    },
    // NUEVA SALA
    nuevaSala(participanteId, nombre, cb?) {
        localStorage.removeItem("salaRtdbId");
        if (participanteId) {
            fetch(API_BASE_URL + "/salas", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    participanteId,
                    nombre,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((e) => {
                    localStorage.setItem("salaRtdbId", e.salaRtdbId);
                    cb(e);
                });
        }
    },
    // BUSCAR SALA PARA INVITADO
    buscarSala(salaId, nombre, idParticipante, cb) {
        localStorage.removeItem("salaRtdbId");
        if (salaId && nombre && idParticipante) {
            fetch(API_BASE_URL + "/buscarsala", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    salaId,
                    nombre,
                    idParticipante,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((e) => {
                    localStorage.setItem("salaRtdbId", e);
                    localStorage.setItem("salaId", salaId);
                    cb(e);
                });
        }
    },

    // DATOS DE JUGADAS
    valJugadas(cb?) {
        const salaRtdbId = localStorage.getItem("salaRtdbId");
        if (salaRtdbId) {
            fetch(API_BASE_URL + "/tipojugada/" + salaRtdbId, {
                method: "get",
                headers: { "content-type": "application/json" },
            })
                .then((res) => {
                    return res.json();
                })
                .then((e) => {
                    cb(e);
                });
        }
    },
    // JUGADA QUIEN Y QUE
    jugada(quien, jugada) {
        const salaRtdbId = localStorage.getItem("salaRtdbId");
        if (quien && jugada) {
            fetch(API_BASE_URL + "/jugada", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    salaRtdbId,
                    quien,
                    jugada,
                }),
            });
        }
    },
    // GUARDA RESULTAFDOS
    guardaresultado(data, cb?) {
        if (data) {
            fetch(API_BASE_URL + "/guardajuego", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data),
            }).then((res) => {
                cb(res);
            });
        }
    },
    // MARCADOR
    marcador(cb) {
        const salaId = localStorage.getItem("salaId");
        if (salaId) {
            fetch(API_BASE_URL + "/marcador/" + salaId, {
                method: "get",
                headers: { "content-type": "application/json" },
            })
                .then((res) => {
                    return res.json();
                })
                .then((e) => {
                    cb(e);
                });
        }
    },
    pase() {
        const salaRtdbId = localStorage.getItem("salaRtdbId");
        if (salaRtdbId) {
            fetch(API_BASE_URL + "/pase/" + salaRtdbId, {
                method: "post",
                headers: { "content-type": "application/json" },
            })
        }
    },

    manos(cb?) {
        const salaId = localStorage.getItem("salaId");
        if (salaId) {
            fetch(API_BASE_URL + "/manos/" + salaId, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((e) => {
                    cb(e);
                });
        }
    },
};

export { state };
