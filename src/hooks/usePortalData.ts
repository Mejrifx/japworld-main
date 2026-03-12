import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type {
  Database,
  VehicleStatus,
  InvoiceStatus,
  TransactionType,
  DocumentType,
} from "@/lib/database.types";

type Client = Database["public"]["Tables"]["clients"]["Row"];
type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];
type VehicleDocument = Database["public"]["Tables"]["vehicle_documents"]["Row"];
type VehicleStatusHistory = Database["public"]["Tables"]["vehicle_status_history"]["Row"];

// ──────────────────────────────────────
// CLIENT PORTAL HOOKS
// ──────────────────────────────────────

export function useMyClient(clientId: string | null) {
  return useQuery<Client | null>({
    queryKey: ["client", clientId],
    queryFn: async () => {
      if (!clientId) return null;
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", clientId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!clientId,
  });
}

export function useMyTransactions(clientId: string | null) {
  return useQuery<Transaction[]>({
    queryKey: ["transactions", clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!clientId,
  });
}

export function useMyInvoices(clientId: string | null) {
  return useQuery<Invoice[]>({
    queryKey: ["invoices", clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!clientId,
  });
}

export function useMyVehicles(clientId: string | null) {
  return useQuery<Vehicle[]>({
    queryKey: ["vehicles", clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!clientId,
  });
}

export function useVehicle(vehicleId: string | undefined) {
  return useQuery<Vehicle | null>({
    queryKey: ["vehicle", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return null;
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", vehicleId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!vehicleId,
  });
}

export function useVehicleDocuments(vehicleId: string | undefined) {
  return useQuery<VehicleDocument[]>({
    queryKey: ["vehicle_documents", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return [];
      const { data, error } = await supabase
        .from("vehicle_documents")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!vehicleId,
  });
}

export function useVehicleStatusHistory(vehicleId: string | undefined) {
  return useQuery<VehicleStatusHistory[]>({
    queryKey: ["vehicle_status_history", vehicleId],
    queryFn: async () => {
      if (!vehicleId) return [];
      const { data, error } = await supabase
        .from("vehicle_status_history")
        .select("*")
        .eq("vehicle_id", vehicleId)
        .order("changed_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!vehicleId,
  });
}

// ──────────────────────────────────────
// ADMIN HOOKS
// ──────────────────────────────────────

export function useAllClients() {
  return useQuery<Client[]>({
    queryKey: ["admin_clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("company_name");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useClientById(clientId: string | undefined) {
  return useQuery<Client | null>({
    queryKey: ["admin_client", clientId],
    queryFn: async () => {
      if (!clientId) return null;
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", clientId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!clientId,
  });
}

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function useProfileByClientId(clientId: string | undefined) {
  return useQuery<Profile | null>({
    queryKey: ["admin_profile_by_client", clientId],
    queryFn: async () => {
      if (!clientId) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("client_id", clientId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!clientId,
  });
}

export function useClientTransactions(clientId: string | undefined) {
  return useQuery<Transaction[]>({
    queryKey: ["admin_transactions", clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!clientId,
  });
}

export function useClientInvoices(clientId: string | undefined) {
  return useQuery<Invoice[]>({
    queryKey: ["admin_invoices", clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!clientId,
  });
}

export function useClientVehicles(clientId: string | undefined) {
  return useQuery<Vehicle[]>({
    queryKey: ["admin_vehicles", clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!clientId,
  });
}

export function useAllVehicles() {
  return useQuery<(Vehicle & { clients: { company_name: string } | null })[]>({
    queryKey: ["admin_all_vehicles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*, clients(company_name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as (Vehicle & { clients: { company_name: string } | null })[];
    },
  });
}

// ──────────────────────────────────────
// ADMIN MUTATIONS
// ──────────────────────────────────────

export function useCreateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Database["public"]["Tables"]["clients"]["Insert"]) => {
      const { data, error } = await supabase.from("clients").insert(input).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin_clients"] }),
  });
}

export function useUpdateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...update
    }: Database["public"]["Tables"]["clients"]["Update"] & { id: string }) => {
      const { data, error } = await supabase
        .from("clients")
        .update(update)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["admin_clients"] });
      qc.invalidateQueries({ queryKey: ["admin_client", vars.id] });
      qc.invalidateQueries({ queryKey: ["client", vars.id] });
    },
  });
}

export function useRecordPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      client_id: string;
      amount_cents: number;
      description: string;
      reference?: string;
      invoice_id?: string;
    }) => {
      const { data, error } = await supabase
        .from("transactions")
        .insert({ ...input, type: "payment" as TransactionType })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["admin_transactions", vars.client_id] });
      qc.invalidateQueries({ queryKey: ["transactions", vars.client_id] });
    },
  });
}

export function useCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Database["public"]["Tables"]["invoices"]["Insert"]) => {
      const { data, error } = await supabase.from("invoices").insert(input).select().single();
      if (error) throw error;
      // Also create a debit transaction for the invoice amount
      if (data) {
        await supabase.from("transactions").insert({
          client_id: data.client_id,
          amount_cents: -Math.abs(data.amount_cents),
          type: "invoice" as TransactionType,
          description: `Invoice: ${data.description}`,
          invoice_id: data.id,
        });
      }
      return data;
    },
    onSuccess: (_data, vars) => {
      if (vars.client_id) {
        qc.invalidateQueries({ queryKey: ["admin_invoices", vars.client_id] });
        qc.invalidateQueries({ queryKey: ["admin_transactions", vars.client_id] });
        qc.invalidateQueries({ queryKey: ["invoices", vars.client_id] });
        qc.invalidateQueries({ queryKey: ["transactions", vars.client_id] });
      }
    },
  });
}

export function useUpdateInvoiceStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      clientId,
    }: {
      id: string;
      status: InvoiceStatus;
      clientId: string;
    }) => {
      const { data, error } = await supabase
        .from("invoices")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["admin_invoices", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["invoices", vars.clientId] });
    },
  });
}

export function useCreateVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Database["public"]["Tables"]["vehicles"]["Insert"]) => {
      const { data, error } = await supabase.from("vehicles").insert(input).select().single();
      if (error) throw error;
      // Insert initial status history
      if (data) {
        await supabase.from("vehicle_status_history").insert({
          vehicle_id: data.id,
          status: data.status,
        });
      }
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["admin_vehicles", vars.client_id] });
      qc.invalidateQueries({ queryKey: ["vehicles", vars.client_id] });
      qc.invalidateQueries({ queryKey: ["admin_all_vehicles"] });
    },
  });
}

export function useUpdateVehicleStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      clientId,
    }: {
      id: string;
      status: VehicleStatus;
      clientId: string;
    }) => {
      const { data, error } = await supabase
        .from("vehicles")
        .update({ status })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["admin_vehicles", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["vehicles", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["admin_all_vehicles"] });
      qc.invalidateQueries({ queryKey: ["vehicle", vars.id] });
      qc.invalidateQueries({ queryKey: ["vehicle_status_history", vars.id] });
    },
  });
}

export function useUpdateVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      clientId,
      ...update
    }: Database["public"]["Tables"]["vehicles"]["Update"] & { id: string; clientId: string }) => {
      const { data, error } = await supabase
        .from("vehicles")
        .update(update)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["admin_vehicles", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["vehicles", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["admin_all_vehicles"] });
      qc.invalidateQueries({ queryKey: ["vehicle", vars.id] });
    },
  });
}

export function useUploadVehicleDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      vehicleId,
      clientId,
      file,
      documentType,
      displayName,
    }: {
      vehicleId: string;
      clientId: string;
      file: File;
      documentType: DocumentType;
      displayName: string;
    }) => {
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}_${crypto.randomUUID()}.${ext}`;
      const storagePath = `${clientId}/${vehicleId}/${documentType}/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from("vehicle-documents")
        .upload(storagePath, file, { upsert: false });
      if (uploadError) throw uploadError;

      const { data, error: dbError } = await supabase
        .from("vehicle_documents")
        .insert({ vehicle_id: vehicleId, storage_path: storagePath, document_type: documentType, display_name: displayName })
        .select()
        .single();
      if (dbError) throw dbError;
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["vehicle_documents", vars.vehicleId] });
    },
  });
}

export function useDeleteVehicleDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      vehicleId,
      storagePath,
    }: {
      id: string;
      vehicleId: string;
      storagePath: string;
    }) => {
      await supabase.storage.from("vehicle-documents").remove([storagePath]);
      const { error } = await supabase.from("vehicle_documents").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["vehicle_documents", vars.vehicleId] });
    },
  });
}

export function useSignedDocumentUrl() {
  return async (storagePath: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
      .from("vehicle-documents")
      .createSignedUrl(storagePath, 60 * 60); // 1 hour
    if (error || !data) return null;
    return data.signedUrl;
  };
}

// ──────────────────────────────────────
// DELETE HOOKS
// ──────────────────────────────────────

// Delete a client completely: auth user (cascades to profile), client record (cascades to all related data)
export function useDeleteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      clientId,
      authUserId,
    }: {
      clientId: string;
      authUserId?: string | null;
    }) => {
      // Get current session for Edge Function auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Not authenticated");

      // Call Edge Function to delete both auth user and client data
      const { data, error } = await supabase.functions.invoke("delete-auth-user", {
        body: { userId: authUserId, clientId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to delete client");
      }

      if (!data?.success) {
        throw new Error(data?.error || "Failed to delete client");
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin_clients"] });
      qc.invalidateQueries({ queryKey: ["admin_all_vehicles"] });
    },
  });
}

// Delete an invoice and its related transaction
export function useDeleteInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      invoiceId,
      clientId,
    }: {
      invoiceId: string;
      clientId: string;
    }) => {
      // First, find and delete any related transactions
      const { error: txnError } = await supabase
        .from("transactions")
        .delete()
        .eq("invoice_id", invoiceId);
      if (txnError) throw txnError;

      // Then delete the invoice
      const { error } = await supabase.from("invoices").delete().eq("id", invoiceId);
      if (error) throw error;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["admin_invoices", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["admin_transactions", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["invoices", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["transactions", vars.clientId] });
    },
  });
}

// Delete a vehicle and all its documents (storage + DB) and status history
export function useDeleteVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      vehicleId,
      clientId,
      documents,
    }: {
      vehicleId: string;
      clientId: string;
      documents?: { id: string; storage_path: string }[];
    }) => {
      // Step 1: Delete all storage files for this vehicle's documents
      if (documents && documents.length > 0) {
        const paths = documents.map((d) => d.storage_path);
        await supabase.storage.from("vehicle-documents").remove(paths);
      }

      // Step 2: Delete the vehicle - cascades to vehicle_documents and vehicle_status_history
      const { error } = await supabase.from("vehicles").delete().eq("id", vehicleId);
      if (error) throw error;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["admin_vehicles", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["vehicles", vars.clientId] });
      qc.invalidateQueries({ queryKey: ["admin_all_vehicles"] });
    },
  });
}

// ──────────────────────────────────────
// HELPERS
// ──────────────────────────────────────

export function computeBalance(transactions: Transaction[]): number {
  return transactions.reduce((acc, t) => acc + t.amount_cents, 0);
}

export function computeOutstanding(invoices: Invoice[]): number {
  return invoices
    .filter((i) => i.status !== "paid")
    .reduce((acc, i) => acc + i.amount_cents, 0);
}

export function formatCurrency(cents: number, currency = "GBP"): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export const VEHICLE_STATUS_LABELS: Record<VehicleStatus, string> = {
  in_yard: "In Yard",
  waiting_booking: "Waiting for Booking",
  loaded: "Loaded",
  on_ship: "On Ship",
};

export const VEHICLE_STATUS_COLORS: Record<VehicleStatus, string> = {
  in_yard: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  waiting_booking: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  loaded: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  on_ship: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
};

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: "Draft",
  issued: "Issued",
  paid: "Paid",
  partially_paid: "Partially Paid",
  overdue: "Overdue",
};

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, string> = {
  draft: "text-muted-foreground bg-muted/50 border-border",
  issued: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  paid: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  partially_paid: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  overdue: "text-red-400 bg-red-400/10 border-red-400/30",
};
