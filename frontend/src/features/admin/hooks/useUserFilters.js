import { useMemo, useState } from 'react';
import { EMPTY_USER_FILTERS, filterUsers } from '@/features/admin/utils/user.utils';

// draftFilters = what the user is typing, appliedFilters = what is actually used
const useUserFilters = (users) => {
    const [draftFilters, setDraftFilters] = useState(EMPTY_USER_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState(EMPTY_USER_FILTERS);

    const setDraftSearch = (search) =>
        setDraftFilters((prev) => ({ ...prev, search }));

    const handleApply = () => setAppliedFilters(draftFilters);

    const handleClear = () => {
        setDraftFilters(EMPTY_USER_FILTERS);
        setAppliedFilters(EMPTY_USER_FILTERS);
    };

    const hasActiveFilters = Boolean(appliedFilters.search);
    const canClear = hasActiveFilters || Boolean(draftFilters.search);

    const filteredUsers = useMemo(
        () => filterUsers(users, appliedFilters),
        [users, appliedFilters]
    );

    return {
        draftFilters,
        setDraftSearch,
        handleApply,
        handleClear,
        hasActiveFilters,
        canClear,
        filteredUsers,
    };
};

export default useUserFilters;