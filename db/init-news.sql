CREATE TABLE IF NOT EXISTS news (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  link TEXT NOT NULL UNIQUE,
  description TEXT,
  content_html TEXT,
  image_url TEXT,
  pub_date TIMESTAMPTZ,
  guid TEXT,
  source TEXT NOT NULL DEFAULT 'ntv-ekonomi',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_pub_date ON news (pub_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_source ON news (source);
