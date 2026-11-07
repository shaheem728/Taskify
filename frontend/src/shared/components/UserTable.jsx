import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { assets } from "../../assets/images/assets";

const UserTable = ({ users = [], onDelete }) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50/80 text-md font-semibold text-gray-500">
                            <th scope="col" className="w-16 px-4 py-3 font-semibold">
                                No.
                            </th>
                            <th
                                scope="col"
                                className="sticky left-0 z-10 bg-gray-50 px-4 py-3 font-semibold md:static md:bg-transparent"
                            >
                                Member
                            </th>
                            <th scope="col" className="pl-10 px-4 py-3 font-semibold">
                                Email
                            </th>
                            <th scope="col" className="pl-25 px-4 py-3 font-semibold">
                                Task summary
                            </th>
                            <th scope="col" className="w-20 px-4 py-3 text-center font-semibold">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {users.map((user, index) => (
                            <UserRow key={user._id} user={user} index={index} onDelete={onDelete} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-gray-50/60 px-4 py-2.5 text-xs text-gray-500">
                Showing {users.length} {users.length === 1 ? "member" : "members"}
            </div>
        </div>
    );
};

export default UserTable;

const UserRow = ({ user, index, onDelete }) => {
    const avatar =
        user?.profileImageUrl?.length > 1 ? user.profileImageUrl : assets.profile_pic;

    return (
        <tr className="group transition-colors hover:bg-blue-50/40">
            {/* No. */}
            <td className="px-4 py-3 text-md font-medium text-gray-400">
                {String(index + 1).padStart(2, "0")}
            </td>

            {/* Member */}
            <td className="sticky left-0 z-10 bg-white px-4 py-3 transition-colors group-hover:bg-blue-50 md:static md:bg-transparent md:group-hover:bg-transparent">
                <div className="flex min-w-[170px] items-center gap-3">
                    <img
                        src={avatar}
                        alt={`${user?.name || "Member"} avatar`}
                        className="h-10 w-10 shrink-0 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-gray-200"
                    />
                    <p className="max-w-[160px] truncate text-md font-medium text-gray-800">
                        {user?.name}
                    </p>
                </div>
            </td>

            {/* Email */}
            <td className="px-4 py-3">
                <p
                    className="max-w-[240px] truncate text-md text-gray-500"
                    title={user?.email}
                >
                    {user?.email}
                </p>
            </td>

            {/* Task summary */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <StatBadge label="Pending" count={user?.pendingTasks || 0} status="Pending" />
                    <StatBadge
                        label="In progress"
                        count={user?.inProgressTasks || 0}
                        status="In Progress"
                    />
                    <StatBadge
                        label="Completed"
                        count={user?.completedTasks || 0}
                        status="Completed"
                    />
                </div>
            </td>

            {/* Action */}
            <td className="px-4 py-3">
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => onDelete?.(user)}
                        title="Delete member"
                        aria-label={`Delete ${user?.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-md border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        <FaTrashAlt className="text-sm" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

const StatBadge = ({ label, count, status }) => {
    const styles = {
        "In Progress": "text-cyan-700 bg-cyan-50 border-cyan-100",
        Completed: "text-indigo-700 bg-indigo-50 border-indigo-100",
        Pending: "text-violet-700 bg-violet-50 border-violet-100",
    };

    return (
        <div
            className={`flex min-w-[76px] flex-col items-center rounded-md border px-3 py-1 text-[14px] font-medium ${styles[status] || styles.Pending
                }`}
        >
            <span className="text-[13px] font-semibold leading-tight">{count}</span>
            <span className="whitespace-nowrap">{label}</span>
        </div>
    );
};