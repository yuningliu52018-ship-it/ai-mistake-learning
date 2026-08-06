CREATE TABLE IF NOT EXISTS sync_accounts (
  sync_key_hash TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
  sync_key_hash TEXT NOT NULL,
  id TEXT NOT NULL,
  payload TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT,
  PRIMARY KEY (sync_key_hash, id)
);

CREATE INDEX IF NOT EXISTS idx_questions_sync_updated
ON questions (sync_key_hash, updated_at);
