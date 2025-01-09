/*
  # Add context and goal fields to journey_maps

  1. Changes
    - Add `context` text field to journey_maps
    - Add `goal` text field to journey_maps
*/

ALTER TABLE journey_maps
ADD COLUMN IF NOT EXISTS context text,
ADD COLUMN IF NOT EXISTS goal text;