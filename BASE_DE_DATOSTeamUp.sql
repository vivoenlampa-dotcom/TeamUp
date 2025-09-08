-- Script de Creación de Base de Datos para Gestión de Canchas Deportivas

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- 'jugador' o 'dueno'
    premium BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE canchas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(100),
    dueno_id INTEGER REFERENCES usuarios(id),
    tipo VARCHAR(50),
    precio_base INT NOT NULL,
    foto VARCHAR(255),
    activa BOOLEAN DEFAULT TRUE
);

CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    cancha_id INTEGER REFERENCES canchas(id),
    usuario_id INTEGER REFERENCES usuarios(id),
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente',
    monto_total INT NOT NULL,
    pago_id INTEGER
);

CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    reserva_id INTEGER REFERENCES reservas(id),
    monto INT NOT NULL,
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'pendiente',
    metodo_pago VARCHAR(50)
);

CREATE TABLE perfiles_jugador (
    usuario_id INTEGER PRIMARY KEY REFERENCES usuarios(id),
    foto VARCHAR(255),
    posicion VARCHAR(50),
    nivel VARCHAR(50),
    biografia TEXT,
    disponibilidad VARCHAR(100)
);

CREATE TABLE partidos (
    id SERIAL PRIMARY KEY,
    cancha_id INTEGER REFERENCES canchas(id),
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    organizador_id INTEGER REFERENCES usuarios(id),
    vacantes INT NOT NULL,
    descripcion TEXT
);

CREATE TABLE participantes_partido (
    partido_id INTEGER REFERENCES partidos(id),
    usuario_id INTEGER REFERENCES usuarios(id),
    estado VARCHAR(20) DEFAULT 'pendiente',
    PRIMARY KEY (partido_id, usuario_id)
);

CREATE TABLE suscripciones (
    usuario_id INTEGER PRIMARY KEY REFERENCES usuarios(id),
    fecha_inicio DATE,
    fecha_fin DATE,
    activa BOOLEAN DEFAULT TRUE
);

CREATE TABLE notificaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    contenido TEXT,
    leida BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de prueba

INSERT INTO usuarios (nombre, email, password, tipo) VALUES
('Juan Pérez', 'juan@email.com', 'hash1', 'jugador'),
('Carlos Dueño', 'carlos@email.com', 'hash2', 'dueno');

INSERT INTO canchas (nombre, ubicacion, dueno_id, tipo, precio_base) VALUES
('Cancha Futbol 7', 'Las Condes', 2, 'futbol7', 30000);

INSERT INTO perfiles_jugador (usuario_id, posicion, nivel, biografia, disponibilidad) VALUES
(1, 'Delantero', 'Avanzado', 'Jugador de barrio', 'Lunes a viernes 19-22h');

INSERT INTO reservas (cancha_id, usuario_id, fecha, hora_inicio, hora_fin, monto_total) VALUES
(1, 1, '2025-09-10', '20:00', '21:00', 32000);

INSERT INTO partidos (cancha_id, fecha, hora_inicio, hora_fin, organizador_id, vacantes, descripcion) VALUES
(1, '2025-09-10', '20:00', '21:00', 1, 3, 'Partido amistoso, faltan 3 jugadores');

INSERT INTO participantes_partido (partido_id, usuario_id, estado) VALUES
(1, 1, 'confirmado');
