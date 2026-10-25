-- Relax Aircon bookings. Run once on the Neon database.
CREATE TABLE IF NOT EXISTS bookings (
  id           BIGSERIAL PRIMARY KEY,
  name         TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 80),
  phone        TEXT NOT NULL CHECK (phone ~ '^[6-9][0-9]{9}$'),
  address      TEXT NOT NULL CHECK (char_length(address) BETWEEN 5 AND 300),
  appliance    TEXT,
  service      TEXT,
  problem      TEXT CHECK (problem IS NULL OR char_length(problem) <= 500),
  booking_date DATE NOT NULL,
  slot         TEXT NOT NULL CHECK (slot IN ('9-11','11-13','13-15','15-17','17-19','19-21')),
  status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- One active booking per date and slot: the database refuses double bookings.
CREATE UNIQUE INDEX IF NOT EXISTS bookings_one_per_slot ON bookings (booking_date, slot) WHERE status <> 'cancelled';
