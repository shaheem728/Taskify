export const EMPTY_USER_FORM = { name: '', email: '', designation:'', password: '' };
export const EMPTY_USER_FILTERS = { search: '' };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns an errors object ({} when valid)
export const validateUserForm = (formData) => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';

    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!EMAIL_REGEX.test(formData.email)) errors.email = 'Invalid email address';

    if (!formData.designation.trim()) errors.designation = 'designation is required';

    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';

    return errors;
};

export const filterUsers = (users, filters) => {
    const q = filters.search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
        (user) =>
            user.name?.toLowerCase().includes(q) ||
            user.email?.toLowerCase().includes(q)
    );
};