import React from 'react';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import EmptyState from '@/shared/components/ui/EmptyState';
import Loading from '@/shared/components/ui/Loading';
import Button from '@/shared/components/ui/Button';
import UserTable from '@/features/admin/components/UserTable';
import { FaPlus } from 'react-icons/fa6';
import useUsers from '@/features/admin/hooks/useUsers';
import useUserFilters from '@/features/admin/hooks/useUserFilters';
import useCreateUserForm from '@/features/admin/hooks/useCreateUserForm';
import useDeleteUser from '@/features/admin/hooks/useDeleteUser';
import FilterBar from '@/features/admin/components/FilterBar';
import AddUserModal from '@/features/admin/components/AddUserModal';
import DeleteUserModal from '@/features/admin/components/DeleteUserModal';

const ManageUserPage = () => {
  const { allUsers, isLoading, refetch } = useUsers();
  const filters = useUserFilters(allUsers);
  const createForm = useCreateUserForm({ onCreated: refetch });
  const deleteModal = useDeleteUser({ onDeleted: refetch });

  return (
    <>
      <DashboardLayout activeMenu="Team Members">
        <div className='mt-5 mb-10'>
          <div className='flex md:flex-row md:items-center justify-between'>
            <h2 className='text-xl md:text-xl font-medium'>Team Members</h2>
            <Button
              onClick={createForm.handleOpen}
              leftIcon={<FaPlus className="text-lg" />}
            >
              New Member
            </Button>
          </div>

          <FilterBar
            search={filters.draftFilters.search}
            onSearchChange={filters.setDraftSearch}
            onApply={filters.handleApply}
            onClear={filters.handleClear}
            canClear={filters.canClear}
          />

          {isLoading ? (
            <Loading />
          ) : filters.filteredUsers.length > 0 ? (
            <div className="mt-4 lg:mx-10">
              <UserTable
                users={filters.filteredUsers}
                onDelete={deleteModal.handleOpen}
              />
            </div>
          ) : (
            <EmptyState
              className="mt-4 h-[75vh] mx-10"
              title="No team members found"
              message={
                filters.hasActiveFilters
                  ? 'No members match your filters. Try clearing them.'
                  : 'Users will appear here once they are added.'
              }
            />
          )}
        </div>
      </DashboardLayout>

      <AddUserModal
        isOpen={createForm.isOpen}
        onClose={createForm.handleClose}
        formData={createForm.formData}
        errors={createForm.errors}
        submitting={createForm.submitting}
        onChange={createForm.handleChange}
        onSubmit={createForm.handleSubmit}
      />

      <DeleteUserModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.handleClose}
        isLoading={deleteModal.isDeleting}
        onConfirm={deleteModal.handleConfirm}
      />
    </>
  );
};

export default ManageUserPage;