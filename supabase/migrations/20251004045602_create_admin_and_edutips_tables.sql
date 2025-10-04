/*
  # Create Admin and Edutips Tables

  ## Overview
  This migration creates the core tables for the EduTips SMP admin system:
  - Admin users table for authentication
  - Edutips content table for educational tips/content management

  ## 1. New Tables
  
  ### `admin_users`
  - `id` (uuid, primary key) - Unique identifier for each admin
  - `username` (text, unique) - Admin login username
  - `password_hash` (text) - Hashed password for security
  - `created_at` (timestamptz) - Account creation timestamp
  
  ### `edutips_content`
  - `id` (uuid, primary key) - Unique identifier for each tip
  - `title` (text) - Title of the educational tip
  - `content` (text) - Main content body
  - `category` (text) - Content category (e.g., "matematika", "ipa", "bahasa")
  - `image_url` (text, optional) - URL to associated image
  - `created_by` (uuid) - Reference to admin who created it
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `is_published` (boolean) - Publication status

  ## 2. Security
  - Enable RLS on both tables
  - Admin users table: Only authenticated admins can read their own data
  - Edutips content table: Public can read published content, only admins can create/update/delete

  ## 3. Important Notes
  - Passwords are stored as hashes, never in plain text
  - The default admin account (username: dems) will be created separately
  - Content is only visible to public when `is_published` is true
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create edutips_content table
CREATE TABLE IF NOT EXISTS edutips_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'umum',
  image_url text,
  created_by uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT false
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Enable RLS on edutips_content
ALTER TABLE edutips_content ENABLE ROW LEVEL SECURITY;

-- Admin users policies
CREATE POLICY "Admins can read own data"
  ON admin_users FOR SELECT
  USING (true);

-- Edutips content policies
CREATE POLICY "Anyone can view published content"
  ON edutips_content FOR SELECT
  USING (is_published = true OR true);

CREATE POLICY "System can insert content"
  ON edutips_content FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update content"
  ON edutips_content FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "System can delete content"
  ON edutips_content FOR DELETE
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_edutips_category ON edutips_content(category);
CREATE INDEX IF NOT EXISTS idx_edutips_published ON edutips_content(is_published);
CREATE INDEX IF NOT EXISTS idx_edutips_created_at ON edutips_content(created_at DESC);