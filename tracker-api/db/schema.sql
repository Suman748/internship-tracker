CREATE TABLE IF NOT EXISTS tasks (
    id          BIGSERIAL PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    status      VARCHAR(30)  NOT NULL DEFAULT 'TODO',
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);
