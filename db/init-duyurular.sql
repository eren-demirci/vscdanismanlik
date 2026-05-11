CREATE TABLE IF NOT EXISTS duyurular (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  link TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content_html TEXT,
  image_url TEXT,
  pub_date TIMESTAMPTZ,
  source TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_duyurular_pub_date ON duyurular (pub_date DESC);
CREATE INDEX IF NOT EXISTS idx_duyurular_source ON duyurular (source);
