import { pdf } from "@react-pdf/renderer";
import { InvoicePDF, InvoiceData } from "@/components/InvoicePDF";
import { supabase } from "./supabase";

export async function generateAndUploadInvoicePDF(
  invoiceId: string,
  clientId: string,
  invoiceData: InvoiceData
): Promise<{ success: boolean; storagePath?: string; error?: string }> {
  try {
    // Generate PDF blob
    const blob = await pdf(<InvoicePDF {...invoiceData} />).toBlob();

    // Create file path: client_id/invoice_id.pdf
    const fileName = `${clientId}/${invoiceId}.pdf`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("invoices")
      .upload(fileName, blob, {
        contentType: "application/pdf",
        upsert: true, // Allow replacing if exists
      });

    if (error) {
      console.error("Error uploading invoice PDF:", error);
      return { success: false, error: error.message };
    }

    return { success: true, storagePath: data.path };
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getInvoicePDFUrl(storagePath: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from("invoices")
      .createSignedUrl(storagePath, 3600); // 1 hour expiry

    if (error) {
      console.error("Error getting signed URL:", error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error("Error getting invoice PDF URL:", error);
    return null;
  }
}

export async function uploadCustomInvoicePDF(
  invoiceId: string,
  clientId: string,
  file: File
): Promise<{ success: boolean; storagePath?: string; error?: string }> {
  try {
    // Validate file type
    if (file.type !== "application/pdf") {
      return { success: false, error: "Please upload a PDF file" };
    }

    // Create file path: client_id/invoice_id.pdf
    const fileName = `${clientId}/${invoiceId}.pdf`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("invoices")
      .upload(fileName, file, {
        contentType: "application/pdf",
        upsert: true, // Replace existing
      });

    if (error) {
      console.error("Error uploading custom invoice PDF:", error);
      return { success: false, error: error.message };
    }

    return { success: true, storagePath: data.path };
  } catch (error) {
    console.error("Error uploading custom invoice PDF:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
