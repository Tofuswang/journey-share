/*
  # Create journey maps table

  1. New Tables
    - `journey_maps`: Stores fraud journey maps
      - `id`: UUID primary key
      - `journey_id`: UUID for external reference
      - `author_name`: Optional author name
      - `journey_title`: Title of the journey
      - `created_at`: Timestamp of creation
      - Steps 1-6: JSONB columns storing step data
        - step_name
        - description
        - pain_point
        - emotion_score
        - emotion
        - scammer_action
*/

CREATE TABLE journey_maps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid NOT NULL,
  author_name text,
  journey_title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  step1_trigger jsonb NOT NULL,
  step2_interaction jsonb NOT NULL,
  step3_trust jsonb NOT NULL,
  step4_turning jsonb NOT NULL,
  step5_conclusion jsonb NOT NULL,
  step6_aftermath jsonb NOT NULL
);

-- Enable RLS
ALTER TABLE journey_maps ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read journey maps
CREATE POLICY "Journey maps are viewable by everyone" ON journey_maps
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert journey maps
CREATE POLICY "Authenticated users can insert journey maps" ON journey_maps
  FOR INSERT
  TO authenticated
  WITH CHECK (true);