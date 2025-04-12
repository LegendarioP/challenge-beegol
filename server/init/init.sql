USE BeegolDatabase;

CREATE TABLE diagnostics (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50),
    city VARCHAR(100),
    state VARCHAR(50),
    latency_ms FLOAT,
    packet_loss FLOAT,
    quality_of_service FLOAT,
    date TIMESTAMP
);

SET character_set_client = utf8;
SET character_set_results = utf8;
SET character_set_connection = utf8;
SET collation_connection = utf8_general_ci;

INSERT INTO diagnostics (device_id, city, state, latency_ms, packet_loss, quality_of_service, date) VALUES
('5ee5cb74-a3ec-4bd9-8402-5c44c883111ba', 'São Paulo', 'SP', 20.5, 20.5, 95.0, '2025-04-01 12:00:00'),
('1bbe2896-3b1d-49ef-b9ac-64a9b0bcd7e5d', 'Campinas', 'SP', 30.2, 3.5, 90.0, '2025-04-02 12:05:00'),
('11ed9f79-aa80-435e-95f5-d3bbb9a23b6f4', 'Rio de Janeiro', 'RJ', 25.0, 20.15, 98.0, '2025-04-03 12:10:00'),
('dd6baa7b-3c14-40be-b509-f4967c30af793', 'Niterói', 'RJ', 40.1, 31.40, 85.0, '2025-04-04 12:15:00'),
('58a8292a-e365-48ce-a58f-629e2cab09032', 'Belo Horizonte', 'MG', 35.3, 20.3, 88.0, '2025-04-05 12:20:00'),
('a1b2c3d4-e5f6-7890-abcd-1234567890ef', 'Uberlândia', 'MG', 28.7, 15.2, 92.0, '2025-04-06 12:25:00'),
('b2c3d4e5-f6a7-8901-bcde-2345678901fa', 'Salvador', 'BA', 32.5, 18.3, 89.0, '2025-04-07 12:30:00'),
('c3d4e5f6-a7b8-9012-cdef-3456789012ab', 'Feira de Santana', 'BA', 22.1, 12.5, 94.0, '2025-04-08 12:35:00'),
('d4e5f6a7-b8c9-0123-def0-4567890123bc', 'Curitiba', 'PR', 26.8, 10.4, 96.0, '2025-04-09 12:40:00'),
('e5f6a7b8-c9d0-1234-ef01-5678901234cd', 'Londrina', 'PR', 30.0, 25.0, 87.0, '2025-04-10 12:45:00'),
('f6a7b8c9-d0e1-2345-f012-6789012345de', 'Fortaleza', 'CE', 27.5, 19.8, 91.0, '2025-04-11 12:50:00'),
('a7b8c9d0-e1f2-3456-0123-7890123456ef', 'Juazeiro do Norte', 'CE', 24.3, 14.7, 93.0, '2025-04-01 13:00:00'),
('b8c9d0e1-f2a3-4567-1234-8901234567fa', 'Porto Alegre', 'RS', 29.1, 16.5, 90.0, '2025-04-02 13:05:00'),
('c9d0e1f2-a3b4-5678-2345-9012345678ab', 'Caxias do Sul', 'RS', 31.4, 20.2, 88.0, '2025-04-03 13:10:00'),
('d0e1f2a3-b4c5-6789-3456-0123456789bc', 'Recife', 'PE', 33.7, 22.8, 86.0, '2025-04-04 13:15:00'),
('e1f2a3b4-c5d6-7890-4567-1234567890cd', 'Olinda', 'PE', 25.6, 17.3, 92.0, '2025-04-05 13:20:00'),
('f2a3b4c5-d6e7-8901-5678-2345678901de', 'Manaus', 'AM', 28.9, 13.6, 94.0, '2025-04-06 13:25:00'),
('a3b4c5d6-e7f8-9012-6789-3456789012ef', 'Parintins', 'AM', 26.4, 18.9, 89.0, '2025-04-07 13:30:00'),
('b4c5d6e7-f8a9-0123-7890-4567890123fa', 'Goiânia', 'GO', 34.2, 21.7, 87.0, '2025-04-08 13:35:00'),
('c5d6e7f8-a9b0-1234-8901-5678901234ab', 'Anápolis', 'GO', 29.8, 19.4, 90.0, '2025-04-09 13:40:00');