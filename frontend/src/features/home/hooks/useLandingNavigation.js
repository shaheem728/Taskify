import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useLandingNavigation = () => {
    const navigate = useNavigate();

    const goToLogin = useCallback(() => navigate('/auth/login'), [navigate]);
    const goToRegister = useCallback(() => navigate('/auth/register'), [navigate]);

    return { goToLogin, goToRegister };
};

export default useLandingNavigation;