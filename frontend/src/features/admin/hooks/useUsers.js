import { fetchAllUsers } from '@/features/admin/api/adminAPI';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
    const { data: allUsers = [], isLoading, refetch } = useQuery({
        queryKey: ["Alluser"],
        queryFn: fetchAllUsers
    })
    return { allUsers, isLoading, refetch };
};

export default useUsers;
