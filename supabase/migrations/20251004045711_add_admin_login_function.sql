/*
  # Add Admin Login Verification Function

  ## Overview
  Creates a secure database function to verify admin login credentials using bcrypt password hashing.

  ## 1. New Functions
  
  ### `verify_admin_login`
  - Parameters: `p_username` (text), `p_password` (text)
  - Returns: Table with admin id and username if credentials are valid
  - Uses pgcrypto extension for secure password verification
  - Compares provided password with stored hash using crypt function

  ## 2. Security
  - Function runs with SECURITY DEFINER to access admin_users table
  - Only returns id and username, never exposes password hashes
  - Uses parameterized queries to prevent SQL injection
  - Relies on bcrypt for secure password comparison

  ## 3. Important Notes
  - Requires pgcrypto extension for crypt() function
  - Returns empty set if credentials are invalid
  - Function is callable by anyone but only returns data for valid credentials
*/

-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create function to verify admin login
CREATE OR REPLACE FUNCTION verify_admin_login(p_username text, p_password text)
RETURNS TABLE(id uuid, username text) 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT a.id, a.username
  FROM admin_users a
  WHERE a.username = p_username
    AND a.password_hash = crypt(p_password, a.password_hash);
END;
$$;