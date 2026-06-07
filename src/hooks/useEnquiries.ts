import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Database, EnquiryStatus } from "@/lib/database.types";

type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
type EnquiryInsert = Database["public"]["Tables"]["enquiries"]["Insert"];
type EnquiryUpdate = Database["public"]["Tables"]["enquiries"]["Update"];

// ──────────────────────────────────────
// PUBLIC HOOKS (No auth required)
// ──────────────────────────────────────

export function useSubmitEnquiry() {
  return useMutation({
    mutationFn: async (input: EnquiryInsert) => {
      const { data, error } = await supabase
        .from("enquiries")
        .insert(input)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  });
}

// ──────────────────────────────────────
// ADMIN HOOKS
// ──────────────────────────────────────

export function useAllEnquiries(status?: EnquiryStatus) {
  return useQuery<Enquiry[]>({
    queryKey: ["enquiries", status],
    queryFn: async () => {
      let query = supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (status) {
        query = query.eq("status", status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useEnquiry(id: string | undefined) {
  return useQuery<Enquiry | null>({
    queryKey: ["enquiry", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useUpdateEnquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...update
    }: EnquiryUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("enquiries")
        .update(update)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["enquiries"] });
      qc.invalidateQueries({ queryKey: ["enquiry", vars.id] });
    },
  });
}

export function useDeleteEnquiry() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("enquiries")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });
}

// ──────────────────────────────────────
// HELPERS
// ──────────────────────────────────────

export const ENQUIRY_STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: "New",
  read: "Read",
  responded: "Responded",
  resolved: "Resolved",
};

export const ENQUIRY_STATUS_COLORS: Record<EnquiryStatus, string> = {
  new: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  read: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  responded: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  resolved: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
};
