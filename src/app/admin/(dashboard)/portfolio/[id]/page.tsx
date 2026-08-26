import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProjectEditor from "@/components/admin/ProjectEditor";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return <ProjectEditor project={data as Project} />;
}
