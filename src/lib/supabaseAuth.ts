import { supabase } from '@lib/supabase';
import { useZustand } from '@state';

export const initializeAuth = async () => {
  const { setUser, setAccessToken, setRefreshToken, setAuthLoading, resetUserState } = useZustand.getState();
  
  setAuthLoading(true);

  // Hole aktuelle Session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {

    setUser(session.user);
    setAccessToken(session.access_token);
    setRefreshToken(session.refresh_token);
  }
  
  setAuthLoading(false);

  // Setup Auth Listener
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      setUser(session.user);
      setAccessToken(session.access_token);
      setRefreshToken(session.refresh_token);
    } else if (event === 'SIGNED_OUT') {
      resetUserState();
    } else if (event === 'TOKEN_REFRESHED' && session) {
      setAccessToken(session.access_token);
      setRefreshToken(session.refresh_token);
    }
  });
};

export const signOut = async () => {

  const { resetUserState } = useZustand.getState();

  await supabase.auth.signOut();
  resetUserState();
};