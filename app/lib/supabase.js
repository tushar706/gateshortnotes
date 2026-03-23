import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Branches (public, active only) ──────────────────────────
export async function getBranches() {
  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('is_active', true)
    .order('order_index')
  if (error) throw error
  return data
}

// ── Subjects by branch ───────────────────────────────────────
export async function getSubjects(branchId) {
  const { data, error } = await supabase
    .from('subjects')
    .select('*')
    .eq('branch_id', branchId)
    .order('order_index')
  if (error) throw error
  return data
}

// ── Chapters by subject ──────────────────────────────────────
export async function getChapters(subjectId) {
  const { data, error } = await supabase
    .from('short_notes')
    .select(`
      id, slug, chapter_name, chapter_id,
      subject_name, branch_name,
      gate_important, status,
      concepts, formulas, gate_tips, pyq_reference
    `)
    .eq('subject_id', subjectId)
    .eq('status', 'published')
    .order('chapter_name')
  if (error) throw error
  return data
}

// ── All chapters for a branch (sidebar) ─────────────────────
export async function getAllChaptersByBranch(branchId) {
  const { data, error } = await supabase
    .from('short_notes')
    .select(`
      id, slug, chapter_name, chapter_id,
      subject_id, subject_name,
      gate_important, status
    `)
    .eq('branch_id', branchId)
    .eq('status', 'published')
    .order('subject_name')
    .order('chapter_name')
  if (error) throw error
  return data
}

// ── Single note by slug ──────────────────────────────────────
export async function getNoteBySlug(slug) {
  const { data, error } = await supabase
    .from('short_notes')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (error) throw error
  return data
}

// ── Note by branch/subject/chapter slug ─────────────────────
export async function getNoteByPath(branchSlug, subjectSlug, chapterSlug) {
  // Build the full slug
  const slug = `${branchSlug}-${subjectSlug}-${chapterSlug}`
  return getNoteBySlug(slug)
}

// ── Prev / Next chapter ──────────────────────────────────────
export async function getPrevNextChapters(subjectId, currentChapterId) {
  const { data } = await supabase
    .from('short_notes')
    .select('id, slug, chapter_name')
    .eq('subject_id', subjectId)
    .eq('status', 'published')
    .order('chapter_name')

  if (!data) return { prev: null, next: null }
  const idx = data.findIndex(n => n.id === currentChapterId)
  return {
    prev: idx > 0 ? data[idx - 1] : null,
    next: idx < data.length - 1 ? data[idx + 1] : null,
  }
}

// ── All slugs (for static generation) ───────────────────────
export async function getAllNoteSlugs() {
  const { data, error } = await supabase
    .from('short_notes')
    .select('slug, branch_name, subject_name, chapter_name')
    .eq('status', 'published')
  if (error) throw error
  return data
}

// ── All branch slugs ─────────────────────────────────────────
export async function getAllBranchSlugs() {
  const { data } = await supabase
    .from('branches')
    .select('slug')
    .eq('is_active', true)
  return data || []
}
