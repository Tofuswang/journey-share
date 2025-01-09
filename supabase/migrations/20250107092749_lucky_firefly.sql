/*
  # Update RLS policies for journey_maps table
  
  1. Changes
    - Allow public (including anonymous users) to insert journey maps
    - Keep existing policy for viewing journey maps
  
  2. Security
    - Everyone can view journey maps
    - Everyone (including anonymous users) can insert journey maps
*/

-- Drop the existing insert policy
DROP POLICY IF EXISTS "Authenticated users can insert journey maps" ON journey_maps;

-- Create new policy to allow public to insert journey maps
CREATE POLICY "Anyone can insert journey maps" ON journey_maps
  FOR INSERT
  TO public
  WITH CHECK (true);