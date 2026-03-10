export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type TransactionType = "payment" | "invoice" | "adjustment";
export type InvoiceStatus = "draft" | "issued" | "paid" | "partially_paid" | "overdue";
export type VehicleStatus = "in_yard" | "waiting_booking" | "loaded" | "on_ship";
export type DocumentType = "photo" | "auction_sheet" | "invoice" | "other";
export type UserRole = "client" | "admin";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: UserRole;
          client_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: UserRole;
          client_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: UserRole;
          client_id?: string | null;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          company_name: string;
          contact_name: string;
          email: string;
          phone: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          contact_name: string;
          email: string;
          phone?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          contact_name?: string;
          email?: string;
          phone?: string | null;
          notes?: string | null;
          updated_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          client_id: string;
          amount_cents: number;
          type: TransactionType;
          description: string;
          reference: string | null;
          invoice_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          amount_cents: number;
          type: TransactionType;
          description: string;
          reference?: string | null;
          invoice_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          amount_cents?: number;
          type?: TransactionType;
          description?: string;
          reference?: string | null;
          invoice_id?: string | null;
        };
      };
      invoices: {
        Row: {
          id: string;
          client_id: string;
          amount_cents: number;
          due_date: string | null;
          status: InvoiceStatus;
          description: string;
          invoice_number: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          amount_cents: number;
          due_date?: string | null;
          status?: InvoiceStatus;
          description: string;
          invoice_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          amount_cents?: number;
          due_date?: string | null;
          status?: InvoiceStatus;
          description?: string;
          invoice_number?: string | null;
          updated_at?: string;
        };
      };
      vehicles: {
        Row: {
          id: string;
          client_id: string;
          name: string;
          chassis: string | null;
          make: string | null;
          model: string | null;
          year: number | null;
          colour: string | null;
          status: VehicleStatus;
          status_updated_at: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          name: string;
          chassis?: string | null;
          make?: string | null;
          model?: string | null;
          year?: number | null;
          colour?: string | null;
          status?: VehicleStatus;
          status_updated_at?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          name?: string;
          chassis?: string | null;
          make?: string | null;
          model?: string | null;
          year?: number | null;
          colour?: string | null;
          status?: VehicleStatus;
          status_updated_at?: string;
          notes?: string | null;
          updated_at?: string;
        };
      };
      vehicle_documents: {
        Row: {
          id: string;
          vehicle_id: string;
          storage_path: string;
          document_type: DocumentType;
          display_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          vehicle_id: string;
          storage_path: string;
          document_type: DocumentType;
          display_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          vehicle_id?: string;
          storage_path?: string;
          document_type?: DocumentType;
          display_name?: string;
        };
      };
      vehicle_status_history: {
        Row: {
          id: string;
          vehicle_id: string;
          status: VehicleStatus;
          changed_at: string;
          changed_by: string | null;
        };
        Insert: {
          id?: string;
          vehicle_id: string;
          status: VehicleStatus;
          changed_at?: string;
          changed_by?: string | null;
        };
        Update: {
          id?: string;
          vehicle_id?: string;
          status?: VehicleStatus;
          changed_at?: string;
          changed_by?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_my_role: {
        Args: Record<string, never>;
        Returns: string;
      };
      get_my_client_id: {
        Args: Record<string, never>;
        Returns: string | null;
      };
    };
    Enums: {
      transaction_type: TransactionType;
      invoice_status: InvoiceStatus;
      vehicle_status: VehicleStatus;
      document_type: DocumentType;
      user_role: UserRole;
    };
  };
}
