const API_BASE_URL =
    process.env.NODE_ENV == "production"
        ? "https://m6-desafio.onrender.com/"
        : "http://localhost:1000";

const state = {
    data: {},
    // listeners: [],

    getStorage() {
        const ultimoestado = localStorage.getItem("state");
    },
    getState() {
        return this.data;
    },
    setState(estadoNuevo) {
        this.data = estadoNuevo;
        for (const cb of this.listeners) {
            cb();
        }
        console.log("MI ESTADO ", this.data);
    },
    // subscribe(callback: (any) => any) {
    //     this.listeners.push(callback);
    // },
    nuevoParticipante(callback?) {
        const estadoActual = this.getState();
        if (estadoActual.nombre) {
            fetch(API_BASE_URL + "/participantes", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ nombre: estadoActual.nombre }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((respuesta) => {
                    estadoActual.idParticipante = respuesta.idParticipante;
                    if (callback) callback();
                });
        }
    },

    nuevaSala(callback?) {
        const ea = this.getState();
        if (ea.idParticipante) {
            fetch(API_BASE_URL + "/salas", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    participanteId: ea.idParticipante,
                    nombre: ea.nombre,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((respuesta) => {
                    ea.idSala = respuesta.salaId;
                    ea.salaRtdbId = respuesta.salaRtdbId;
                    this.setState(ea);
                    if (callback) callback();
                });
        }
    },

    buscarSalaId(callback?) {
        const ea = this.getState();
        this.setState(ea);
        if (ea.idSala) {
            fetch(API_BASE_URL + "/salasleer", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    salaId: ea.idSala,
                    jugadorId: ea.idParticipante,
                    jugadorNombre: ea.nombre,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((respuesta) => {
                    if (respuesta.salaRtdbId) {
                        ea.salaRtdbId = respuesta.salaRtdbId;
                        if (callback) callback();
                    } else {
                        alert("Numero de sala incorrecta !!! ");
                    }
                });
        }
    },

    valJugadas(cb?) {
        const cs = this.getState();
        const salaRtdbId = cs.salaRtdbId;
        fetch(API_BASE_URL + "/tipojugada/" + salaRtdbId, {
            method: "get",
            headers: { "content-type": "application/json" },
        })
            .then((res) => {
                return res.json();
            })
            .then((js) => {
                cs.jugador_nombre = js.jugador_nombre;
                cs.jugador_jugada = js.jugador_jugada;

                cs.invitado_nombre = js.invitado_nombre;
                cs.invitado_jugada = js.invitado_jugada;
                cs.invitado_id = js.invitado_id;

                cs.ganados_anfitrion = js.ganados_anfitrion;
                cs.ganados_invitados = js.ganados_invitados;
                cs.empates = js.empates;
                cs.salaSet = js.sala_disponible;
                cs.resultado = js.resultado;
                cs.jugador_pase = js.jugador_pase;
                cs.invitado_pase = js.invitado_pase;

                const jugadaCre = js.jugador_jugada;
                const jugadaInv = js.invitado_jugada;
                const empate = [
                    jugadaCre == "tijera" && jugadaInv == "tijera",
                    jugadaCre == "piedra" && jugadaInv == "piedra",
                    jugadaCre == "papel" && jugadaInv == "papel",
                ];
                if (empate.includes(true)) {
                    cs.resultado = "empates";
                }
                const juego = [
                    jugadaCre == "tijera" && jugadaInv == "papel",
                    jugadaCre == "piedra" && jugadaInv == "tijera",
                    jugadaCre == "papel" && jugadaInv == "piedra",
                ];
                if (juego.includes(true)) {
                    cs.resultado = "ganador anfitrion";
                } else {
                    const juego = [
                        jugadaInv == "tijera" && jugadaCre == "papel",
                        jugadaInv == "piedra" && jugadaCre == "tijera",
                        jugadaInv == "papel" && jugadaCre == "piedra",
                    ];
                    if (juego.includes(true)) {
                        cs.resultado = "ganador invitado";
                    }
                }
                this.setState(cs);
                cb(cs);
            });
    },
    jugadaCreador(creador: string) {
        const cs = this.getState();
        const salaRtdbId = cs.salaRtdbId;
        if (creador) {
            fetch(API_BASE_URL + "/juego_creador", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id_sala: salaRtdbId,
                    jugada: creador,
                    pase: true,
                }),
            });
        }
    },
    jugadaInvitado(invitado: string) {
        const cs = this.getState();
        const salaRtdbId = cs.salaRtdbId;
        if (invitado) {
            fetch(API_BASE_URL + "/juego_invitado", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id_sala: salaRtdbId,
                    jugada: invitado,
                    pase: true,
                }),
            });
        }
    },
    ganador(callback?) {
        // const cs = this.getState();
        // const salaRtdbId = cs.salaRtdbId;
        // fetch(API_BASE_URL + "/tipojugada_ganador/" + salaRtdbId, {
        //     method: "get",
        //     headers: { "content-type": "application/json" },
        // })
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((datos) => {
        //         callback(datos);
        //     });
        // const cs = this.getState();
        // const sala = ref(rtdb, "/salas/" + cs.salaRtdbId);
        // onValue(sala, (juegores) => {
        //     const js = juegores.val();
        //     cs.jugador_nombre = js.jugador_nombre;
        //     cs.jugador_jugada = js.jugador_jugada;
        //     cs.invitado_nombre = js.invitado_nombre;
        //     cs.invitado_jugada = js.invitado_jugada;
        //     cs.invitado_id = js.invitado_id;
        //     cs.ganados_anfitrion = js.ganados_anfitrion;
        //     cs.ganados_invitados = js.ganados_invitados;
        //     cs.empates = js.empates;
        //     cs.salaSet = js.sala_disponible;
        //     cs.resultado = js.resultado;
        //     cs.jugador_pase = js.jugador_pase;
        //     cs.invitado_pase = js.invitado_pase;
        //     const jugadaCre = js.jugador_jugada;
        //     const jugadaInv = js.invitado_jugada;
        //     const empate = [
        //         jugadaCre == "tijera" && jugadaInv == "tijera",
        //         jugadaCre == "piedra" && jugadaInv == "piedra",
        //         jugadaCre == "papel" && jugadaInv == "papel",
        //     ];
        //     if (empate.includes(true)) {
        //         cs.resultado = "empates";
        //     }
        //     const juego = [
        //         jugadaCre == "tijera" && jugadaInv == "papel",
        //         jugadaCre == "piedra" && jugadaInv == "tijera",
        //         jugadaCre == "papel" && jugadaInv == "piedra",
        //     ];
        //     if (juego.includes(true)) {
        //         cs.resultado = "ganador anfitrion";
        //     } else {
        //         const juego = [
        //             jugadaInv == "tijera" && jugadaCre == "papel",
        //             jugadaInv == "piedra" && jugadaCre == "tijera",
        //             jugadaInv == "papel" && jugadaCre == "piedra",
        //         ];
        //         if (juego.includes(true)) {
        //             cs.resultado = "ganador invitado";
        //         }
        //     }
        //     this.setState(cs);
        // });
    },

    // SI JUEGA REVANCHA
    resetear(tipo: string) {
        const cs = this.getState();
        const salaRtdbId = cs.salaRtdbId;
        if (tipo == "anfitrion") {
            fetch(API_BASE_URL + "/juego_creador", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id_sala: salaRtdbId,
                    jugada: "",
                    pase: true,
                }),
            });
        } else if (tipo == "invitado") {
            fetch(API_BASE_URL + "/juego_invitado", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id_sala: salaRtdbId,
                    jugada: "",
                    pase: true,
                }),
            });
        }
        cs.resultado = "";
        this.setState(cs);
    },

    // PAUSA
    pausa(tipo: string) {
        const cs = this.getState();
        const salaRtdbId = cs.salaRtdbId;
        if (tipo == "anfitrion") {
            fetch(API_BASE_URL + "/pausa_creador", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id_sala: salaRtdbId,
                    pase: false,
                }),
            });
        } else if (tipo == "invitado") {
            fetch(API_BASE_URL + "/pausa_invitado", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id_sala: salaRtdbId,
                    pase: false,
                }),
            });
        }
        this.setState(cs);
    },

    // GUARDAR RESULTADO DB FINAL ID SALA
    guardaresultado() {
        const cs = this.getState();
        const idSala = cs.idSala;
        if (idSala) {
            if (cs.resultado == "ganador anfitrion") {
                cs.ganados_anfitrion = cs.ganados_anfitrion + 1;
            } else if (cs.resultado == "ganador invitado") {
                cs.ganados_invitados = cs.ganados_invitados + 1;
            } else {
                cs.empates = cs.empates + 1;
            }

            fetch(API_BASE_URL + "/guardajuego/" + idSala, {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    salaId: idSala,
                    Victoria: cs.ganados_anfitrion,
                    Derrotas: cs.ganados_invitados,
                    Empates: cs.empates,
                    su_id: cs.invitado_id,
                    su_nombre: cs.invitado_nombre,
                    tu_juego: cs.jugador_jugada,
                    su_juego: cs.invitado_jugada,
                }),
            });
            fetch(API_BASE_URL + "/f5resultado", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    salaId: cs.salaRtdbId,
                    ganados: cs.ganados_anfitrion,
                    perdidos: cs.ganados_invitados,
                    empates: cs.empates,
                    resultado: cs.resultado,
                }),
            });
            this.setState(cs);
        }
    },

    // SI SALE BORRA DATOS Y CIERRA SALA
    jugadasresultados(callback?) {
        const cs = this.getState();
        if (cs.idSala) {
            fetch(API_BASE_URL + "/jugadasresultados/" + cs.idSala, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((e) => {
                    cs.Derrotas = e.Derrotas;
                    cs.Empates = e.Empates;
                    cs.Victoria = e.Victoria;
                    cs.invitado_nombre = e.su_nombre;
                    this.setState(cs);
                    if (callback) callback();
                });
        }
    },

    manos(callback?) {
        const cs = this.getState();
        if (cs.idSala) {
            fetch(API_BASE_URL + "/manos/" + cs.idSala, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((respuesta) => {
                    cs.manos = respuesta;
                    this.setState(cs);
                    if (callback) callback();
                });
        }
    },
};

export { state };
