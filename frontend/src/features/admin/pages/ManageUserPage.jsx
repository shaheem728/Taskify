import React from 'react';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import EmptyState from '@/shared/components/ui/EmptyState';
import Loading from '@/shared/components/ui/Loading';
import Button from '@/shared/components/ui/Button';
import UserTable from '@/features/admin/components/UserTable';
import { Plus } from 'lucide-react';
import useUsers from '@/features/admin/hooks/useUsers';
import useUserFilters from '@/features/admin/hooks/useUserFilters';
import useCreateUserForm from '@/features/admin/hooks/useCreateUserForm';
import useDeleteUser from '@/features/admin/hooks/useDeleteUser';
import FilterBar from '@/features/admin/components/FilterBar';
import AddUserModal from '@/features/admin/components/AddUserModal';
import DeleteUserModal from '@/features/admin/components/DeleteUserModal';
import { User } from 'lucide-react';


const ManageUserPage = () => {
  const { allUsers, isLoading, refetch } = useUsers();
  const filters = useUserFilters(allUsers);
  const createForm = useCreateUserForm({ onCreated: refetch });
  const deleteModal = useDeleteUser({ onDeleted: refetch });

  return (
    <>
      <DashboardLayout activeMenu="Team Members">
        <div className='m-5'>
          <div className='flex flex-col lg:flex-row lg:items-center justify-between mb-8'>
            <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary  text-white">
                  <User className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                    Team Members
                  </h2>
                  <p className="lg:text-sm text-xs  text-slate-700">
                    Add and manage team members efficiently.
                  </p>
                </div>
              </div>
            <Button
              onClick={createForm.handleOpen}
              leftIcon={<Plus size={16}/>}
              className='ml-auto'
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
            <div className="mt-5">
              <UserTable
                users={filters.filteredUsers}
                onDelete={deleteModal.handleOpen}
                onEdit={createForm.handleUpdate}
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
        isEdit={createForm.isEdit}
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