# Database Migration Check

## Quick Diagnosis

The enquiry form not working is most likely because the database migration hasn't been run yet.

## How to Check if Migration Was Run

### Option 1: Supabase Dashboard
1. Go to your Supabase project dashboard
2. Click on **Table Editor** in the left sidebar
3. Look for a table called `enquiries`
4. If you DON'T see it, the migration needs to be run

### Option 2: SQL Editor Check
1. Go to your Supabase project dashboard
2. Click on **SQL Editor**
3. Run this query:
```sql
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'enquiries'
);
```
4. If it returns `false`, the migration needs to be run

## How to Run the Migration

### Step-by-Step Instructions:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your JapWorld project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy Migration SQL**
   - Open the file: `supabase/migrations/006_enquiries.sql`
   - Copy ALL the contents (Ctrl/Cmd + A, then Ctrl/Cmd + C)

4. **Paste and Run**
   - Paste into the SQL Editor
   - Click "Run" button (or press Ctrl/Cmd + Enter)
   - Wait for "Success. No rows returned" message

5. **Verify**
   - Go to Table Editor
   - You should now see the `enquiries` table

## After Running Migration

Once the migration is complete:

1. **Clear your browser cache** or do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. **Try submitting the enquiry form again**
3. **Check the admin portal** - you should see the enquiry appear

## Troubleshooting

### If you get an error about "type enquiry_status already exists":
This means the migration was partially run. Run this first:
```sql
DROP TABLE IF EXISTS enquiries CASCADE;
DROP TYPE IF EXISTS enquiry_status CASCADE;
```
Then run the full migration again.

### If you get RLS policy errors:
Make sure you're logged in as an admin user when testing the admin portal.

### If submissions still fail:
1. Open browser console (F12)
2. Try submitting again
3. Look for error messages in the Console tab
4. Share any error messages you see

## Quick Test

After migration, you can test the table directly:
```sql
-- Insert a test enquiry
INSERT INTO enquiries (name, email, message)
VALUES ('Test User', 'test@example.com', 'Test message');

-- Check if it worked
SELECT * FROM enquiries;

-- Clean up (optional)
DELETE FROM enquiries WHERE email = 'test@example.com';
```

## Need Help?

If you're still having issues after running the migration:
1. Check the browser console for errors
2. Verify you're on the latest code (git pull)
3. Restart the dev server
