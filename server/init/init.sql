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
('5ee5cb74-a3ec-4bd9-8402-5c44c88311ba', 'New York', 'NY', 20.5, 0.1, 95.0, '2023-10-01 12:00:00'),
('1bbe2896-3b1d-49ef-b9ac-64a9b0bcd7ed', 'Los Angeles', 'CA', 30.2, 0.2, 90.0, '2023-10-01 12:05:00'),
('11ed9f79-aa80-435e-95f5-d3bbb9a23b6f', 'Chicago', 'IL', 25.0, 0.0, 98.0, '2023-10-01 12:10:00'),
('dd6baa7b-3c14-40be-b509-f4967c30af79', 'Houston', 'TX', 40.1, 0.5, 85.0, '2023-10-01 12:15:00'),
('58a8292a-e365-48ce-a58f-629e2cab0903', 'Phoenix', 'AZ', 35.3, 0.3, 88.0, '2023-10-01 12:20:00'); 