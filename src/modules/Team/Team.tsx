// src/modules/Team/Team.tsx
import { useState, useMemo } from 'react';
import { 
  TeamMemberCard, 
  TeamSearchBar, 
  TeamEmptyState, 
  TeamMemberModal 
} from '@team/components';
import { 
  useFetchTeamMembers,
  useCreateTeamMember,
  useUpdateTeamMember,
  useDeleteTeamMember, 
  useToggleTeamMemberStatus 
} from '@team/api';
import type { TeamMember, TeamMemberFormData } from '@team/types';
import LoadingComponent from '@/shared/components/LoadingComponent';
import ErrorHandle from '@/shared/components/ErrorHandle';
import DeleteConfirmationModal from '@/shared/components/DeleteConfirmationModal';

const Team = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null); // ← nur ID

  // Queries & Mutations
  const { data: members = [], isLoading, error } = useFetchTeamMembers();
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember(editingMember?.id || '');
  const deleteMember = useDeleteTeamMember();
  const toggleStatus = useToggleTeamMemberStatus();

  // Filtered members
  const filteredMembers = useMemo<TeamMember[]>(() => 
    (members as TeamMember[]).filter((member: TeamMember) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [members, searchQuery]
  );

  // Get member name for delete modal
  const deletingMemberName = useMemo(() => {
    if (!deletingMemberId) return '';
    const member = (members as TeamMember[]).find(m => m.id === deletingMemberId);
    return member?.name || '';
  }, [deletingMemberId, members]);

  // Handlers
  const handleCreate = async (formData: TeamMemberFormData) => {
    try {
      if (editingMember) {
        await updateMember.mutateAsync(formData);
      } else {
        await createMember.mutateAsync(formData);
      }
      setIsModalOpen(false);
      setEditingMember(null);
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleToggleStatus = (id: string, isActive: boolean) => {
    toggleStatus.mutate({ id, isActive });
  };

  const handleDeleteClick = (id: string) => {
    setDeletingMemberId(id);
  };

  const handleDeleteConfirm = () => {
    if (deletingMemberId) {
      deleteMember.mutate(deletingMemberId, {
        onSuccess: () => {
          setDeletingMemberId(null);
        }
      });
    }
  };

  // Error State
  if (error) {
    return (
      <ErrorHandle 
        title="Fehler beim Laden" 
        message="Die Teammitglieder konnten nicht geladen werden." 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team-Verwaltung</h1>
          <p className="text-gray-600">
            Verwalten und durchsuchen Sie alle Teammitglieder
          </p>
        </div>
        <button
          onClick={() => {
            setEditingMember(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
          </svg>
          Mitglied hinzufügen
        </button>
      </div>

      {/* Search */}
      <TeamSearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{filteredMembers.length}</span> 
            {' '}von{' '}
            <span className="font-semibold text-gray-900">{(members as TeamMember[]).length}</span>
            {' '}Teammitgliedern
          </p>
        )}
      </div>

      {/* Team Members Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="flex gap-2 mt-4">
                  <div className="flex-1 h-10 bg-gray-200 rounded" />
                  <div className="w-10 h-10 bg-gray-200 rounded" />
                  <div className="w-10 h-10 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredMembers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member: TeamMember) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <TeamEmptyState 
          hasSearch={searchQuery.length > 0} 
          onCreateClick={() => {
            setEditingMember(null);
            setIsModalOpen(true);
          }}
        />
      )}

      {/* Create/Edit Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
        initialData={editingMember ? {
          name: editingMember.name,
          position: editingMember.position,
          description: editingMember.description || '',
          email: editingMember.email,
          photo_url: editingMember.photo_url,
          is_active: editingMember.is_active,
        } : undefined}
        isLoading={editingMember ? updateMember.isPending : createMember.isPending}
        title={editingMember ? 'Teammitglied bearbeiten' : 'Teammitglied hinzufügen'}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!deletingMemberId}
        onClose={() => setDeletingMemberId(null)}
        onConfirm={handleDeleteConfirm}
        isDeleting={deleteMember.isPending}
        title="Teammitglied löschen?"
        message={`Möchten Sie ${deletingMemberName} wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`}
      />
    </div>
  );
};

export default Team;