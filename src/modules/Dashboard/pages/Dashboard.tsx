// src/pages/Dashboard.tsx
import { useZustand } from '@state';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useZustand();

  const stats = [
    { label: 'Aktive Objekte', value: '12', icon: '🏠', trend: '+2 diese Woche' },
    { label: 'Interessenten', value: '45', icon: '👥', trend: '+8 neue Anfragen' },
    { label: 'Termine', value: '7', icon: '📅', trend: '3 heute' },
    { label: 'Angebote', value: '€ 2.4M', icon: '💰', trend: '+12% zum Vormonat' },
  ];

  const recentActivities = [
    { action: 'Neue Anfrage', property: 'Villa in Baden', time: 'vor 2 Stunden', type: 'inquiry' },
    { action: 'Besichtigung', property: 'Wohnung Mödling', time: 'vor 4 Stunden', type: 'viewing' },
    { action: 'Angebot eingereicht', property: 'Baugrund Wr. Neustadt', time: 'vor 6 Stunden', type: 'offer' },
    { action: 'Dokument hochgeladen', property: 'Einfamilienhaus Baden', time: 'gestern', type: 'document' },
  ];

  const upcomingAppointments = [
    { title: 'Besichtigung Villa', location: 'Baden', time: 'Heute, 14:00' },
    { title: 'Beratungsgespräch', location: 'Büro', time: 'Morgen, 10:00' },
    { title: 'Vertragsunterzeichnung', location: 'Mödling', time: 'Freitag, 15:30' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Willkommen zurück, {user?.email?.split('@')[0]}!
              </h1>
              <p className="text-gray-600 mt-1">
                Hier ist Ihre Übersicht für heute
              </p>
            </div>
            <div className="hidden sm:block">
              <Link
                to="/properties/create"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-primary to-primary/80 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                Neues Objekt
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-xs text-primary font-medium">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activities - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Letzte Aktivitäten
                </h2>
                <Link
                  to="/activities"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Alle anzeigen →
                </Link>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      ${activity.type === 'inquiry' ? 'bg-blue-100' : ''}
                      ${activity.type === 'viewing' ? 'bg-green-100' : ''}
                      ${activity.type === 'offer' ? 'bg-purple-100' : ''}
                      ${activity.type === 'document' ? 'bg-orange-100' : ''}
                    `}>
                      {activity.type === 'inquiry' && '✉️'}
                      {activity.type === 'viewing' && '👁️'}
                      {activity.type === 'offer' && '💼'}
                      {activity.type === 'document' && '📄'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.property}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-primary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Appointments - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Kommende Termine
                </h2>
                <Link
                  to="/calendar"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Kalender →
                </Link>
              </div>

              <div className="space-y-3">
                {upcomingAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="group p-4 rounded-xl border-2 border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"/>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                          {appointment.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          📍 {appointment.location}
                        </p>
                        <p className="text-xs text-primary font-medium mt-2">
                          {appointment.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/appointments/create"
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                Termin hinzufügen
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Schnellaktionen
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/clients"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span className="text-sm font-medium text-gray-900">Kunden</span>
            </Link>

            <Link
              to="/properties"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span className="text-sm font-medium text-gray-900">Objekte</span>
            </Link>

            <Link
              to="/documents"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span className="text-sm font-medium text-gray-900">Dokumente</span>
            </Link>

            <Link
              to="/settings"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/30 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="text-sm font-medium text-gray-900">Einstellungen</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;