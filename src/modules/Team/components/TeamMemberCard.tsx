// src/modules/Team/components/TeamMemberCard.tsx
import type { TeamMember } from '../types';

interface TeamMemberCardProps {
  member: TeamMember;
  onToggleStatus: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (member: TeamMember) => void;
}

const TeamMemberCard = ({ member, onToggleStatus, onDelete, onEdit }: TeamMemberCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
      {/* Photo */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            member.is_active 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {member.is_active ? 'Aktiv' : 'Inaktiv'}
          </span>
        </div>
      </div>

      {/* Content - flex-1 to fill space */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          {member.name}
        </h3>
        <p className="text-sm text-primary font-medium mb-3">
          {member.position}
        </p>
        
        {/* Description with fixed height */}
        <div className="mb-4 h-10"> {/* Fixed height for 2 lines */}
          {member.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {member.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <span className="truncate">{member.email}</span>
        </div>

        {/* Actions - push to bottom with mt-auto */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={() => onEdit(member)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Bearbeiten
          </button>

          <button
            onClick={() => onToggleStatus(member.id, member.is_active)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={member.is_active ? 'Deaktivieren' : 'Aktivieren'}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {member.is_active ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              )}
            </svg>
          </button>

          <button
            onClick={() => onDelete(member.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Löschen"
          >
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;