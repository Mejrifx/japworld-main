# Enquiry System Documentation

## Overview

The JapWorld platform now includes a comprehensive enquiry management system that allows potential customers to submit enquiries through a public form, which are then managed by administrators in the admin portal.

## System Components

### 1. Database Schema

**Table: `enquiries`**

Located in: `/supabase/migrations/006_enquiries.sql`

Fields:
- `id` (UUID) - Primary key
- `name` (text) - Contact name *
- `email` (text) - Email address *
- `phone` (text) - Phone number (optional)
- `company` (text) - Company name (optional)
- `vehicle_interest` (text) - Vehicle type/model of interest (optional)
- `message` (text) - Main enquiry message *
- `budget_range` (text) - Budget range (optional)
- `status` (enum) - Enquiry status (new, read, responded, resolved)
- `admin_notes` (text) - Internal admin notes (optional)
- `created_at` (timestamp) - Submission time
- `updated_at` (timestamp) - Last update time

**Status Flow:**
- `new` → First submission (shows blue badge in admin)
- `read` → Admin viewed the enquiry
- `responded` → Admin responded to customer
- `resolved` → Enquiry is closed/completed

### 2. Public Enquiry Form

**Location:** `/src/pages/Enquiry.tsx`  
**Route:** `/enquiry`

**Features:**
- Beautiful, branded form with Japanese-inspired design
- Form validation (required fields marked with *)
- Success message after submission
- Contact information display (email, phone)
- Mobile-responsive design
- Loading states during submission

**Form Fields:**
- Full Name * (required)
- Email Address * (required)
- Phone Number (optional)
- Company Name (optional)
- Vehicle Type / Model (optional)
- Budget Range (dropdown: Under £10k to £60k+)
- Message * (required, textarea)

### 3. Admin Enquiries Management

**Location:** `/src/pages/admin/AdminEnquiries.tsx`  
**Route:** `/admin/enquiries`

**Features:**
- Two-panel layout: List view + Detail view
- Real-time new enquiry badge in header
- Status filtering (All, New, Read, Responded, Resolved)
- Auto-mark as "read" when viewing
- Click-to-email and click-to-call links
- Internal notes field for admin use
- Delete enquiry functionality
- Status change dropdown
- Timestamp tracking

**List View:**
- Shows all enquiries sorted by newest first
- Displays: name, company, vehicle interest, message preview, status, timestamp
- Blue pulse indicator for new enquiries
- Filters by status

**Detail View:**
- Full contact information with clickable email/phone
- Complete message display
- Vehicle interest and budget range
- Status management dropdown
- Internal notes textarea (auto-saves)
- Delete button
- Created/Updated timestamps

### 4. Navigation Updates

**Public Site:**
- Added "Enquiry" link to main navigation

**Admin Portal:**
- Added "Enquiries" section to admin navigation with Mail icon

## API / Hooks

**File:** `/src/hooks/useEnquiries.ts`

### Public Hooks (No authentication)

```typescript
useSubmitEnquiry() // Submit new enquiry
```

### Admin Hooks (Authentication required)

```typescript
useAllEnquiries(status?: EnquiryStatus) // Get all enquiries, optionally filtered
useEnquiry(id: string) // Get single enquiry
useUpdateEnquiry() // Update enquiry (status, notes, etc.)
useDeleteEnquiry() // Delete enquiry
```

### Helper Constants

```typescript
ENQUIRY_STATUS_LABELS // Status display names
ENQUIRY_STATUS_COLORS // Tailwind classes for status badges
```

## Security

### Row Level Security (RLS) Policies

1. **Public Insert:** Anyone (authenticated or anonymous) can submit an enquiry
2. **Admin Only:** Only authenticated admin users can view, update, or delete enquiries
3. **No Client Access:** Client portal users cannot see enquiries

The system uses Supabase RLS policies to ensure:
- Public can only create (INSERT) enquiries
- Only admins can SELECT, UPDATE, DELETE enquiries
- Checks `profiles.role = 'admin'` for admin operations

## Usage Examples

### For Admins

**Viewing New Enquiries:**
1. Go to Admin → Enquiries
2. New enquiries show a blue pulse indicator
3. Count of new enquiries displayed in header
4. Click filter "New" to see only unread enquiries

**Processing an Enquiry:**
1. Click on enquiry from list
2. Enquiry automatically marked as "read"
3. Review contact info, click email/phone to contact
4. Add internal notes
5. Change status to "responded" or "resolved"
6. Notes auto-save on blur

**Filtering:**
- Click status filters: All, New, Read, Responded, Resolved
- List updates immediately

### For Public Users

**Submitting an Enquiry:**
1. Navigate to `/enquiry` or click "Enquiry" in navigation
2. Fill in required fields (marked with *)
3. Optionally add vehicle interest and budget range
4. Click "Submit Enquiry"
5. See success message
6. Expect response within 24 hours

## Database Migration

To apply the enquiry system to your Supabase database:

### Option 1: Supabase CLI
```bash
supabase db push
```

### Option 2: Supabase Dashboard
1. Go to your Supabase project
2. Navigate to SQL Editor
3. Paste contents of `/supabase/migrations/006_enquiries.sql`
4. Run the query

## File Structure

```
src/
├── hooks/
│   └── useEnquiries.ts           # Enquiry CRUD hooks
├── pages/
│   ├── Enquiry.tsx               # Public enquiry form
│   └── admin/
│       └── AdminEnquiries.tsx    # Admin enquiry management
├── lib/
│   └── database.types.ts         # Updated with enquiry types
└── components/
    ├── Navigation.tsx            # Updated with enquiry link
    └── admin/
        └── AdminLayout.tsx       # Updated with enquiry nav item

supabase/
└── migrations/
    └── 006_enquiries.sql         # Database schema
```

## Future Enhancements

Potential improvements:

1. **Email Notifications**
   - Auto-email admin when new enquiry arrives
   - Send confirmation email to customer
   - Use Supabase Edge Functions

2. **Response Templates**
   - Quick reply templates for common questions
   - Save frequently used responses

3. **Assignment System**
   - Assign enquiries to specific admin users
   - Track who's handling what

4. **Export Functionality**
   - Export enquiries to CSV/Excel
   - Reporting and analytics

5. **Client Conversion**
   - Convert enquiry to client with one click
   - Pre-fill client details from enquiry

6. **Search & Advanced Filters**
   - Full-text search across all fields
   - Date range filters
   - Vehicle type filters

## Testing Checklist

- [ ] Public can access `/enquiry` without login
- [ ] Form validation works (required fields)
- [ ] Successful submission shows success message
- [ ] Enquiry appears in admin portal immediately
- [ ] Admin can filter by status
- [ ] Clicking enquiry marks it as "read"
- [ ] Status can be changed via dropdown
- [ ] Admin notes save correctly
- [ ] Email/phone links work correctly
- [ ] Delete confirmation works
- [ ] Mobile responsive on both public and admin sides
- [ ] New enquiry badge updates in real-time

## Support

For questions or issues with the enquiry system:
- Check database types in `src/lib/database.types.ts`
- Verify RLS policies in Supabase dashboard
- Review hooks in `src/hooks/useEnquiries.ts`
